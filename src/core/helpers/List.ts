export interface IList<Item> {
  add(item: Item): void;
  getFirst(): INode;
  getLast(): INode;
}

type TListValue = any;

export class List implements IList<INode> {
  private _head: INode;
  private _tail: INode;

  public add(data) {
    const node = new ListItem(data);

    if (!this._head && !this._tail) {
      this._head = this._tail = node;
    } else {
      node.previous = this._tail;
      this._tail.next = node;
      this._tail = node;
    }
  }

  public getFirst(): INode {
    return this._head;
  }

  public getLast(): INode {
    return this._tail;
  }
}

export interface INode {
  value: TListValue;
  next: INode;
  previous: INode;
}

class ListItem implements INode {
  private _value: TListValue;
  private _previous: INode;
  private _next: INode;

  constructor(value: TListValue) {
    this.value = value;
  }

  public set value(value: TListValue) {
    this._value = value;
  }
  public get value() {
    return this._value;
  }

  public set previous(item: INode) {
    this._previous = item;
  }
  public get previous() {
    return this._previous;
  }

  public set next(item: INode) {
    this._next = item;
  }
  public get next() {
    return this._next;
  }
}
