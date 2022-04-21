import { useContext } from "react";
import { canvasSettings, canvasStorage } from "../pages";
import { setCursor } from "./utils";

type MousePosition = { x: number; y: number };
export type DrawnLines = { lines: MousePosition[]; canvasSettings: typeof canvasSettings }[];

export const enableDrawing = (ctx: CanvasRenderingContext2D) => {
  const mousePosition: MousePosition = { x: 0, y: 0 };
  const { canvas } = ctx;
  const drawnLines: DrawnLines = [];

  const draw = (e: MouseEvent) => {
    ctx.beginPath();
    ctx.lineWidth = canvasSettings.drawingSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = canvasSettings.drawingColor;

    ctx.moveTo(mousePosition.x, mousePosition.y);
    saveMousePos(e);
    ctx.lineTo(mousePosition.x, mousePosition.y);
    ctx.stroke();
  };

  const saveMousePos = (e: MouseEvent) => {
    drawnLines[drawnLines.length - 1].lines.push({ ...mousePosition });

    mousePosition.x = e.clientX - canvas.offsetLeft;
    mousePosition.y = e.clientY - canvas.offsetTop;
  };

  const start = (e: MouseEvent) => {
    setCursor("drawing");
    drawnLines.push({ lines: [], canvasSettings: { ...canvasSettings } });
    document.addEventListener("mousemove", draw);
    saveMousePos(e);
  };

  const stop = (e: MouseEvent) => {
    setCursor("normal");
    document.removeEventListener("mousemove", draw);
    canvasStorage.drawnLines = drawnLines;
  };

  document.addEventListener("mousedown", start);
  document.addEventListener("mouseup", stop);

  return {
    unsubcribe: () => {
      document.removeEventListener("mousedown", start);
      document.removeEventListener("mousedown", stop);
    },
  };
};
