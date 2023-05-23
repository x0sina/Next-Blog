import '@/styles/globals.css'
import { ThemeProvider } from '@mui/material'
import { Toaster } from 'react-hot-toast'
import Layout from 'src/containers/layout/Layout'
import AuthProvider from 'src/context/AuthContext'
import muiTheme from 'src/theme/muiTheme'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={muiTheme}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  )
}
