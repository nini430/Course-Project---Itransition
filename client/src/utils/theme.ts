import { createTheme } from '@mui/material';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#fff',
      contrastText:'#000'
    },
    secondary: {
      main: '#555', 
      contrastText:'#000'
    },
    text:{
      primary:'#000',
      secondary:'#fff'
    }
  },
  components:{
    MuiTypography:{
      styleOverrides:{
        root:{
          color:'#000'
        }
      }
    },
    MuiSvgIcon:{
      styleOverrides:{
        root:{
          fill:'black'
        }
      }
    },
    MuiButton:{
      styleOverrides:{
        root:{
          color:'#000'
        }
      }
    },
    MuiCircularProgress:{
      styleOverrides:{
        root:{
          color:'black'
        }
      }
    },
    MuiTab:{
      styleOverrides:{
        root:{
          color:'black'
        }
      }
    },
    MuiInputLabel:{
      styleOverrides:{
        root:{
          color:'#000'
        }
      }
    }
  }
  

});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#000', 
      contrastText:'#fff'
    },
    secondary: {
      main: '#000000',
      contrastText:'#fff' 
    },
    divider:'#fff',
    text:{
      primary:'#fff',
      secondary:'#fff',
    }
  },
  components:{
    MuiTypography:{
      styleOverrides:{
        root:{
          color:'#fff'
        }
      }
    },
    MuiSvgIcon:{
      styleOverrides:{
        root:{
          fill:'#fff'
        }
      }
    },
    MuiButton:{
      styleOverrides:{
        root:{
          color:'#fff'
        }
      }
    },
    MuiCircularProgress:{
      styleOverrides:{
        root:{
          color:'#fff'
        }
      }
    },
    MuiTab:{
      styleOverrides:{
        root:{
          color:'#fff'
        }
      }
    },
    MuiInputLabel:{
      styleOverrides:{
        root:{
          color:'white'
        }
      }
    }
  }

});

export { lightTheme, darkTheme };
