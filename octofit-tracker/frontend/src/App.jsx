import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="navbar navbar-dark bg-dark px-3">
        <NavLink className="navbar-brand" to="/users">OctoFit Tracker</NavLink>
        <nav className="d-flex flex-wrap gap-2">
          {['users', 'teams', 'activities', 'leaderboard', 'workouts'].map((resource) => (
            <NavLink
              className={({ isActive }) => `btn btn-sm ${isActive ? 'btn-light' : 'btn-outline-light'}`}
              key={resource}
              to={`/${resource}`}
            >
              {resource[0].toUpperCase() + resource.slice(1)}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="container py-4">
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/users" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
