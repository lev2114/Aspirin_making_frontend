import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

interface Props {
  value: number | null
  onApply: (value: number | null) => void
}

export function DurationFilter({ value, onApply }: Props) {
  const [duration, setDuration] = useState(value ?? 30)
  return <Form className="filter-form" onSubmit={event => { event.preventDefault(); onApply(duration) }}>
    <div className="filter-header">
      <Form.Label htmlFor="duration">Длительность этапа, мин.</Form.Label>
      <output className="filter-value" htmlFor="duration">до {duration} мин.</output>
    </div>
    <div className="duration-range-wrapper">
      <span>0</span>
      <Form.Range id="duration" min={0} max={30} step={1} value={duration}
        onChange={event => setDuration(Number(event.target.value))} />
      <span>30</span>
    </div>
    <Button type="submit" className="aspirin-action-button">Применить фильтр</Button>
    <Button type="button" variant="link" className="reset-filter"
      onClick={() => { setDuration(30); onApply(null) }}>Сбросить фильтр</Button>
  </Form>
}
