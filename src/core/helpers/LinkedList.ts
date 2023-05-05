export interface ILinkedList<T> {
    add(item: T): void;
    getFirst(): TEdgeNode<T>;
    getLast(): TEdgeNode<T>;
}

type TEdgeNode<T> = INode<T> | null;

export class LinkedList<T> implements ILinkedList<T> {
    private _head: TEdgeNode<T> = null;
    private _tail: TEdgeNode<T> = null;

    public add(data: T) {
        const node = new Node(data);

        if (!this._head && !this._tail) {
            this._head = this._tail = node;
        } else {
            node.previous = this._tail;
            if (this._tail) {
                this._tail.next = node;
            }
            this._tail = node;
        }
    }

    public getFirst(): TEdgeNode<T> {
        return this._head;
    }

    public getLast(): TEdgeNode<T> {
        return this._tail;
    }
}

export interface INode<T> {
    value: T;
    next: TSibling<T>;
    previous: TSibling<T>;
}

type TSibling<T> = INode<T> | null;

class Node<T> implements INode<T> {
    private _value: T;
    private _previous: TSibling<T> = null;
    private _next: TSibling<T> = null;

    constructor(value: T) {
        this._value = value;
    }

    public set value(value: T) {
        this._value = value;
    }
    public get value() {
        return this._value;
    }

    public set previous(item: TSibling<T>) {
        this._previous = item;
    }
    public get previous() {
        return this._previous;
    }

    public set next(item: TSibling<T>) {
        this._next = item;
    }
    public get next() {
        return this._next;
    }
}
