import ShapeModel from ".";

export type AreaFn = (shape: ShapeModel) => number;

export const shapeAreaMap: Record<string, AreaFn> = {
  rect: (shape) => shape.data.width * shape.data.height,
  circle: (shape) => {
    const r = Math.min(shape.data.width, shape.data.height) / 2;
    return Math.PI * r * r;
  },
  ellipse: (shape) =>
    Math.PI * (shape.data.width / 2) * (shape.data.height / 2),
  hexagon: (shape) => {
    const n = 6;
    const radius = Math.min(shape.data.width, shape.data.height) / 2;
    return (n * radius * radius * Math.sin((2 * Math.PI) / n)) / 2;
  },
  random: (shape) => {
    const n = shape.data.sides || 5;
    const radius = Math.min(shape.data.width, shape.data.height) / 2;
    return (n * radius * radius * Math.sin((2 * Math.PI) / n)) / 2;
  },
};
