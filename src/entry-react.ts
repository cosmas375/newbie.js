import { Newbie } from './core/class/Newbie';
import { Globals } from './core/class/Globals';
import { ReactComponentsFactory } from './core/class/ComponentsFactory/ReactComponentsFactory';

export default Newbie;

export function useNewbie({ ReactDOM }) {
    Globals.componentsFactory = new ReactComponentsFactory({ ReactDOM });
}
