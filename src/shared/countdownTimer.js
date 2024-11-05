import { useState, useEffect } from 'react'

export default function CountdownTimer({
  initialSeconds,
  isSmall = false,
  cb,
}) {
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

  useEffect(() => {
    setSeconds(initialSeconds)
  }, [initialSeconds])

  return (
    <div>{isSmall ? <span>{seconds} 秒</span> : <h1>{seconds} 秒</h1>}</div>
  )
}
