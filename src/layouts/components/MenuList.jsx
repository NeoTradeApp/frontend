import { useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

function MenuList(props) {
  const { menuList = [], open } = props;
  const navigate = useNavigate();

  const navigateToPath = (path) => navigate(path);

  return (
    <List>
      {menuList.map((menu) => (
        <ListItem key={menu.label} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={() => navigateToPath(menu.path)}
            sx={[
              {
                minHeight: 48,
                px: 2.5,
              },
              open
                ? {
                  justifyContent: 'initial',
                }
                : {
                  justifyContent: 'center',
                },
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: 'center',
                },
                open
                  ? {
                    mr: 3,
                  }
                  : {
                    mr: 'auto',
                  },
              ]}
            >
              {menu.icon}
            </ListItemIcon>
            <ListItemText
              primary={menu.label}
              sx={[
                open
                  ? {
                    opacity: 1,
                  }
                  : {
                    opacity: 0,
                  },
              ]}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default MenuList;
