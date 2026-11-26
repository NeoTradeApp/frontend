import { useState } from 'react';

import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import {
  PushPin as PushPinIcon,
  PushPinOutlined as PushPinOutlinedIcon,
  MoreVert as MoreVertIcon
} from "@mui/icons-material";

export default function MoreOptionsMenu({ isPinned = false, onPin }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (callback) => {
    handleClose();
    if (callback) callback();
  };

  return (
    <>
      <IconButton
        aria-label="more options"
        aria-controls={open ? 'more-options-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="more-options-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleAction(onPin)}>
          <ListItemIcon>
            {isPinned ? <PushPinIcon fontSize="small" /> : <PushPinOutlinedIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText>{isPinned ? 'Unpin' : 'Pin'}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
