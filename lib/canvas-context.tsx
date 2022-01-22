import React from "react";
import { canvasSettings, canvasStorage } from "../pages";
import { DrawnLines } from "./drawing";

interface ContextValue {
  clearCanvas: () => void;
  setCtx: (ctx: CanvasRenderingContext2D) => void;
  replayDrawnLines: () => void;
}

const replayDrawnLines = async (ctx: CanvasRenderingContext2D, drawnLines: DrawnLines) => {
  for (let x = 0; x < drawnLines.length; x++) {
    const completeLine = drawnLines[x];

    completeLine.lines.shift();

    for (let i = 0; i < completeLine.lines.length; i++) {
      let position = completeLine.lines[i] || completeLine.lines[i];

      ctx.beginPath();
      ctx.strokeStyle = completeLine.canvasSettings.drawingColor;
      ctx.moveTo(position.x, position.y);

      const nextPosition = completeLine.lines[i + 1];

      if (nextPosition) {
        position = nextPosition;
      }

      ctx.lineTo(position.x, position.y);
      ctx.stroke();

      if (canvasStorage.lastCanvasClear) {
        if (Date.now() - Date.parse(canvasStorage.lastCanvasClear) < 100) {
          clearCanvas(ctx);
          return;
        }
      }

      await new Promise((resolve) => setTimeout(resolve, canvasSettings.replaySpeed));
    }
  }
};

const clearCanvas = (ctx: CanvasRenderingContext2D) => {
  ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  canvasStorage.lastCanvasClear = new Date().toISOString();
};

export const ToolbarContext = React.createContext<ContextValue>(null as any);

export const ToolbarProvider: React.FC = ({ children }) => {
  const [ctx, setCtx] = React.useState<CanvasRenderingContext2D>();

  const value = React.useMemo<ContextValue>(
    () => ({
      clearCanvas: () => clearCanvas(ctx!),
      setCtx: (ctx) => setCtx(ctx),
      replayDrawnLines: () => replayDrawnLines(ctx!, canvasStorage.drawnLines),
    }),
    [ctx]
  );

  return <ToolbarContext.Provider value={value}>{children}</ToolbarContext.Provider>;
};
