export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          cover_letter: string | null
          created_at: string | null
          email: string
          experience: string | null
          first_name: string
          id: string
          last_name: string
          phone: string | null
          position: string
          resume_text: string | null
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string | null
          email: string
          experience?: string | null
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
          position: string
          resume_text?: string | null
        }
        Update: {
          cover_letter?: string | null
          created_at?: string | null
          email?: string
          experience?: string | null
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          position?: string
          resume_text?: string | null
        }
        Relationships: []
      }
      chat_logs: {
        Row: {
          created_at: string | null
          email: string
          id: string
          ip_address: string | null
          message: string
          user_type: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          ip_address?: string | null
          message: string
          user_type?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          ip_address?: string | null
          message?: string
          user_type?: string
        }
        Relationships: []
      }
      estimates: {
        Row: {
          address: string
          client_name: string
          created_at: string | null
          email: string | null
          estimated_cost: number | null
          id: string
          notes: string | null
          phone: string | null
          service_type: string
          status: string | null
        }
        Insert: {
          address: string
          client_name: string
          created_at?: string | null
          email?: string | null
          estimated_cost?: number | null
          id?: string
          notes?: string | null
          phone?: string | null
          service_type: string
          status?: string | null
        }
        Update: {
          address?: string
          client_name?: string
          created_at?: string | null
          email?: string | null
          estimated_cost?: number | null
          id?: string
          notes?: string | null
          phone?: string | null
          service_type?: string
          status?: string | null
        }
        Relationships: []
      }
      memory: {
        Row: {
          content: string
          created_at: string
          id: number
        }
        Insert: {
          content: string
          created_at?: string
          id?: never
        }
        Update: {
          content?: string
          created_at?: string
          id?: never
        }
        Relationships: []
      }
      training_data: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      call_chat_api: {
        Args: {
          message: string
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
