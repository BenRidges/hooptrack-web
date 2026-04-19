export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      earned_badges: {
        Row: {
          badge_id: string
          created_at: string
          earned_at: string
          id: string
          mmr: number
          rank: string
          updated_at: string
          user_id: string
        }
        Insert: {
          badge_id: string
          created_at?: string
          earned_at?: string
          id: string
          mmr?: number
          rank: string
          updated_at?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          created_at?: string
          earned_at?: string
          id?: string
          mmr?: number
          rank?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      goal_records: {
        Row: {
          achieved_at: string | null
          baseline_value: number
          created_at: string
          current_value: number
          id: string
          is_achieved: boolean
          metric: string
          skill: string
          target_date: string | null
          target_value: number
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          achieved_at?: string | null
          baseline_value: number
          created_at?: string
          current_value: number
          id: string
          is_achieved?: boolean
          metric: string
          skill: string
          target_date?: string | null
          target_value: number
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          achieved_at?: string | null
          baseline_value?: number
          created_at?: string
          current_value?: number
          id?: string
          is_achieved?: boolean
          metric?: string
          skill?: string
          target_date?: string | null
          target_value?: number
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      player_profiles: {
        Row: {
          career_shots_attempted: number
          career_shots_made: number
          created_at: string
          current_streak_days: number
          last_session_date: string | null
          longest_streak_days: number
          name: string
          pr_best_consistency_score: number | null
          pr_best_fg_percent_session: number
          pr_most_makes_session: number
          pr_vertical_jump_cm: number
          preferred_court_type: string
          rating_athleticism: number
          rating_ball_handling: number
          rating_consistency: number
          rating_overall: number
          rating_shooting: number
          rating_volume: number
          total_session_count: number
          total_training_minutes: number
          updated_at: string
          user_id: string
          videos_auto_delete_days: number
        }
        Insert: {
          career_shots_attempted?: number
          career_shots_made?: number
          created_at?: string
          current_streak_days?: number
          last_session_date?: string | null
          longest_streak_days?: number
          name?: string
          pr_best_consistency_score?: number | null
          pr_best_fg_percent_session?: number
          pr_most_makes_session?: number
          pr_vertical_jump_cm?: number
          preferred_court_type?: string
          rating_athleticism?: number
          rating_ball_handling?: number
          rating_consistency?: number
          rating_overall?: number
          rating_shooting?: number
          rating_volume?: number
          total_session_count?: number
          total_training_minutes?: number
          updated_at?: string
          user_id: string
          videos_auto_delete_days?: number
        }
        Update: {
          career_shots_attempted?: number
          career_shots_made?: number
          created_at?: string
          current_streak_days?: number
          last_session_date?: string | null
          longest_streak_days?: number
          name?: string
          pr_best_consistency_score?: number | null
          pr_best_fg_percent_session?: number
          pr_most_makes_session?: number
          pr_vertical_jump_cm?: number
          preferred_court_type?: string
          rating_athleticism?: number
          rating_ball_handling?: number
          rating_consistency?: number
          rating_overall?: number
          rating_shooting?: number
          rating_volume?: number
          total_session_count?: number
          total_training_minutes?: number
          updated_at?: string
          user_id?: string
          videos_auto_delete_days?: number
        }
        Relationships: []
      }
      shot_records: {
        Row: {
          court_x: number
          court_y: number
          created_at: string
          id: string
          is_user_corrected: boolean
          leg_angle_deg: number | null
          release_angle_deg: number | null
          release_time_ms: number | null
          result: string
          sequence_index: number
          session_id: string
          shot_speed_mph: number | null
          shot_type: string
          timestamp: string
          user_id: string
          vertical_jump_cm: number | null
          video_timestamp_seconds: number | null
          zone: string
        }
        Insert: {
          court_x: number
          court_y: number
          created_at?: string
          id: string
          is_user_corrected?: boolean
          leg_angle_deg?: number | null
          release_angle_deg?: number | null
          release_time_ms?: number | null
          result: string
          sequence_index: number
          session_id: string
          shot_speed_mph?: number | null
          shot_type: string
          timestamp: string
          user_id: string
          vertical_jump_cm?: number | null
          video_timestamp_seconds?: number | null
          zone: string
        }
        Update: {
          court_x?: number
          court_y?: number
          created_at?: string
          id?: string
          is_user_corrected?: boolean
          leg_angle_deg?: number | null
          release_angle_deg?: number | null
          release_time_ms?: number | null
          result?: string
          sequence_index?: number
          session_id?: string
          shot_speed_mph?: number | null
          shot_type?: string
          timestamp?: string
          user_id?: string
          vertical_jump_cm?: number | null
          video_timestamp_seconds?: number | null
          zone?: string
        }
        Relationships: [
          {
            foreignKeyName: "shot_records_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "training_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      training_sessions: {
        Row: {
          avg_dribbles_per_sec: number | null
          avg_release_angle_deg: number | null
          avg_release_time_ms: number | null
          avg_shot_speed_mph: number | null
          avg_vertical_jump_cm: number | null
          best_lane_agility_seconds: number | null
          best_shuttle_run_seconds: number | null
          consistency_score: number | null
          court_type: string
          created_at: string
          dribble_combos_detected: number | null
          drill_type: string
          duration_seconds: number
          ended_at: string | null
          fg_percent: number
          hand_balance_fraction: number | null
          id: string
          location_tag: string
          longest_make_streak: number
          max_dribbles_per_sec: number | null
          named_drill: string | null
          notes: string
          shot_speed_std_dev: number | null
          shots_attempted: number
          shots_made: number
          started_at: string
          total_dribbles: number | null
          updated_at: string
          user_id: string
          video_pinned_by_user: boolean
        }
        Insert: {
          avg_dribbles_per_sec?: number | null
          avg_release_angle_deg?: number | null
          avg_release_time_ms?: number | null
          avg_shot_speed_mph?: number | null
          avg_vertical_jump_cm?: number | null
          best_lane_agility_seconds?: number | null
          best_shuttle_run_seconds?: number | null
          consistency_score?: number | null
          court_type: string
          created_at?: string
          dribble_combos_detected?: number | null
          drill_type: string
          duration_seconds: number
          ended_at?: string | null
          fg_percent?: number
          hand_balance_fraction?: number | null
          id: string
          location_tag?: string
          longest_make_streak?: number
          max_dribbles_per_sec?: number | null
          named_drill?: string | null
          notes?: string
          shot_speed_std_dev?: number | null
          shots_attempted?: number
          shots_made?: number
          started_at: string
          total_dribbles?: number | null
          updated_at?: string
          user_id: string
          video_pinned_by_user?: boolean
        }
        Update: {
          avg_dribbles_per_sec?: number | null
          avg_release_angle_deg?: number | null
          avg_release_time_ms?: number | null
          avg_shot_speed_mph?: number | null
          avg_vertical_jump_cm?: number | null
          best_lane_agility_seconds?: number | null
          best_shuttle_run_seconds?: number | null
          consistency_score?: number | null
          court_type?: string
          created_at?: string
          dribble_combos_detected?: number | null
          drill_type?: string
          duration_seconds?: number
          ended_at?: string | null
          fg_percent?: number
          hand_balance_fraction?: number | null
          id?: string
          location_tag?: string
          longest_make_streak?: number
          max_dribbles_per_sec?: number | null
          named_drill?: string | null
          notes?: string
          shot_speed_std_dev?: number | null
          shots_attempted?: number
          shots_made?: number
          started_at?: string
          total_dribbles?: number | null
          updated_at?: string
          user_id?: string
          video_pinned_by_user?: boolean
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
