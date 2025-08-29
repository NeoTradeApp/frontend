import { styled } from '@mui/material/styles';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutButton from "./LogoutButton";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

function Header(props) {
  const { open, menuIcon } = props;

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        {menuIcon}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Trade App
        </Typography>
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
