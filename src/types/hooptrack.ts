export type ShotOutcome = 'make' | 'miss'

export type CourtZone =
  | 'paint'
  | 'mid_range_left'
  | 'mid_range_center'
  | 'mid_range_right'
  | 'three_left_corner'
  | 'three_right_corner'
  | 'three_left_wing'
  | 'three_right_wing'
  | 'three_top'

export interface ShotRecord {
  id: string
  session_id: string
  court_x: number
  court_y: number
  angle: number
  outcome: ShotOutcome
  zone: CourtZone
  created_at: string
}

export interface ZoneStats {
  zone: CourtZone
  attempts: number
  makes: number
  fg_pct: number
}

export type DrillType = 'free_shoot' | 'shot_science' | 'dribble' | 'agility'

export interface TrainingSession {
  id: string
  user_id: string
  started_at: string
  ended_at: string | null
  drill_type: DrillType
  fg_percent: number
  shots_attempted: number
  shots_made: number
  duration_seconds: number
  notes: string
  court_type: string
  location_tag: string
  consistency_score: number | null
  avg_release_angle_deg: number | null
  avg_vertical_jump_cm: number | null
  avg_shot_speed_mph: number | null
  longest_make_streak: number
  video_pinned_by_user: boolean
  created_at: string
  updated_at: string
}

export interface SkillRatings {
  overall: number
  shooting: number
  ball_handling: number
  athleticism: number
  consistency: number
  volume: number
}

export interface PlayerProfile {
  user_id: string
  name: string
  preferred_court_type: string
  career_shots_attempted: number
  career_shots_made: number
  total_session_count: number
  total_training_minutes: number
  current_streak_days: number
  longest_streak_days: number
  last_session_date: string | null
  rating_overall: number
  rating_shooting: number
  rating_ball_handling: number
  rating_athleticism: number
  rating_consistency: number
  rating_volume: number
  pr_best_fg_percent_session: number
  pr_most_makes_session: number
  pr_best_consistency_score: number | null
  pr_vertical_jump_cm: number
  videos_auto_delete_days: number
  updated_at: string
  created_at: string
}

export interface EarnedBadge {
  id: string
  user_id: string
  badge_id: string
  rank: string
  mmr: number
  earned_at: string
  created_at: string
  updated_at: string
}
