import { Config } from './Config';

export class Command {
  setConfig(config: Config) {
    throw new Error('Method not implemented.');
  }

  callback: (config: Config) => void = () => {};

  constructor(public config: Config) {}

  onUpdate(callback: (config: Config) => void) {
    this.callback = callback;
  }
}
