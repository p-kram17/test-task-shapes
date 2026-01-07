import ShapeModel from "../model/shape";
import { ShapeType } from "../model/shape/type";

export class ShapeFactory {
  private nextId: number = 0;

  private shapeTypes: ShapeType[] = [
    "circle",
    "ellipse",
    "triangle",
    "square",
    "pentagon",
    "hexagon",
    "random",
  ];

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

    // Generate random sides for "random" type if not provided (3-6 sides)
    let randomSides = sides;
    if (type === "random" && !randomSides) {
      randomSides = Math.floor(Math.random() * 4) + 3;
    }

    return new ShapeModel({
      id: this.nextId++,
      x: posX,
      y: posY,
      width,
      height,
      type,
      color,
      sides: randomSides,
      area: 0,
    });
  }

  private getRandomType(): ShapeType {
    return this.shapeTypes[Math.floor(Math.random() * this.shapeTypes.length)];
  }
}
