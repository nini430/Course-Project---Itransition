import {Link} from 'react-router-dom'
import styled from 'styled-components'

import SiteLogo from '../../assets/logo.jpg'


const Logo = () => {
  return (
    <Link to="/">
    <LogoImg width={60} height="auto" src={SiteLogo} alt="" />
    </Link>
    
  )
}

const LogoImg=styled.img`
     border-radius:50%;     
`

export default Logo;