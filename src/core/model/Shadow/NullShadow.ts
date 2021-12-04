import { AbstractShadow } from "./AbstractShadow";

export class NullShadow extends AbstractShadow {
  constructor(settings) {
    super(settings);
  }

  public mount() { }

  public unmount() { }
}
