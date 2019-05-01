import { createMuiTheme } from '@material-ui/core/styles';

export const AppBarTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "hsla(213, 100%, 15%, .9)",
    }
  },
  overrides: {
    MuiAppBar: {
      root: {
        height: '42px',
      }
    }
  }
});