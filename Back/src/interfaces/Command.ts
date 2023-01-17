import { url } from '../constant';
import { objectKeys, querySelector, sleep } from '../misc';
import { Config } from './Config';

export class Command {
  callback: (config: Config) => void = () => {};
  isPlaying = false;

  constructor(public config: Config) {
    this.render();
    this.setupActions();
  }

  increaseMultiplicationFactor() {
    this.config.multiplicationFactor += 0.01;
    this.config.multiplicationFactor %= 100;
    this.config.multiplicationFactor =
      +this.config.multiplicationFactor.toFixed(2);
  }

  onUpdate(callback: (config: Config) => void) {
    this.callback = callback;
  }

  async playAsync() {
    while (this.isPlaying) {
      await sleep(10);
      this.increaseMultiplicationFactor();
      this.render();
      this.callback(this.config);
    }
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
    const playButton = querySelector('div.command button.play');
    playButton.innerHTML = this.isPlaying ? 'Stop' : 'Play';
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
    playButton.addEventListener('click', () => {
      this.isPlaying = !this.isPlaying;
      this.render();
      if (this.isPlaying) this.playAsync();
    });

    const configBtn = querySelector('div.command button.getConfig');
    configBtn.addEventListener('click', () => {
      try {
        (async () => {
          const response = await fetch(url);
          const config = await response.json();
          this.render();
          this.callback(config);
        })();
      } catch (err) {
        console.error('error: ', err);
        window.alert('Technical error /!\\');
      }
    });
  }
}
