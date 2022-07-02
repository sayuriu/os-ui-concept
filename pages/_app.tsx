import '../styles/globals.css'
import '../styles/util.scss'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import { Provider as JotaiProvider } from "jotai"
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
    return (<JotaiProvider>
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    </JotaiProvider>)
}

export default MyApp
