import App, { AppProps, AppContext } from 'next/app'

// Progress.

// Redux.
import wrapper from '../redux/store'

// Bootstrap.
// import "bootstrap/dist/css/bootstrap.min.css";

// Tailwind css.
import '../styles/styles.css'
import '../styles/spiner.css'

// Component App.
// function MyApp({ Component, pageProps }: AppProps) {
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

// Create Initial Props.
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

export default wrapper.withRedux(MyApp)
