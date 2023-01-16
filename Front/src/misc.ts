import { cx0, cy0, r0 } from './constant';

export const getAnglesFormIndex = (index: number) => (index * 2 * Math.PI) / 10;
export const getPointsFormAngles = (angle: number) => {
  return {
    x: cx0 + r0 * Math.cos(angle),
    y: cy0 + r0 * Math.sin(angle),
  };
};
