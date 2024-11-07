import { useEffect } from 'react'

export default function useScrollToTop() {
  useEffect(() => {
    document.getElementById('layout').scrollIntoView({ behavior: 'instant' })
  }, [])
}
