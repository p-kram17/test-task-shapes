import ShapeModel from ".";

export type AreaFn = (shape: ShapeModel) => number;

// Helper function to calculate area of a regular polygon
function regularPolygonArea(n: number, radius: number): number {
  return (n * radius * radius * Math.sin((2 * Math.PI) / n)) / 2;
}

export const shapeAreaMap: Record<string, AreaFn> = {
  rect: (shape) => shape.data.width * shape.data.height,
  circle: (shape) => {
    const r = Math.min(shape.data.width, shape.data.height) / 2;
    return Math.PI * r * r;
  },
  ellipse: (shape) =>
    Math.PI * (shape.data.width / 2) * (shape.data.height / 2),
  triangle: (shape) => {
    const radius = Math.min(shape.data.width, shape.data.height) / 2;
    return regularPolygonArea(3, radius);
  },
  square: (shape) => {
    const radius = Math.min(shape.data.width, shape.data.height) / 2;
    return regularPolygonArea(4, radius);
  },
  pentagon: (shape) => {
    const radius = Math.min(shape.data.width, shape.data.height) / 2;
    return regularPolygonArea(5, radius);
  },
  hexagon: (shape) => {
    const radius = Math.min(shape.data.width, shape.data.height) / 2;
    return regularPolygonArea(6, radius);
  },
  random: (shape) => {
    const n = shape.data.sides || 3;
    const radius = Math.min(shape.data.width, shape.data.height) / 2;
    return regularPolygonArea(n, radius);
  },
};
