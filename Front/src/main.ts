import { r } from './constant';
import { getAnglesFormIndex, getPointsFormAngles } from './misc';
import './style.css';

const svgns = 'http://www.w3.org/2000/svg';

const container = document.querySelector('g.samples');

if (container === null) {
  throw new Error('Cannot find.');
}

for (let i = 0; i < 10; i++) {
  const angle = getAnglesFormIndex(i);
  const { x: cx, y: cy } = getPointsFormAngles(angle);
  const circle = document.createElementNS(svgns, 'circle');
  circle.setAttributeNS(null, 'cx', cx + '');
  circle.setAttributeNS(null, 'cy', cy + '');
  circle.setAttributeNS(null, 'r', r + '');
  container && container.appendChild(circle);
}
