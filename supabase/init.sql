-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Drop existing tables and policies
drop policy if exists "Allow authenticated users to read applications" on applications;
drop policy if exists "Allow authenticated users to read chat_logs" on chat_logs;
drop policy if exists "Allow authenticated users to read estimates" on estimates;
drop policy if exists "Allow public to insert applications" on applications;

drop table if exists applications cascade;
drop table if exists estimates cascade;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS estimates;

-- Create tables
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    position TEXT NOT NULL,
    experience TEXT,
    resume_text TEXT,
    cover_letter TEXT
);

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing chat_logs table and its policies
DROP TABLE IF EXISTS chat_logs CASCADE;

-- Create chat_logs table with minimal required fields
CREATE TABLE IF NOT EXISTS chat_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    message TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations
CREATE POLICY "Allow all operations on chat_logs"
ON chat_logs
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Create index for sorting by creation time
CREATE INDEX IF NOT EXISTS chat_logs_created_at_idx ON chat_logs(created_at DESC);

CREATE TABLE estimates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service_type TEXT NOT NULL,
    description TEXT,
    estimated_cost DECIMAL,
    status TEXT DEFAULT 'pending'
);

-- Enable Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE estimates ENABLE ROW LEVEL SECURITY;

-- Create policies for applications table
CREATE POLICY "Allow public inserts on applications"
ON applications FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow authenticated reads on applications"
ON applications FOR SELECT
TO authenticated
USING (true);

-- Create policies for estimates table
CREATE POLICY "Allow public inserts on estimates"
ON estimates FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow authenticated reads on estimates"
ON estimates FOR SELECT
TO authenticated
USING (true);

-- Create storage bucket for applications
DO $$
BEGIN
    -- Drop existing bucket if it exists
    BEGIN
        EXECUTE 'DROP BUCKET IF EXISTS applications;';
    EXCEPTION WHEN OTHERS THEN
        -- Ignore if bucket doesn't exist
    END;
    
    -- Create new bucket
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('applications', 'applications', true)
    ON CONFLICT (id) DO NOTHING;
END $$;

-- Set up storage policies
CREATE POLICY "Allow public uploads to applications bucket"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'applications');

CREATE POLICY "Allow public reads from applications bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'applications');

-- Insert sample data
INSERT INTO applications (first_name, last_name, email, position)
VALUES
    ('John', 'Smith', 'john@example.com', 'Roofing Technician'),
    ('Sarah', 'Johnson', 'sarah@example.com', 'Project Manager'),
    ('Mike', 'Wilson', 'mike@example.com', 'Sales Representative');

INSERT INTO chat_logs (message, role, created_at)
VALUES
    ('Hi, I need a quote for roof repair', 'user', NOW()),
    ('Hello! I''d be happy to help. Could you tell me more about the repair needed?', 'assistant', NOW()),
    ('I have a leak in my ceiling', 'user', NOW());

INSERT INTO estimates (customer_name, email, phone, service_type, description, estimated_cost, status)
VALUES
    ('Alice Brown', 'alice@example.com', '555-0100', 'Repair', 'Roof leak repair', 500.00, 'pending'),
    ('Bob White', 'bob@example.com', '555-0101', 'Replacement', 'Full roof replacement', 15000.00, 'approved'),
    ('Carol Davis', 'carol@example.com', '555-0102', 'Inspection', 'Annual roof inspection', 200.00, 'completed');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS applications_created_at_idx ON applications(created_at DESC);
CREATE INDEX IF NOT EXISTS estimates_created_at_idx ON estimates(created_at DESC);
