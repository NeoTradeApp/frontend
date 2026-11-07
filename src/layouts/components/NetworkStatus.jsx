
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Chip } from "@mui/material";
import {
  Circle as CircleIcon,
  WifiRounded as WifiRoundedIcon,
  WifiOffRounded as WifiOffRoundedIcon,
  SyncRounded as SyncRoundedIcon,
} from "@mui/icons-material";

import { WEB_SOCKET } from "@constants";

function NetworkStatus() {
  const status = useSelector((state) => state.network.socketStatus);

  const config = {
    [WEB_SOCKET.STATUS.ONLINE]: {
      label: "Online",
      color: "success",
      icon: WifiRoundedIcon,
    },
    [WEB_SOCKET.STATUS.OFFLINE]: {
      label: "Offline",
      color: "error",
      icon: WifiOffRoundedIcon,
    },
    [WEB_SOCKET.STATUS.CONNECTING]: {
      label: "Connecting",
      color: "warning",
      icon: SyncRoundedIcon,
    },
    default: {
      label: "Idle",
      color: "disabled",
      icon: CircleIcon,
    }
  };

  const statusStyle = config[status] || config.default;
  const Icon = statusStyle.icon;

  return (
    <Chip
      size="small"
      variant="outlined"
      color={statusStyle.color}
      icon={
        <Icon
          sx={{
            fontSize: "17px !important",
            ...(status === "connecting" && {
              animation: "spin 1.2s linear infinite",
              "@keyframes spin": {
                "100%": {
                  transform: "rotate(360deg)",
                },
              },
            }),
          }}
        />
      }
      label={statusStyle.label}
      sx={{
        fontWeight: 600,
        borderRadius: 1.5,
        height: 27,
        "& .MuiChip-label": {
          px: 1,
          fontSize: 12,
        },
      }}
    />
  );
}

export default NetworkStatus;
