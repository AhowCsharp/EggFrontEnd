import ThemeProvider from './themeProvider'
import { useEffect } from 'react'
import { dataStore } from '@app/store'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Taipei')

export default function App() {
  useEffect(() => {
    dataStore.loadMember()
  }, [])

  return <ThemeProvider />
}
