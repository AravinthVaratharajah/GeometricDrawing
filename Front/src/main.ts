import { Board } from './interfaces/Board';
import { Command } from './interfaces/Command';
import { Config } from './interfaces/Config';
import './style.scss';

const config: Config = {
  multiplicationFactor: 5,
  samples: 250,
};

const board = new Board();
board.setConfig(config);
board.draw();

const command = new Command(config);
command.onUpdate((config) => {
  // command.setConfig(config);
  board.draw();
});
