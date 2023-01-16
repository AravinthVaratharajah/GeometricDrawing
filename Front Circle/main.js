const svgns = 'http://www.w3.org/2000/svg';

const container = document.querySelector('g.samples');

const r = 1;

const r0 = 45;

const cx0 = 50;

const cy0 = 50;

const getAnglesFormIndex = (index) => (index * 2 * Math.PI) / 10;

const getPointsFormAngles = (angle) => {
  return {
    x: cx0 + r0 * Math.cos(angle),

    y: cy0 + r0 * Math.sin(angle),
  };
};

for (let i = 0; i < 10; i++) {
  const angle = getAnglesFormIndex(i);

  const { x: cx, y: cy } = getPointsFormAngles(angle);

  const circle = document.createElementNS(svgns, 'circle');

  circle.setAttributeNS(null, 'cx', cx);

  circle.setAttributeNS(null, 'cy', cy);

  circle.setAttributeNS(null, 'r', r);

  container.appendChild(circle);
}
