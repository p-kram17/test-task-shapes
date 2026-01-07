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

  isOutOfRect(worldHeight: number) {
    // Remove shapes that are completely off-screen (above or below)
    const shapeHeight = this.data.height;
    // Below screen: shape's top edge is below the bottom of the screen
    // Above screen: shape's bottom edge is at or above the top of the screen (y=0)
    // This removes shapes that are completely above the visible area
    const bottomEdge = this.data.y + shapeHeight;
    return this.data.y > worldHeight || bottomEdge <= 0;
  }
}

export default ShapeModel;
