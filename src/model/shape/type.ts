export type ShapeType = "circle" | "ellipse" | "random" | "weird";

export interface ShapeData {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: ShapeType;
  color: number;
  sides?: number;
  area: number;
}
