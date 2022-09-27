import { Newbie } from './core/class/Newbie';
import { Globals } from './core/class/Globals';
import { ReactComponentsFactory } from './core/class/ComponentsFactory/ReactComponentsFactory';
import { Position } from './core/Position';

export default Newbie;

export function useNewbie({ ReactDOM }) {
    Globals.componentsFactory = new ReactComponentsFactory({ ReactDOM });
}

export const NewbiePosition = Position;