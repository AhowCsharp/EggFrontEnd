import { dataStore, useSelector } from '@app/store/index'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import paths from '@app/utils/paths'

export default function useAuth() {
  const isLogged = useSelector(() => dataStore.isLogged)
  const goto = useNavigate()

  useEffect(() => {
    if (isLogged) return
    goto(paths.login)
  }, [isLogged])
}
