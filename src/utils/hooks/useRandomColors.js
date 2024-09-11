import { useEffect, useState } from 'react'
const usedHues = new Set()

export default function useRandomColors(data = [], key) {
  const [colors, setColors] = useState({})
  useEffect(() => {
    if (!data) return
    const colorDict = data.reduce(
      (acc, cur) => {
        if (acc[cur[key]]) return acc
        acc[cur[key]] = getRandomDarkColor()
        return acc
      },
      { ...colors }
    )
    setColors(colorDict)
  }, [data])
  return colors
}
function getRandomDarkColor() {
  const hues = [0, 30, 60, 120, 180, 240, 300]
  let availableHues = hues.filter((hue) => !usedHues.has(hue))

  if (availableHues.length === 0) {
    usedHues.clear()
    availableHues = hues
  }

  const hue = availableHues[Math.floor(Math.random() * availableHues.length)]
  usedHues.add(hue)

  const saturation = Math.floor(Math.random() * 21) + 80
  const lightness = Math.floor(Math.random() * 21) + 10

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}
