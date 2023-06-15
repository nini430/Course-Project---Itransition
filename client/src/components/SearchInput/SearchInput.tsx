import styled from 'styled-components'
import {Input} from '@mui/material'
import {Search} from '@mui/icons-material'
import {useTranslation} from 'react-i18next'

const SearchInput = () => {
    const {t}=useTranslation();
  return (
    <StyledInput startAdornment={<Search/>} placeholder={t('nav.search') as string} />
  )
}


const StyledInput=styled(Input)`
    width:40%;
`
export default SearchInput