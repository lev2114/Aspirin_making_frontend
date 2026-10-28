import { Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export function BottomNav() {
  return <Navbar as="nav" className="bottom-nav" aria-label="Основная навигация">
    <NavLink to="/aspirin-synthesis-stage">Лента</NavLink>
    <button type="button" disabled title="Добавление недоступно гостю">Добавление</button>
    <NavLink to="/aspirin-synthesis-stages">Плитка</NavLink>
    <button type="button" disabled title="Вход недоступен в лабораторной №5">Вход</button>
  </Navbar>
}
