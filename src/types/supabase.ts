
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chat_logs: {
        Row: {
          id: string
          created_at: string | null
          message: string
          user_type: string
          email: string
          ip_address: string | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          message: string
          user_type?: string
          email: string
          ip_address?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          message?: string
          user_type?: string
          email?: string
          ip_address?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
