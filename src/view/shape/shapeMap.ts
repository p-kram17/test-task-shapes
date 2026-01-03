import { Graphics } from "pixi.js";
import ShapeModel from "../../model/shape";

export type DrawFn = (gfx: Graphics, model: ShapeModel) => void;

function drawPolygon(gfx: Graphics, points: number[], color: number) {
  gfx.moveTo(points[0], points[1]);

  for (let i = 2; i < points.length; i += 2) {
    gfx.lineTo(points[i], points[i + 1]);
  }

  gfx.closePath();
  gfx.fill(color);
}

function generateWeirdPolygon(radius: number, maxPoints = 8): number[] {
  const points: number[] = [];
  const sides = Math.floor(Math.random() * (maxPoints - 3 + 1)) + 3;
  let angle = 0;

  for (let i = 0; i < sides; i++) {
    const step = ((Math.PI * 2) / sides) * (0.5 + Math.random() * 0.8);
    angle += step;

    const r = radius * (0.3 + Math.random() * 0.7);

    const offsetX = (Math.random() - 0.2) * radius;
    const offsetY = (Math.random() - 0.2) * radius;

    points.push(r * Math.cos(angle) + offsetX, r * Math.sin(angle) + offsetY);
  }

  return points;
}

export const drawMap: Record<string, DrawFn> = {
  circle: (gfx, model) => {
    const radius = Math.min(model.data.width, model.data.height) / 2;
    gfx.circle(0, 0, radius).fill(model.data.color);
    gfx.position.set(model.data.x + radius, model.data.y + radius);
  },

  ellipse: (gfx, model) => {
    const rx = model.data.width / 2;
    const ry = model.data.height / 2;
    gfx.ellipse(0, 0, rx, ry).fill(model.data.color);
    gfx.position.set(model.data.x + rx, model.data.y + ry);
  },

  random: (gfx, model) => {
    const sides = Math.floor(Math.random() * 4) + 3;
    const radius = Math.min(model.data.width, model.data.height) / 2;
    const points: number[] = [];

    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2;
      points.push(radius * Math.cos(angle), radius * Math.sin(angle));
    }

    drawPolygon(gfx, points, model.data.color);

    gfx.position.set(model.data.x + radius, model.data.y + radius);
  },

  weird: (gfx, model) => {
    const radius = Math.min(model.data.width, model.data.height) / 2;
    const points = generateWeirdPolygon(radius, 8);

    drawPolygon(gfx, points, model.data.color);

    gfx.position.set(model.data.x + radius, model.data.y + radius);
  },
};
