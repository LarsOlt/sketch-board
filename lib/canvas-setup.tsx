import React, { useContext } from "react";
import { useEffect } from "react";
import { ToolbarContext } from "./canvas-context";
import { drawing } from "./drawing";

const Canvas: React.FC = () => {
  const toolbarContext = useContext(ToolbarContext);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const resizeCanvas = () => {
    if (!canvasRef.current) return;

    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
  };

  useEffect(() => {
    const canvasEle = canvasRef.current!;
    const ctx = canvasEle.getContext("2d")!;

    toolbarContext.setCtx(ctx);

    drawing(ctx);

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [toolbarContext]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        backgroundColor: "#0D131B",
      }}
    ></canvas>
  );
};

export default Canvas;
