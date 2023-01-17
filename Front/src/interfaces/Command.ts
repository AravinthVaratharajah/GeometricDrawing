import { objectKeys, querySelector } from '../misc';
import { Config } from './Config';

export class Command {
  callback: (config: Config) => void = () => {};

  constructor(public config: Config) {
    this.render();
    this.setupActions();
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

  setupActions() {
    const props = objectKeys(this.config);
    for (const prop of props) {
      const sliderElt = querySelector(
        `div.command label.${prop} input`,
        HTMLInputElement
      );
      sliderElt.addEventListener('input', () => {
        this.config[prop] = +sliderElt.value;
        this.render();
        this.callback(this.config);
      });
    }

    const playButton = querySelector('div.command button.play');
  }
}
