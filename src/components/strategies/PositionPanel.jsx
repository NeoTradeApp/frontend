import { useState, useEffect } from "react";
import { Box } from '@mui/material';
import Position from "./Position";

function PositionPanel(props) {
  const { strategyId, positions: positionsFromProps } = props;
  const [positions, setPositions] = useState(positionsFromProps);

  useEffect(() => {
    setPositions(positionsFromProps);
  }, [positionsFromProps]);

  return (
    <Box>
      {
        positions
          .sort((a, b) => new Date(b.entryTime) - new Date(a.entryTime))
          .map((position, index) => (
            <Position key={index} strategyId={strategyId} position={position} />
          ))
      }
    </Box>
  );
}

export default PositionPanel;
