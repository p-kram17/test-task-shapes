import * as PIXI from "pixi.js";
import { WorldModel } from "../../model/world";
import { ShapeView } from "../shape";
import { event } from "./../../core/Events";

export class WorldView {
  public app: PIXI.Application;
  private world: WorldModel;
  private shapeViews: Map<number, ShapeView> = new Map();
  private lastShapeCount: number = 0;

  constructor(world: WorldModel, container: HTMLElement) {
    this.world = world;

    this.app = new PIXI.Application();
    globalThis.__PIXI_APP__ = this.app;
    this.init(container);
  }

  async init(container: HTMLElement) {
    await this.app.init({
      width: this.world.width,
      height: this.world.height,
      background: 0xeeeeee,
    });

    container.appendChild(this.app.canvas);

    this.app.stage.interactive = true;
    this.app.stage.hitArea = new PIXI.Rectangle(
      0,
      0,
      this.world.width,
      this.world.height,
    );

    this.app.stage.on("pointerdown", (e: PIXI.FederatedPointerEvent) => {
      const pos = e.getLocalPosition(this.app.stage);
      event.emit("spawnShape", { x: pos.x, y: pos.y });
    });
    event.on("recolorShapes", ({ ids }: { ids: number[] }) => {
      for (const id of ids) {
        const view = this.shapeViews.get(id);
        if (view) {
          view.draw();
          view.update();
        }
      }
    });

    this.app.ticker.add(() => this.update());
  }

  update() {
    const currentCount = this.world.shapes.length;
    if (currentCount < this.lastShapeCount) {
      for (const view of this.shapeViews.values()) {
        view.draw();
      }
    }
    this.lastShapeCount = currentCount;

    for (const shape of this.world.shapes) {
      if (!this.shapeViews.has(shape.data.id)) {
        const view = new ShapeView(shape);
        this.app.stage.addChild(view.shape);
        this.shapeViews.set(shape.data.id, view);
      }
    }

    for (const view of this.shapeViews.values()) {
      view.update();
    }

    for (const [id, view] of this.shapeViews.entries()) {
      if (!this.world.shapes.find((s) => s.data.id === id)) {
        this.app.stage.removeChild(view.shape);
        this.shapeViews.delete(id);
      }
    }
  }
}
