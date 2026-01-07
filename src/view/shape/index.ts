import * as PIXI from "pixi.js";
import ShapeModel from "../../model/shape";
import { drawMap } from "./shapeMap";
import { event } from "../../core/Events";

export class ShapeView {
  public shape: PIXI.Graphics;
  public model: ShapeModel;

  constructor(model: ShapeModel) {
    this.model = model;
    this.shape = new PIXI.Graphics();
    this.draw();

    this.shape.interactive = true;
    this.shape.cursor = "pointer";

    this.shape.on("pointerdown", (e: PIXI.FederatedPointerEvent) => {
      e.stopPropagation();
      event.emit("deleteShape", { id: this.model.data.id });
    });
  }

  draw() {
    this.shape.clear();

    const drawFn = drawMap[this.model.data.type];
    if (drawFn) drawFn(this.shape, this.model);
  }
  update() {
    // Update position with radius offset to match how draw() sets it
    const radius = Math.min(this.model.data.width, this.model.data.height) / 2;
    this.shape.position.set(
      this.model.data.x + radius,
      this.model.data.y + radius,
    );
  }
}
