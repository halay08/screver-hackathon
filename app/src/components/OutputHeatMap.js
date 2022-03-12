import { useMemo, useRef } from "react";
import { Stage, Layer, Circle, RegularPolygon } from "react-konva";
import useDimensions from "../hooks/use-dimensions";

const MAX_WIDTH = 500;
const CIRCLE_RADIUS = 1.25;
const SQUARE_WIDTH = 100;

const OutputHeatMap = ({ data }) => {
  const containerRef = useRef();
  const containerDimensions = useDimensions(containerRef);
  const { width: containerWidth = 0 } = containerDimensions || {};

  const dimensions = useMemo(() => {
    let scale =
      (containerWidth < MAX_WIDTH ? containerWidth : MAX_WIDTH) / SQUARE_WIDTH;
    let width = SQUARE_WIDTH * scale;
    let height = SQUARE_WIDTH * scale;

    return { width, height, scale };
  }, [containerWidth]);

  const paddingTop = 3 * dimensions.scale;

  const triangle = {
    x: dimensions.width / 2,
    y: dimensions.width / 2 + paddingTop,
    radius: dimensions.width / 2,
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-row items-center justify-center"
    >
      <Stage width={dimensions.width} height={dimensions.height}>
        <Layer>
          <RegularPolygon
            x={triangle.x}
            y={triangle.y}
            sides={3}
            radius={triangle.radius}
            fill="white"
            stroke="white"
            strokeWidth={0}
          />
          {data?.map((item, index) => (
            <Circle
              key={item.id}
              radius={CIRCLE_RADIUS * dimensions.scale}
              fill={index === 0 ? "magenta" : "green"}
              x={item?.coordinates?.x * dimensions.scale}
              y={item?.coordinates?.y * dimensions.scale + paddingTop}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default OutputHeatMap;
