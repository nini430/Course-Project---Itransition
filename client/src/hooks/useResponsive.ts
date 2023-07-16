import {useMediaQuery} from '@mui/material'

const useResponsive=()=>{
    const breakpoints = {
        xs: '(max-width: 599px)',
        sm: '(min-width: 600px) and (max-width: 959px)',
        md: '(min-width: 960px) and (max-width: 1279px)',
        lg: '(min-width: 1280px) and (max-width: 1919px)',
        xl: '(min-width: 1920px)',
      };
    const matches={
        xs:useMediaQuery(breakpoints.xs),
        sm:useMediaQuery(breakpoints.sm),
        md:useMediaQuery(breakpoints.md),
        lg:useMediaQuery(breakpoints.lg),
        xl:useMediaQuery(breakpoints.xl)
    }
    return matches;
}


export default useResponsive;