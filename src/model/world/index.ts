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
  private spawnTimer: number | null = null;

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
    this.shapes = this.shapes.filter((s) => s.data.id !== id);
  }

  getTotalArea(): number {
    return this.shapes.reduce((sum, shape) => sum + shape.data.area, 0);
  }

  update() {
    for (const shape of this.shapes) {
      shape.fall(this.gravity);
    }
    this.shapes = this.shapes.filter(
      (shape) => !shape.isOutOfRect(this.height),
    );
  }

  restartSpawning() {
    if (this.spawnTimer !== null) {
      clearInterval(this.spawnTimer);
      this.spawnTimer = null;
    }

    if (this.spawnRate <= 0) return;

    this.spawnTimer = window.setInterval(() => {
      this.addShape();
    }, this.spawnSpeed);
  }

  setGravity(value: number) {
    this.gravity = value;
  }

  setSpawnRate(value: number) {
    this.spawnRate = value;
  }

  setSpawnSpeed(value: number) {
    this.spawnSpeed = 1000 / value;
  }
}
