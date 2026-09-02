import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import ResourceList from './ResourceList'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection(endpoint, controller.signal).then(setLeaderboard).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  return <ResourceList title="Leaderboard" items={leaderboard} error={error} empty="No leaderboard entries found." />
}

export default Leaderboard
