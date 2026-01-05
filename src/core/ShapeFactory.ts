import ShapeModel from "../model/shape";
import { ShapeType } from "../model/shape/type";

export class ShapeFactory {
  private nextId: number = 0;

  private shapeTypes: ShapeType[] = ["circle", "ellipse", "random", "weird"];

  create(
    gameWidth: number,
    x?: number,
    y?: number,
    sides?: number,
  ): ShapeModel {
    const width = 100;
    const height = 50;

    const posX = x ?? Math.random() * gameWidth;
    const posY = y ?? -height;
    const type = this.getRandomType();
    const color = Math.random() * 0xff0000;

    return new ShapeModel({
      id: this.nextId++,
      x: posX,
      y: posY,
      width,
      height,
      type,
      color,
      sides,
      area: 0,
    });
  }

  private getRandomType(): ShapeType {
    return this.shapeTypes[Math.floor(Math.random() * this.shapeTypes.length)];
  }
}
