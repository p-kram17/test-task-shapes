export type ShapeType =
  | "circle"
  | "ellipse"
  | "triangle"
  | "square"
  | "pentagon"
  | "hexagon"
  | "random";

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
