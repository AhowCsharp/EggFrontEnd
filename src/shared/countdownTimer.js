import { useState, useEffect } from 'react'

export default function CountdownTimer({ initialSeconds, cb }) {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds(seconds - 1)
      }, 1000)

      return () => {
        clearTimeout(timerId)
      }
    } else {
      cb?.()
    }
  }, [seconds])

  return (
    <div>
      <h1>{seconds} 秒</h1>
    </div>
  )
}
