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
