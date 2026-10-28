import { useEffect, useState } from 'react'
import { Alert, Button, Spinner } from 'react-bootstrap'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { BottomNav } from './components/BottomNav'
import { useStages } from './hooks/useStages'
import { GridPage } from './pages/GridPage'
import { FeedPage } from './pages/FeedPage'
import './App.css'

function App() {
  const { stages, loading, error, retry } = useStages()
  const [maxDuration, setMaxDuration] = useState<number | null>(null)
  const { pathname } = useLocation()
  const isGrid = pathname === '/aspirin-synthesis-stages'

  useEffect(() => {
    document.title = `${isGrid ? 'Плитка' : 'Лента'} — Синтез аспирина`
    window.scrollTo(0, 0)
  }, [pathname, isGrid])

  return <div className={`app-container ${isGrid ? 'aspirin-grid-page' : ''}`}>
    {loading ? <main className="loading-state" role="status"><Spinner animation="border" /><p>Загрузка этапов…</p></main>
      : error ? <main className="aspirin-form-container"><Alert variant="danger">{error}</Alert><Button onClick={retry}>Повторить</Button></main>
      : <Routes>
        <Route path="/" element={<Navigate to="/aspirin-synthesis-stage" replace />} />
        <Route path="/aspirin-synthesis-stage" element={<FeedPage stages={stages} />} />
        <Route path="/aspirin-synthesis-stages" element={<GridPage stages={stages} maxDuration={maxDuration} onFilter={setMaxDuration} />} />
        <Route path="*" element={<main className="aspirin-form-container"><h1>Страница не найдена</h1><Link to="/aspirin-synthesis-stages">К плитке</Link></main>} />
      </Routes>}
    <BottomNav />
  </div>
}

export default App
