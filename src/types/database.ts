
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
      companies: {
        Row: {
          id: string
          owner_id: string
          name: string
          website_url: string | null
          description: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          website_url?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          website_url?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      brand_identities: {
        Row: {
          id: string
          company_id: string
          core_description: string | null
          target_audience: string[] | null
          brand_pillars: string[] | null
          tone_of_voice: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          company_id: string
          core_description?: string | null
          target_audience?: string[] | null
          brand_pillars?: string[] | null
          tone_of_voice?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          core_description?: string | null
          target_audience?: string[] | null
          brand_pillars?: string[] | null
          tone_of_voice?: string[] | null
          created_at?: string
        }
      }
      brand_visuals: {
        Row: {
          id: string
          company_id: string
          colors: string[] | null
          moods: string[] | null
          lighting_style: string | null
          composition_guide: string | null
          created_at: string
        }
        Insert: {
          id?: string
          company_id: string
          colors?: string[] | null
          moods?: string[] | null
          lighting_style?: string | null
          composition_guide?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          colors?: string[] | null
          moods?: string[] | null
          lighting_style?: string | null
          composition_guide?: string | null
          created_at?: string
        }
      }
      production_recommendations: {
        Row: {
          id: string
          company_id: string
          recommended_photography: Json
          recommended_video: Json
          campaign_ideas: Json
          created_at: string
        }
        Insert: {
          id?: string
          company_id: string
          recommended_photography?: Json
          recommended_video?: Json
          campaign_ideas?: Json
          created_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          recommended_photography?: Json
          recommended_video?: Json
          campaign_ideas?: Json
          created_at?: string
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
      shoot_assets: {
        Row: {
          id: string
          shoot_id: string
          url: string
          filename: string | null
          file_type: string | null
          metadata: Json | null
          status: string
          is_favorite: boolean
          created_at: string
        }
        Insert: {
          id?: string
          shoot_id: string
          url: string
          filename?: string | null
          file_type?: string | null
          metadata?: Json | null
          status?: string
          is_favorite?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          shoot_id?: string
          url?: string
          filename?: string | null
          file_type?: string | null
          metadata?: Json | null
          status?: string
          is_favorite?: boolean
          created_at?: string
        }
      }
      qa_reviews: {
        Row: {
          id: string
          asset_id: string
          overall_score: number
          grade: string
          metrics: Json
          detected_issues: string[] | null
          ai_reasoning: string | null
          created_at: string
        }
        Insert: {
          id?: string
          asset_id: string
          overall_score: number
          grade: string
          metrics: Json
          detected_issues?: string[] | null
          ai_reasoning?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          asset_id?: string
          overall_score?: number
          grade?: string
          metrics?: Json
          detected_issues?: string[] | null
          ai_reasoning?: string | null
          created_at?: string
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
          ai_summary: string | null
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
          ai_summary?: string | null
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
          ai_summary?: string | null
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
          geo_lat: number | null
          geo_lng: number | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          city: string
          address?: string | null
          capacity?: number | null
          geo_lat?: number | null
          geo_lng?: number | null
          created_at?: string
        }
      }
      event_schedules: {
        Row: {
          id: string
          event_id: string
          title: string
          description: string | null
          start_time: string
          end_time: string | null
          location_in_venue: string | null
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          title: string
          description?: string | null
          start_time: string
          end_time?: string | null
          location_in_venue?: string | null
          created_at?: string
        }
      }
      ticket_tiers: {
        Row: {
          id: string
          event_id: string
          name: string
          description: string | null
          type: string
          price: number
          quantity_total: number
          quantity_sold: number
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          name: string
          description?: string | null
          type?: string
          price?: number
          quantity_total: number
          quantity_sold?: number
          created_at?: string
        }
      }
      registrations: {
        Row: {
          id: string
          event_id: string
          ticket_tier_id: string
          profile_id: string | null
          attendee_email: string
          attendee_name: string
          status: string
          qr_code_data: string | null
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          ticket_tier_id: string
          profile_id?: string | null
          attendee_email: string
          attendee_name: string
          status?: string
          qr_code_data?: string | null
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          shoot_id: string | null
          registration_id: string | null
          user_id: string | null
          amount: number
          currency: string
          status: string
          provider_payment_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          shoot_id?: string | null
          registration_id?: string | null
          user_id?: string | null
          amount: number
          currency?: string
          status?: string
          provider_payment_id?: string | null
          created_at?: string
        }
      }
      sponsor_profiles: {
        Row: {
          id: string
          name: string
          industry: string | null
          sponsor_type: string | null
          website_url: string | null
          logo_url: string | null
          contact_name: string | null
          contact_email: string | null
          contact_phone: string | null
          owner_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          industry?: string | null
          sponsor_type?: string | null
          website_url?: string | null
          logo_url?: string | null
          contact_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          owner_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          industry?: string | null
          sponsor_type?: string | null
          website_url?: string | null
          logo_url?: string | null
          contact_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          owner_id?: string | null
          created_at?: string
        }
      }
      event_sponsors: {
        Row: {
          id: string
          event_id: string
          sponsor_id: string
          status: string
          level: string | null
          cash_value: number
          in_kind_value: number
          contract_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          sponsor_id: string
          status?: string
          level?: string | null
          cash_value?: number
          in_kind_value?: number
          contract_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          sponsor_id?: string
          status?: string
          level?: string | null
          cash_value?: number
          in_kind_value?: number
          contract_url?: string | null
          created_at?: string
        }
      }
      sponsor_activations: {
        Row: {
          id: string
          event_sponsor_id: string
          title: string
          type: string
          status: string
          location_in_venue: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          event_sponsor_id: string
          title: string
          type: string
          status?: string
          location_in_venue?: string | null
          description?: string | null
          created_at?: string
        }
      }
      sponsor_deliverables: {
        Row: {
          id: string
          event_sponsor_id: string
          title: string
          type: string
          status: string
          due_date: string
          asset_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          event_sponsor_id: string
          title: string
          type: string
          status?: string
          due_date: string
          asset_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          event_sponsor_id?: string
          title?: string
          type?: string
          status?: string
          due_date?: string
          asset_url?: string | null
          created_at?: string
        }
      }
      sponsor_roi_metrics: {
        Row: {
          id: string
          event_sponsor_id: string
          metric_name: string
          metric_value: number
          unit: string
          source: string | null
          created_at: string
        }
        Insert: {
          id?: string
          event_sponsor_id: string
          metric_name: string
          metric_value: number
          unit: string
          source?: string | null
          created_at?: string
        }
      }
      chat_rooms: {
        Row: {
          id: string
          name: string | null
          type: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name?: string | null
          type?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          type?: string
          created_at?: string
          updated_at?: string
        }
      }
      chat_participants: {
        Row: {
          room_id: string
          user_id: string
          joined_at: string
        }
        Insert: {
          room_id: string
          user_id: string
          joined_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          room_id: string
          sender_id: string
          content: string
          read_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          room_id: string
          sender_id: string
          content: string
          read_at?: string | null
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: string
          title: string
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          title: string
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          title?: string
          message?: string
          is_read?: boolean
          created_at?: string
        }
      }
      system_logs: {
        Row: {
          id: string
          level: string
          message: string
          metadata: Json | null
          source: string
          created_at: string
        }
        Insert: {
          id?: string
          level: string
          message: string
          metadata?: Json | null
          source: string
          created_at?: string
        }
      }
    }
  }
}
