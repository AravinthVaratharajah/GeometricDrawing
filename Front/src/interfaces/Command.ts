import { url } from '../constant';
import { objectKeys, querySelector, sleep } from '../misc';
import { Config } from './Config';

export class Command {
  #callback: (config: Config) => void = () => {};
  #config: Config = {
    samples: 29,
    multiplicationFactor: 1,
  };
  #isPlaying = false;

  constructor(config: Config) {
    this.config = config;
    this.setupActions();
  }

  private get config() {
    return this.#config;
  }

  private set config(val: Config) {
    this.#config = val;
    this.render();
    this.#callback(this.#config);
  }

  private get isPlaying() {
    // console.log('get isPlaying');
    return this.#isPlaying;
  }

  private set isPlaying(val: boolean) {
    // console.log(`set isPlaying ${val}`);
    this.#isPlaying = val;
    this.render();
    if (this.isPlaying) this.playAsync();
  }

  increaseMultiplicationFactor() {
    let mf = this.config.multiplicationFactor;
    mf += 0.01;
    mf %= 100;
    mf = +mf.toFixed(2);

    this.config = { ...this.config, multiplicationFactor: mf };
  }

  increaseSamples() {
    this.config.samples += 0.01;
    this.config.samples %= 100;
    this.config.samples = +this.config.samples.toFixed(2);
  }

  onUpdate(callback: (config: Config) => void) {
    this.#callback = callback;
  }

  async playAsync() {
    while (this.isPlaying) {
      await sleep(5);
      this.increaseMultiplicationFactor();
      this.increaseSamples();
    }
  }

  render() {
    const props = objectKeys(this.config);
    for (const prop of props) {
      const elt = querySelector(`div.command label.${prop} span span`);
      elt.innerHTML = this.config[prop].toString();
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
        this.config = { ...this.config, [prop]: +sliderElt.value };
      });
    }

    const playButton = querySelector('div.command button.play');
    playButton.addEventListener('click', () => {
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) this.playAsync();
    });

    const configBtn = querySelector('div.command button.getConfig');
    configBtn.addEventListener('click', () => {
      (async () => {
        try {
          const response = await fetch(url);
          this.config = await response.json();
        } catch (err) {
          console.error('error: ', err);
          window.alert('Technical error /!\\');
        }
      })();
    });
  }
}
