import type { NextPage } from "next";
import Head from "next/head";
import Toolbar from "../components/Toolbar";
import { ToolbarProvider } from "../lib/canvas-context";
import Canvas from "../lib/canvas-setup";
import { DrawnLines } from "../lib/drawing";
import styles from "../styles/Home.module.scss";

interface CanvasStorage {
  drawnLines: DrawnLines;
  lastCanvasClear: string | null; // iso date
}

interface CanvasSettings {
  drawingColor: string;
  drawingSize: number;
  replaySpeed: number;
}

export const canvasSettings: CanvasSettings = {
  drawingColor: "yellow",
  drawingSize: 1,
  replaySpeed: 1,
};

export const canvasStorage: CanvasStorage = {
  drawnLines: [],
  lastCanvasClear: null,
};

const Home: NextPage = () => {
  return (
    <div className={styles.Home}>
      <Head>
        <title>Sketch Board</title>
      </Head>
      <ToolbarProvider>
        <Canvas />
        <Toolbar />
      </ToolbarProvider>
    </div>
  );
};

export default Home;
