import { Board } from './interfaces/Board';
import './style.scss';

const board = new Board();

board.setConfig({
  multiplicationFactor: 3,
  samples: 100,
});
board.draw();
