import { multiplicationFactor, r, samples, svgns } from './constant';
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

for (let i = 0; i < samples; i++) {
  const j = i * multiplicationFactor;
  const p1: Point = getPointsFormAngles(getAnglesFormIndex(i));
  const p2: Point = getPointsFormAngles(getAnglesFormIndex(j));
  drawLine(p1, p2);
}
