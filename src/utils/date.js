import dayjs from 'dayjs'

export function getDefaultDateRange() {
  return [dayjs().add(-30, 'd').startOf('d'), dayjs().endOf('d')]
}

export function formatDate(date) {
  return dayjs(date).format('YYYY/MM/DD HH:mm')
}

export function renderDate(date) {
  return date ? dayjs(date).format('YYYY/MM/DD HH:mm') : ''
}
