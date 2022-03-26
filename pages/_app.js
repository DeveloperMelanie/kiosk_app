import { KioskProvider } from 'context/KioskProvider'

import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <KioskProvider>
            <Component {...pageProps} />
        </KioskProvider>
    )
}

export default MyApp
