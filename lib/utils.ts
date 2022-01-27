export const setCursor = (style: "drawing" | "normal" | "pointer") => {
  const body = document.querySelector("body")!;

  switch (style) {
    case "drawing":
      body.style.cursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  
      width='40' 
      height='48' 
      viewport='0 0 100 100'
      style='fill:black'></svg>") 5 35 auto`;
      break;
    case "normal":
      body.style.cursor = "default";
      break;
    case "pointer":
      body.style.cursor = "pointer";
      break;
  }
};
