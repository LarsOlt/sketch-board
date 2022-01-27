import type { NextPage } from "next";
import Head from "next/head";
import Overlay from "../components/Overlay";
import { ToolbarProvider } from "../lib/canvas-context";
import Canvas from "../lib/canvas-setup";
import { DrawnLines } from "../lib/drawing";
import styles from "../styles/Home.module.scss";

interface CanvasStorage {
  drawnLines: DrawnLines;
  lastCanvasClear: string | null; // iso date
  mousePosition: { x: number; y: number };
}

interface CanvasSettings {
  drawingColor: string;
  drawingSize: number;
  replaySpeed: number;
  drawingEnabled: boolean;
}

export const canvasSettings: CanvasSettings = {
  drawingColor: "yellow",
  drawingSize: 4,
  replaySpeed: 1,
  drawingEnabled: false,
};

export const canvasStorage: CanvasStorage = {
  drawnLines: [],
  lastCanvasClear: null,
  mousePosition: { x: 0, y: 0 },
};

const Home: NextPage = () => {
  return (
    <div className={styles.Home}>
      <Head>
        <title>Valorant Canvas</title>
      </Head>
      <ToolbarProvider>
        <Canvas />
        <Overlay />
      </ToolbarProvider>
    </div>
  );
};

export default Home;
