import * as PIXI from "pixi.js";

import { WorldModel } from "./model/world";
import { WorldView } from "./view/world";
import { ControlsController } from "./controller/ControlsController";

const container = document.getElementById("game")!;
if (!container) throw new Error("Container not found");

const world = new WorldModel();
const worldView = new WorldView(world, container);
const controls = new ControlsController();

world.restartSpawning();

const ticker = new PIXI.Ticker();
ticker.add(() => {
  world.update();
  worldView.update();
  controls.update(world.shapes.length, world.getTotalArea());
});

ticker.start();
