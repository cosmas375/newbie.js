import { Newbie } from '../core/model/Newbie';
import '../assets/scss/shadow.scss';

declare global {
  interface Window {
    Newbie: any;
  }
}

window.Newbie = Newbie;
