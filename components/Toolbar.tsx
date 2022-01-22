import styles from "../styles/Toolbar.module.scss";
import React, { useContext } from "react";
import { ToolbarContext } from "../lib/canvas-context";
import { canvasSettings, canvasStorage } from "../pages";
import { ColorChangeHandler, CirclePicker } from "react-color";

interface SliderProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  labelText: string;
}

const Slider: React.FC<SliderProps> = ({ labelText, ...rest }) => {
  return (
    <label style={{ display: "flex", flexDirection: "column", color: "white" }}>
      {labelText}
      <input {...rest} />
    </label>
  );
};

const Toolbar: React.FC = (props) => {
  const { clearCanvas, replayDrawnLines } = useContext(ToolbarContext);

  const onColorChange: ColorChangeHandler = (data) => {
    canvasSettings.drawingColor = data.hex;
  };

  return (
    <>
      <div className={styles.Toolbar}>
        <button onClick={() => clearCanvas()}>Clear Canvas</button>
        <button onClick={() => replayDrawnLines()}>Replay Drawing</button>
        <button
          onClick={() => {
            canvasStorage.drawnLines = []; // FIXME: Clear Drawing replay not working
          }}
        >
          Clear Drawing Replay
        </button>
        <Slider
          labelText="Replay Speed"
          type="range"
          min={1}
          max={10}
          step={1}
          defaultValue={canvasSettings.replaySpeed}
          onChange={(e) => {
            canvasSettings.replaySpeed = parseInt(e.target.value);
          }}
        />

        <Slider
          labelText="Size"
          type="range"
          min={1}
          max={20}
          step={1}
          defaultValue={canvasSettings.drawingSize}
          onChange={(e) => {
            canvasSettings.drawingSize = parseInt(e.target.value);
          }}
        />
      </div>
      <div className={styles.Colorpicker}>
        <CirclePicker onChange={onColorChange} />
      </div>
    </>
  );
};
export default Toolbar;
