import { cx0, cy0, r0, svgns } from './constant';
import { Point } from './interfaces/Point';

export const getAnglesFormIndex = (index: number) => (index * 2 * Math.PI) / 10;
export const getPointsFormAngles = (angle: number) => {
  return {
    x: cx0 + r0 * Math.cos(angle),
    y: cy0 + r0 * Math.sin(angle),
  };
};

const container = document.querySelector('g.lines');

export const drawLine = (p1: Point, p2: Point) => {
  const line = document.createElementNS(svgns, 'line');
  line.setAttributeNS(null, 'x1', p1.x + '');
  line.setAttributeNS(null, 'y1', p1.y + '');
  line.setAttributeNS(null, 'x2', p2.x + '');
  line.setAttributeNS(null, 'y2', p2.y + '');
  container && container.appendChild(line);
};
