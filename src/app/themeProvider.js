import { ThemeProvider } from 'styled-components'
import { ConfigProvider } from 'antd'
import zhTw from 'antd/es/locale/zh_TW'

import theme from '@app/utils/style/theme'
import Route from './route'

export default function AppThemeProvider() {
  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider locale={zhTw}>
        <Route />
      </ConfigProvider>
    </ThemeProvider>
  )
}
