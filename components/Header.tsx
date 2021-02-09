import Link from 'next/link'
import { Container } from './styledComponents/general'
import styled from 'styled-components'

const MenuItem = styled.div`
  display: inline-block;
  padding: 10px 20px;
`

const IconMenu = styled.div`
  margin-right: auto;
  display: inline-block;
  padding: 10px 20px;
`

const HeaderInner = styled.div`
  padding 10px 20px;
`

const Header: React.FC = () => {
  return (
    <Container>
      <HeaderInner>
        <IconMenu>
          <Link href="/" passHref>
            <a className="item-menu menu-icon">TEST</a>
          </Link>
        </IconMenu>
        <MenuItem>
          <Link href="/" passHref>
            <a className="item-menu">Home</a>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/createPost" passHref>
            <a className="item-menu">Create post</a>
          </Link>
        </MenuItem>
      </HeaderInner>
    </Container>
  )
}

export default Header
