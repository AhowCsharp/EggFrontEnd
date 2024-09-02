import { useNavigate } from 'react-router-dom'
import paths from '@app/utils/paths'
import { useEffect } from 'react'

export default function NotFound() {
  const goto = useNavigate()
  useEffect(() => {
    goto(paths.index)
  }, [])
}
