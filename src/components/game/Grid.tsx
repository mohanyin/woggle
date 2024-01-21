import { styled } from "@linaria/react";
import { useState } from "react";

import { Border, BorderRadius, Colors } from "@/styles/core";

const ROWS = 4;
const COLS = 4;

const GridStyles = styled.div`
  display: grid;
  grid-template-rows: repeat(${ROWS}, 1fr);
  grid-template-columns: repeat(${COLS}, 1fr);
  gap: 12px;
`;

const GridSpot = styled.div`

  background: ${Colors.GREEN_600};  border: ${Border.THIN};
  border-top-width: 4px;
  border-radius: ${BorderRadius.LARGE};
  aspect-ratio: 1;
`;

function Grid() {
  const [count, setCount] = useState(0);

  const tiles = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      tiles.push(
        <GridSpot>
          Tile {r}
          {c}
        </GridSpot>,
      );
    }
  }

  return <GridStyles>{...tiles}</GridStyles>;
}

export default Grid;