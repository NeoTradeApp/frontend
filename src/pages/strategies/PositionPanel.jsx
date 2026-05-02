import { useState, useEffect } from "react";
import { Box } from '@mui/material';
import Position from "./Position";

function PositionPanel(props) {
  const { positions: positionsFromProps } = props;
  const [positions, setPositions] = useState(positionsFromProps);

  // const [livePosition] = useWebSocket(WEB_SOCKET.MESSAGE_TYPE.POSITION.UPDATE(positionId));

  useEffect(() => {
    setPositions(positionsFromProps);
  }, [positionsFromProps]);

  return (
    <Box>
      {
        positions.map((position, index) => (
          <Position key={index} position={position} />
        ))
      }
    </Box>
  );
}

export default PositionPanel;
