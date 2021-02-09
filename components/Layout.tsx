import React from 'react'
import Head from 'next/head'
import Header from './Header'
import { Container, FooterInner } from './styledComponents/general'

type Props = {
  children?: React.ReactNode
  title?: string
}

const Layout: React.FC = ({ children, title = 'Page' }: Props) => (
  <div className="site-cont">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="site">
      <main className="content-wraper">
        <header>
          <Header />
        </header>
        <Container>{children}</Container>
      </main>
      <footer className="site-footer">
        <FooterInner>
          <span className="text-muted">© 2021, NEANDERTALECJ DEVELOP. All rights reserved.</span>
        </FooterInner>
      </footer>
    </div>
  </div>
)

export default Layout
