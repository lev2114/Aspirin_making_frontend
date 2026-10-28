import { useEffect, useState } from 'react'
import { STAGES_MOCK } from '../data/stages'
import type { Stage } from '../types/stage'

export const USE_API = import.meta.env.VITE_USE_API === 'true'

export function useStages() {
  const [stages, setStages] = useState<Stage[]>(USE_API ? [] : STAGES_MOCK)
  const [loading, setLoading] = useState(USE_API)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!USE_API) return
    const controller = new AbortController()
    async function load() {
      setLoading(true)
      setError('')
      try {
        const response = await fetch('/api/aspirin-stages', { signal: controller.signal })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const body: { data: Stage[] } = await response.json()
        if (!Array.isArray(body.data)) throw new Error('Некорректный ответ API')
        setStages(body.data)
      } catch (cause) {
        if (!controller.signal.aborted) {
          setError(`Не удалось загрузить этапы. ${cause instanceof Error ? cause.message : ''}`)
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    void load()
    return () => controller.abort()
  }, [attempt])

  return { stages, loading, error, retry: () => setAttempt(value => value + 1) }
}
