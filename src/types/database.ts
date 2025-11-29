
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
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: string | null
          company_name: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string | null
          company_name?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string | null
          company_name?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      shoots: {
        Row: {
          id: string
          designer_id: string | null
          shoot_type: string
          fashion_category: string
          style_type: string
          looks_count: number
          fulfillment_type: string | null
          scheduled_date: string | null
          scheduled_time: string | null
          currency: string
          estimated_quote: number
          deposit_amount: number | null
          deposit_paid: boolean
          brief_data: Json
          status: string
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          designer_id?: string | null
          shoot_type: string
          fashion_category: string
          style_type: string
          looks_count?: number
          fulfillment_type?: string | null
          scheduled_date?: string | null
          scheduled_time?: string | null
          currency?: string
          estimated_quote: number
          deposit_amount?: number | null
          deposit_paid?: boolean
          brief_data?: Json
          status?: string
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          designer_id?: string | null
          shoot_type?: string
          fashion_category?: string
          style_type?: string
          looks_count?: number
          fulfillment_type?: string | null
          scheduled_date?: string | null
          scheduled_time?: string | null
          currency?: string
          estimated_quote?: number
          deposit_amount?: number | null
          deposit_paid?: boolean
          brief_data?: Json
          status?: string
          created_at?: string
          updated_at?: string | null
        }
      }
      events: {
        Row: {
          id: string
          organizer_id: string
          venue_id: string | null
          title: string
          slug: string
          description: string | null
          short_description: string | null
          status: string
          is_public: boolean
          start_time: string
          end_time: string | null
          timezone: string
          capacity_limit: number | null
          featured_image_url: string | null
          brand_color_primary: string | null
          brand_color_secondary: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          organizer_id: string
          venue_id?: string | null
          title: string
          slug: string
          description?: string | null
          short_description?: string | null
          status?: string
          is_public?: boolean
          start_time: string
          end_time?: string | null
          timezone?: string
          capacity_limit?: number | null
          featured_image_url?: string | null
          brand_color_primary?: string | null
          brand_color_secondary?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          organizer_id?: string
          venue_id?: string | null
          title?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          status?: string
          is_public?: boolean
          start_time?: string
          end_time?: string | null
          timezone?: string
          capacity_limit?: number | null
          featured_image_url?: string | null
          brand_color_primary?: string | null
          brand_color_secondary?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      venues: {
        Row: {
          id: string
          name: string
          city: string
          address: string | null
          capacity: number | null
        }
        Insert: {
          id?: string
          name: string
          city: string
          address?: string | null
          capacity?: number | null
        }
      }
    }
  }
}
