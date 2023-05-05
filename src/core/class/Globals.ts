import { IComponentsFactory } from '../Interfaces';

export class Globals {
    private static _componentsFactory: IComponentsFactory;

    static set componentsFactory(factory: IComponentsFactory) {
        if (this._componentsFactory) {
            return;
        }
        this._componentsFactory = factory;
    }

    static get componentsFactory() {
        return this._componentsFactory;
    }
}
