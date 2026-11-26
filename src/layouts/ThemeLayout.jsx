
import { useState } from "react";
import { Outlet } from "react-router-dom";

import { styled } from '@mui/material/styles';
import {
  Box,
  CssBaseline,
  IconButton
} from '@mui/material';

import {
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

import Header from './components/Header';
import SideMenubar from "./components/SideMenubar";

const toolbarHeight = {
  desktop: 75,
  mobile: 160,
};

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  [theme.breakpoints.up("md")]: {
    minHeight: toolbarHeight.desktop,
  },

  [theme.breakpoints.down("md")]: {
    minHeight: toolbarHeight.mobile,
  },
}));

function ThemeLayout() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header open={open} />

      <SideMenubar open={open} icon={
        <IconButton onClick={toggleDrawer}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      } />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default ThemeLayout;
