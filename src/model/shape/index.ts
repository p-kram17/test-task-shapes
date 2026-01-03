import { shapeAreaMap } from "./shapeAreaMap";
import { ShapeData } from "./type";

export class ShapeModel {
  data: ShapeData;

  constructor(data: ShapeData) {
    this.data = data;
    this.data.area = this.calculateArea();
  }

  fall(gravity: number) {
    this.data.y += gravity;
  }

  private calculateArea(): number {
    const fn = shapeAreaMap[this.data.type];
    if (fn) return fn(this);
    return this.data.width * this.data.height;
  }

  isOutOfRect(endY: number) {
    return this.data.y > endY;
  }
}

export default ShapeModel;
