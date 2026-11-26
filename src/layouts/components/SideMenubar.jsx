import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthentionStatus } from "@redux/userSlice";

import { styled } from "@mui/material/styles";

import {
  Drawer as MuiDrawer,
  Divider,
} from "@mui/material";

import {
  Speed as SpeedIcon,
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  StackedBarChart as StackedBarChartIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import { logoutApi } from "@api";
import { ModalDialog } from "@components"
import MenuList from "./MenuList";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          "& .MuiDrawer-paper": openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": closedMixin(theme),
        },
      },
    ],
  }),
);

const MENU_LIST = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
    path: "/",
  },
  {
    label: "Live Strategy",
    icon: <TrendingUpIcon />,
    path: "/active-strategies",
  },
  {
    label: "P&L Reports",
    icon: <StackedBarChartIcon />,
    path: "/reports/pnl",
  },
  {
    label: "Backtesting",
    icon: <SpeedIcon />,
    path: "/backtest",
  },
];

function SideMenubar(props) {
  const { open, icon } = props;
  const dialogRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    logoutApi()
      .then(() => {
        dispatch(setAuthentionStatus(false));
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  const logoutMenu = {
    label: "Logout",
    icon: <LogoutIcon />,
    onClick: () => dialogRef.current?.open(),
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        {icon}
      </DrawerHeader>
      <Divider />
      <MenuList menuList={MENU_LIST} open={open} />
      <Divider />
      <MenuList menuList={[logoutMenu]} open={open} />
      <ModalDialog
        ref={dialogRef}
        title={"Confirm Logout"}
        body={"Are you sure you want to log out?"}
        submitButtonLabel={"Yes"}
        cancelButtonLabel={"No"}
        onSubmit={handleLogout}
      />
    </Drawer>
  );
}

export default SideMenubar;
