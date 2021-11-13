import { Newbie } from './model/Newbie';

declare global {
  interface Window {
    Newbie: any;
  }
}

window.Newbie = Newbie;
