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

// Helper function to draw a regular polygon
function drawRegularPolygon(
  gfx: Graphics,
  sides: number,
  radius: number,
  color: number,
) {
  const points: number[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2;
    points.push(radius * Math.cos(angle), radius * Math.sin(angle));
  }
  drawPolygon(gfx, points, color);
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

  triangle: (gfx, model) => {
    const radius = Math.min(model.data.width, model.data.height) / 2;
    drawRegularPolygon(gfx, 3, radius, model.data.color);
    gfx.position.set(model.data.x + radius, model.data.y + radius);
  },

  square: (gfx, model) => {
    const radius = Math.min(model.data.width, model.data.height) / 2;
    drawRegularPolygon(gfx, 4, radius, model.data.color);
    gfx.position.set(model.data.x + radius, model.data.y + radius);
  },

  pentagon: (gfx, model) => {
    const radius = Math.min(model.data.width, model.data.height) / 2;
    drawRegularPolygon(gfx, 5, radius, model.data.color);
    gfx.position.set(model.data.x + radius, model.data.y + radius);
  },

  hexagon: (gfx, model) => {
    const radius = Math.min(model.data.width, model.data.height) / 2;
    drawRegularPolygon(gfx, 6, radius, model.data.color);
    gfx.position.set(model.data.x + radius, model.data.y + radius);
  },

  random: (gfx, model) => {
    // Use stored sides from model, or default to 3 if not set
    const sides = model.data.sides ?? 3;
    const radius = Math.min(model.data.width, model.data.height) / 2;
    drawRegularPolygon(gfx, sides, radius, model.data.color);
    gfx.position.set(model.data.x + radius, model.data.y + radius);
  },
};
