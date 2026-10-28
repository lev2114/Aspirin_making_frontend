import type { Stage } from '../types/stage'
import { DurationFilter } from '../components/DurationFilter'
import { StageCard } from '../components/StageCard'

interface Props {
  stages: Stage[]
  maxDuration: number | null
  onFilter: (value: number | null) => void
}

export function GridPage({ stages, maxDuration, onFilter }: Props) {
  const filtered = stages.filter(stage => maxDuration === null ||
    (stage.synthesis_duration_minutes !== null && stage.synthesis_duration_minutes <= maxDuration))
  return <main className="aspirin-grid-wrapper">
    <h1>Этапы синтеза аспирина</h1>
    <DurationFilter value={maxDuration} onApply={onFilter} />
    <p className="result-count" aria-live="polite">Найдено этапов: {filtered.length}</p>
    <section className="aspirin-grid-container" aria-label="Этапы синтеза">
      {filtered.map(stage => <StageCard key={stage.aspirin_stage_id} stage={stage} />)}
      {filtered.length === 0 && <p className="aspirin-empty-message">Опубликованные этапы синтеза по выбранному условию не найдены.</p>}
    </section>
  </main>
}
