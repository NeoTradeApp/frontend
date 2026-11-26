import { styled } from '@mui/material/styles';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Grid2 as Grid,
} from "@mui/material";
import NetworkStatus from './NetworkStatus';
import WakeLockSwitch from './WakeLockSwitch';

const { REACT_APP_NAME, REACT_APP_DESCRIPTION } = process.env;

const drawerWidth = 265;
const collapsedDrawerWidth = 85; // 4rem

const toolbarHeight = {
  desktop: 85,
  mobile: 160,
};

const CenteredGrid = styled(Grid)({
  display: 'flex',
  justifyContent: 'center', // Centers horizontally
  alignItems: 'center',     // Centers vertically
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => {
  return ({
    zIndex: theme.zIndex.drawer + 1,
    marginLeft: open ? drawerWidth : collapsedDrawerWidth,
    width: `calc(100% - ${open ? drawerWidth : collapsedDrawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  })
});

function Header(props) {
  const { open } = props;

  return (
    <AppBar open={open}>
      <Toolbar
        sx={{
          minHeight: {
            xs: `${toolbarHeight.mobile}px`,
            md: `${toolbarHeight.desktop}px`,
          },
        }}
      >
        <Grid container spacing={2} sx={{ width: "100%" }}>
          <Grid item size={{ md: 2.5, xs: 12 }}>
            <Grid container spacing={2}>
              <CenteredGrid item size={{ md: 4, xs: 4 }}>
                <NetworkStatus />
              </CenteredGrid>
              <CenteredGrid item size={{ md: 8, xs: 8 }}>
                <WakeLockSwitch />
              </CenteredGrid>
            </Grid>
          </Grid>

          <Grid item size={{ md: 7, xs: 12 }}>
            <Grid container spacing={2}>
              <CenteredGrid item size={{ md: 12, xs: 12 }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {REACT_APP_NAME}
                  <Typography size="small">
                    {REACT_APP_DESCRIPTION}
                  </Typography>
                </Typography>
              </CenteredGrid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
