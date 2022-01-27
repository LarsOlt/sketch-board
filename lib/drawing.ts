import { canvasSettings, canvasStorage } from "../pages";
import { setCursor } from "./utils";

type MousePosition = { x: number; y: number };
export type DrawnLines = { lines: MousePosition[]; canvasSettings: typeof canvasSettings }[];

export const saveMousePos = (e: MouseEvent, ctx: CanvasRenderingContext2D) => {
  const { mousePosition } = canvasStorage;

  mousePosition.x = e.clientX - ctx.canvas.offsetLeft;
  mousePosition.y = e.clientY - ctx.canvas.offsetTop;
};

export const drawing = (ctx: CanvasRenderingContext2D) => {
  const drawnLines: DrawnLines = [];

  const { mousePosition } = canvasStorage;

  const draw = (e: MouseEvent) => {
    ctx.beginPath();
    ctx.lineWidth = canvasSettings.drawingSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = canvasSettings.drawingColor;

    ctx.moveTo(mousePosition.x, mousePosition.y);
    saveMousePos(e, ctx);
    drawnLines[drawnLines.length - 1].lines.push({ ...mousePosition });
    ctx.lineTo(mousePosition.x, mousePosition.y);
    ctx.stroke();
  };

  const start = (e: MouseEvent) => {
    setCursor("drawing");
    drawnLines.push({ lines: [], canvasSettings: { ...canvasSettings } });
    document.addEventListener("mousemove", draw);
    saveMousePos(e, ctx);
    drawnLines[drawnLines.length - 1].lines.push({ ...mousePosition });
  };

  const stop = (e: MouseEvent) => {
    setCursor("normal");
    document.removeEventListener("mousemove", draw);
    canvasStorage.drawnLines = drawnLines;

    if (!canvasSettings.drawingEnabled) {
      disableDrawing();
    }
  };

  const disableDrawing = () => {
    document.removeEventListener("mousedown", start);
    document.removeEventListener("mousedown", stop);
  };

  const enableDrawing = () => {
    document.addEventListener("mousedown", start);
    document.addEventListener("mouseup", stop);
  };

  return {
    disableDrawing,
    enableDrawing,
  };
};
