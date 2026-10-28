import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import type { Stage } from '../types/stage'
import { StageImage } from './StageMedia'

export function StageCard({ stage }: { stage: Stage }) {
  return <Card as="article" className="aspirin-grid-item">
    <Link className="aspirin-grid-stage-link" to={`/aspirin-synthesis-stage?aspirin_synthesis_stage_id=${stage.aspirin_stage_id}`}>
      <StageImage stage={stage} className="aspirin-grid-image" />
      <h2>{stage.aspirin_stage_name}</h2>
    </Link>
    <div className="aspirin-grid-stats">
      <span>{stage.synthesis_duration_minutes ?? '—'} мин.</span>
      <span aria-label={`Лайков: ${stage.aspirin_synthesis_like_count}`}>♥ {stage.aspirin_synthesis_like_count}</span>
    </div>
  </Card>
}
