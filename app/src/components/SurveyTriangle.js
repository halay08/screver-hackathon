import { useEffect, useMemo, useRef, useState } from "react";
import { Stage, Layer, Circle, RegularPolygon, Text } from "react-konva";
import useDimensions from "../hooks/use-dimensions";

const MAX_WIDTH = 500;
const CIRCLE_RADIUS = 3;
const FONT_SIZE = 5;
const SQUARE_WIDTH = 100;

const SurveyTriangle = ({ onSubmit }) => {
  const containerRef = useRef();
  const triangleRef = useRef();
  const circleRef = useRef();
  const containerDimensions = useDimensions(containerRef);
  const { width: containerWidth = 0 } = containerDimensions || {};
  const [circleProps, setCircleProps] = useState();

  const dimensions = useMemo(() => {
    let scale =
      (containerWidth < MAX_WIDTH ? containerWidth : MAX_WIDTH) / SQUARE_WIDTH;
    let width = SQUARE_WIDTH * scale;
    let height = SQUARE_WIDTH * scale;

    return { width, height, scale };
  }, [containerWidth]);

  const fontSize = FONT_SIZE * dimensions.scale;
  const paddingTop = 3 * dimensions.scale;

  const triangle = {
    x: dimensions.width / 2,
    y: dimensions.width / 2 + paddingTop,
    radius: dimensions.width / 2,
  };

  useEffect(() => {
    setCircleProps({
      x: dimensions.width / 2,
      y: dimensions.width / 2 + paddingTop,
    });
  }, [dimensions, paddingTop]);

  const onSaveClick = () => {
    onSubmit({
      x: circleProps?.x / dimensions.scale,
      y: (circleProps?.y - paddingTop) / dimensions.scale,
    });
  };

  return (
    <>
      <div
        ref={containerRef}
        className="flex flex-row items-center justify-center"
      >
        <Stage width={dimensions.width} height={dimensions.height}>
          <Layer>
            <RegularPolygon
              ref={triangleRef}
              x={triangle.x}
              y={triangle.y}
              sides={3}
              radius={triangle.radius}
              fill="white"
              stroke="white"
              strokeWidth={0}
            />
            <Text
              text="Sleeping"
              fill="white"
              fontSize={fontSize}
              align="right"
              width={dimensions.width / 2 - 5 * dimensions.scale}
              y={0}
            />
            <Text
              text="Working"
              fill="white"
              fontSize={fontSize}
              align="right"
              width={dimensions.width}
              y={dimensions.height - fontSize * 4}
            />
            <Text
              text="Eating"
              fill="white"
              fontSize={fontSize}
              width={dimensions.width}
              y={dimensions.height - fontSize * 4}
            />
            {circleProps && (
              <Circle
                ref={circleRef}
                // width={30 * dimensions.scale}
                // height={30 * dimensions.scale}
                radius={CIRCLE_RADIUS * dimensions.scale}
                fill="green"
                x={circleProps?.x}
                y={circleProps?.y}
                // offsetX={30 * dimensions.scale / 2}
                // offsetY={30 * dimensions.scale / 2}
                draggable
                onMouseEnter={() =>
                  (document.querySelector("body").style.cursor = "grab")
                }
                onMouseLeave={() =>
                  (document.querySelector("body").style.cursor = "auto")
                }
                onDragStart={() => {
                  document.querySelector("body").style.cursor = "grabbing";
                }}
                onDragEnd={(e) => {
                  document.querySelector("body").style.cursor = "auto";
                  const targetRect = e.target.absolutePosition();

                  if (triangleRef.current.intersects(targetRect)) {
                    setCircleProps(() => ({
                      x: targetRect.x,
                      y: targetRect.y,
                    }));
                  } else {
                    setCircleProps((prev) => ({ ...prev }));
                    circleRef.current.absolutePosition(circleProps);
                  }

                  circleRef.current.opacity(1);
                  circleRef.current.fill("green");
                }}
                onDragMove={(e) => {
                  const targetRect = e.target.absolutePosition();

                  if (triangleRef.current.intersects(targetRect)) {
                    circleRef.current.opacity(1);
                    circleRef.current.fill("green");
                  } else {
                    circleRef.current.opacity(0.35);
                    circleRef.current.fill("red");
                  }
                }}
              />
            )}
          </Layer>
        </Stage>
      </div>
      <div className="flex flex-col items-center">
        <button
          onClick={onSaveClick}
          className="bg-white py-2 px-10 rounded-sm text-black"
        >
          Save
        </button>
      </div>
    </>
  );
};

export default SurveyTriangle;
