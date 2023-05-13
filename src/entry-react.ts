import { ReactComponentsFactory } from './core/class/ComponentsFactory/ReactComponentsFactory';
import { Globals } from './core/class/Globals';
import { Newbie } from './core/class/Newbie';
import { Position } from './core/Position';

export default Newbie;

export function useNewbie({ ReactDOM }: { ReactDOM: any }) {
    Globals.componentsFactory = new ReactComponentsFactory({ ReactDOM });
}

export const NewbiePosition = Position;
