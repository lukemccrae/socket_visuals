import React from "react";
interface MouthProps {
  rows: number;
  columns: number;
  circleSize: number;
}

const Mouth = (props: MouthProps) => {
  const circles = [];

  for (let row = 0; row < props.rows; row++) {
    for (let col = 0; col < props.columns; col++) {
      const x = col * props.circleSize * 2 + props.circleSize; // 2 for padding
      const y = row * props.circleSize * 2 + props.circleSize; // 2 for padding

      const color = `rgb(${Math.random() * 255},${Math.random() * 255},${
        Math.random() * 255
      })`;

      circles.push(
        <circle
          key={`${row}-${col}`}
          cx={x}
          cy={y}
          r={props.circleSize}
          fill={color}
        />
      );
    }
  }

  const svgWidth = props.columns * props.circleSize * 2 + props.circleSize * 2;
  const svgHeight = props.rows * props.circleSize * 2 + props.circleSize * 2;

  return (
    <svg width={svgWidth} height={svgHeight}>
      {circles}
    </svg>
  );
};

export default Mouth;
