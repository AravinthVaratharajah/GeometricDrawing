import { objectKeys, querySelector } from '../misc';
import { Config } from './Config';

export class Command {
  callback: (config: Config) => void = () => {};

  constructor(public config: Config) {
    this.render();
  }

  onUpdate(callback: (config: Config) => void) {
    this.callback = callback;
  }

  render() {
    const props = objectKeys(this.config);
    for (const prop of props) {
      const elt = querySelector(`div.command label.${prop} span span`);
      elt.innerHTML = this.config[prop as keyof Config].toString();
      const sliderElt = querySelector(
        `div.command label.${prop} input`,
        HTMLInputElement
      );
      sliderElt.value = this.config[prop].toString();
    }
  }
}
