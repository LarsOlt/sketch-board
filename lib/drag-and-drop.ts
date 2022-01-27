import { canvasStorage } from "../pages";
import { saveMousePos } from "./drawing";
import { setCursor } from "./utils";

export const dragAndDrop = (ctx: CanvasRenderingContext2D) => {
  const img = new Image();
  img.src = "/images/brimstone.png";

  const imgPos = {
    x: 100,
    y: 100,
    height: 70,
    width: 70,
  };

  const isMouseOverImage = () => {
    const { mousePosition } = canvasStorage;
    return (
      mousePosition.x > imgPos.x &&
      mousePosition.x < imgPos.x + imgPos.width &&
      mousePosition.y > imgPos.y &&
      mousePosition.y < imgPos.y + imgPos.height
    );
  };

  img.addEventListener("load", () => {
    ctx.drawImage(img, 100, 100, imgPos.width, imgPos.height);
  });

  const start = () => {
    console.log(imgPos);

    if (isMouseOverImage()) {
      setCursor("pointer");
    }
  };

  document.addEventListener("mousedown", start);

  return {
    unsubcribe: () => {
      document.removeEventListener("mousedown", start);
    },
  };
};
