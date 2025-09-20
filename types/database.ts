export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          phone: string | null;
          email: string | null;
          name: string | null;
          business_name: string | null;
          avatar_url: string | null;
          is_verified: boolean;
          verification_status: 'pending' | 'approved' | 'rejected';
          id_document_url: string | null;
          verification_video_url: string | null;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          phone?: string | null;
          email?: string | null;
          name?: string | null;
          business_name?: string | null;
          avatar_url?: string | null;
          is_verified?: boolean;
          verification_status?: 'pending' | 'approved' | 'rejected';
          id_document_url?: string | null;
          verification_video_url?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          phone?: string | null;
          email?: string | null;
          name?: string | null;
          business_name?: string | null;
          avatar_url?: string | null;
          is_verified?: boolean;
          verification_status?: 'pending' | 'approved' | 'rejected';
          id_document_url?: string | null;
          verification_video_url?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          category_id: string | null;
          price: number | null;
          location: string | null;
          latitude: number | null;
          longitude: number | null;
          privacy: 'public' | 'private';
          status: 'pending' | 'approved' | 'rejected';
          show_business_name: boolean;
          view_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description: string;
          category_id?: string | null;
          price?: number | null;
          location?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          privacy?: 'public' | 'private';
          status?: 'pending' | 'approved' | 'rejected';
          show_business_name?: boolean;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string;
          category_id?: string | null;
          price?: number | null;
          location?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          privacy?: 'public' | 'private';
          status?: 'pending' | 'approved' | 'rejected';
          show_business_name?: boolean;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          icon: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          icon?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          icon?: string | null;
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          reviewer_id: string;
          reviewee_id: string;
          rating: number;
          comment: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reviewer_id: string;
          reviewee_id: string;
          rating: number;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reviewer_id?: string;
          reviewee_id?: string;
          rating?: number;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          content: string;
          is_read: boolean;
          metadata: any | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          content: string;
          is_read?: boolean;
          metadata?: any | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          title?: string;
          content?: string;
          is_read?: boolean;
          metadata?: any | null;
          created_at?: string;
        };
      };
    };
  };
}