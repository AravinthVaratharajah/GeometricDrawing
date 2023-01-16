import { r, samples, svgns } from './constant';
import { Point } from './interfaces/Point';
import { drawLine, getAnglesFormIndex, getPointsFormAngles } from './misc';
import './style.scss';

const container = document.querySelector('g.samples');

if (container === null) {
  throw new Error('Cannot find.');
}

for (let i = 0; i < samples; i++) {
  const angle = getAnglesFormIndex(i);
  const { x: cx, y: cy } = getPointsFormAngles(angle);
  const circle = document.createElementNS(svgns, 'circle');
  circle.setAttributeNS(null, 'cx', cx + '');
  circle.setAttributeNS(null, 'cy', cy + '');
  circle.setAttributeNS(null, 'r', r + '');
  container && container.appendChild(circle);
}

const p1: Point = { x: 20, y: 32 };
const p2: Point = { x: 40, y: 52 };

drawLine(p1, p2);
