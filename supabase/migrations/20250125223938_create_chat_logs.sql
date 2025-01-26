-- Create chat_logs table
CREATE TABLE IF NOT EXISTS chat_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  message_content TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS chat_logs_session_id_idx ON chat_logs(session_id);
CREATE INDEX IF NOT EXISTS chat_logs_created_at_idx ON chat_logs(created_at DESC);

-- Enable RLS
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow anonymous insert" ON chat_logs;

-- Create new policies
CREATE POLICY "Allow service role access" ON chat_logs
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow password access" ON chat_logs
FOR SELECT
USING (
  current_setting('request.headers', true)::jsonb->>'x-chat-logs-key' = 'jc321'
);

CREATE POLICY "Allow insert" ON chat_logs
FOR INSERT
WITH CHECK (true);

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON chat_logs TO anon, authenticated, service_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;