import { Newbie } from '../../../src/core/class/Newbie';
import { Globals } from '../../../src/core/class/Globals';
import { VanillaComponentsFactory } from '../../../src/core/class/ComponentsFactory/VanillaComponentsFactory';

Globals.componentsFactory = new VanillaComponentsFactory();

global.Newbie = Newbie;
