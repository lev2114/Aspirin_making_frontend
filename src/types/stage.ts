// Поля совпадают с AspirinSynthesisStageResponse в Go API.
export interface Stage {
  aspirin_stage_id: number
  aspirin_stage_name: string
  aspirin_stage_description: string
  aspirin_stage_image: string | null
  aspirin_stage_video: string | null
  synthesis_duration_minutes: number | null
  pure_aspirin_yield_percent: number | null
  aspirin_synthesis_like_count: number
  is_creator: number
  is_liked: number
}
