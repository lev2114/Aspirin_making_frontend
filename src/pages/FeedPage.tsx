import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import type { Stage } from '../types/stage'
import { StageVideo } from '../components/StageMedia'

export function FeedPage({ stages }: { stages: Stage[] }) {
  const [params, setParams] = useSearchParams()
  const [expanded, setExpanded] = useState(false)
  const requestedId = Number(params.get('aspirin_synthesis_stage_id'))
  const index = Math.max(0, stages.findIndex(stage => stage.aspirin_stage_id === requestedId))
  const stage = stages[index]
  if (!stage) return <main className="aspirin-grid-wrapper"><h1>Лента этапов</h1><p>Опубликованных этапов пока нет.</p></main>
  const next = stages[(index + 1) % stages.length]

  return <main className="aspirin-feed-card">
    <StageVideo key={stage.aspirin_stage_id} stage={stage} className="aspirin-feed-video" />
    <aside className="aspirin-feed-side-panel" aria-label="Показатели этапа">
      <div className="aspirin-feed-metric">{stage.synthesis_duration_minutes ?? '—'}<br />МИН.</div>
      <div className="aspirin-feed-metric">{stage.pure_aspirin_yield_percent ?? '—'}%</div>
      <div className="aspirin-feed-like-block">
        <img src="/media/heart.png" alt="Лайки" />
        <span>{stage.aspirin_synthesis_like_count}</span>
      </div>
      <Button variant="link" className="aspirin-icon-link" aria-label="Следующий этап"
        onClick={() => { setParams({ aspirin_synthesis_stage_id: String(next.aspirin_stage_id) }); setExpanded(false) }}>
        <img src="/media/next.png" alt="" />
      </Button>
    </aside>
    <div className="aspirin-feed-description">
      <h1>{stage.aspirin_stage_name}</h1>
      <p className={expanded ? '' : 'aspirin-description-short'}>{stage.aspirin_stage_description}</p>
      <Button variant="link" className="description-toggle" aria-expanded={expanded}
        onClick={() => setExpanded(value => !value)}>{expanded ? 'Свернуть' : 'Развернуть'}</Button>
    </div>
  </main>
}
