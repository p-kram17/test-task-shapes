import { event } from "./../../core/Events";
import { ShapeFactory } from "../../core/ShapeFactory";
import ShapeModel from "../shape";

export class WorldModel {
  public shapes: ShapeModel[];
  public gravity: number;
  public spawnRate: number;
  public width: number;
  public height: number;
  private factory: ShapeFactory;
  public spawnSpeed: number;
  private spawnAccumulator: number = 0;

  constructor() {
    this.shapes = [];
    this.gravity = 2;
    this.spawnRate = 1;
    this.width = 800;
    this.height = 500;
    this.factory = new ShapeFactory();
    this.spawnSpeed = 1000;

    event.on("spawnShape", ({ x, y }: { x: number; y: number }) => {
      this.addShape(x, y);
    });

    event.on("deleteShape", ({ id }: { id: number }) => {
      this.deleteShape(id);
    });

    event.on("gravityChanged", ({ value }: { value: number }) => {
      this.setGravity(value);
    });

    event.on("spawnRateChanged", ({ value }: { value: number }) => {
      this.setSpawnRate(value);
      this.setSpawnSpeed(value);
      this.restartSpawning();
    });
  }

  addShape(x?: number, y?: number) {
    const shape = this.factory.create(this.width, x, y);
    this.shapes.push(shape);
  }
  deleteShape(id: number) {
    const shapeToDelete = this.shapes.find((s) => s.data.id === id);
    if (!shapeToDelete) return;

    const deletedType = shapeToDelete.data.type;

    this.shapes = this.shapes.filter((s) => s.data.id !== id);

    const shapesToRecolor: number[] = [];
    for (const shape of this.shapes) {
      if (shape.data.type === deletedType) {
        shape.data.color = Math.random() * 0xff0000;
        shapesToRecolor.push(shape.data.id);
      }
    }

    if (shapesToRecolor.length > 0) {
      event.emit("recolorShapes", { ids: shapesToRecolor });
    }
  }

  getTotalArea(): number {
    return this.shapes.reduce((sum, shape) => sum + shape.data.area, 0);
  }

  update(deltaTime?: number) {
    const delta = deltaTime ?? 16.67;

    if (this.gravity !== 0 && this.spawnRate > 0) {
      this.spawnAccumulator += delta;
      while (this.spawnAccumulator >= this.spawnSpeed) {
        this.addShape();
        this.spawnAccumulator -= this.spawnSpeed;
      }
    } else {
      this.spawnAccumulator = 0;
    }

    for (const shape of this.shapes) {
      shape.fall(this.gravity);
    }
    this.shapes = this.shapes.filter(
      (shape) => !shape.isOutOfRect(this.height),
    );
  }

  restartSpawning() {
    this.spawnAccumulator = 0;
  }

  setGravity(value: number) {
    this.gravity = value;
    this.restartSpawning();
  }

  setSpawnRate(value: number) {
    this.spawnRate = value;
  }

  setSpawnSpeed(value: number) {
    this.spawnSpeed = 1000 / value;
  }
}
