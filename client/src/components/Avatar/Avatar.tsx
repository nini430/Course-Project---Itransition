import styled from 'styled-components'

interface IAvatarProps {
    width:string | number;
    height:string | number;
    src:string;
}

const Avatar = ({width,height,src}:IAvatarProps) => {
  return (
    <StyledImage src={src} width={width} height={height} alt="avatar" />
  )
}


const StyledImage=styled.img`
    border-radius:50%;
    object-fit:cover;
`

export default Avatar;