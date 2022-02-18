# API reference

## Newbie methods:

-   **start**() - starts the tour and displays the first hint;
-   **goNext**() - displays the next step;
-   **goPrevious**() - displays the previous step;
-   **goTo**(id: _string_) - displays step with given id;
-   **stop**() - finishes the tour.

---

---

# Handling options

## Straightforward way (framework agnostic):

Add custom event listeners, like so:

```
...
const nextCallback = () => newbieInstance.goNext();
const nextBtn = document.querySelector('#my-awesome-next-button');
nextBtn.addEventListener('click', nextCallback);
...
```

---

## Vanilla way:

Mark your buttons with specific data-attributes to let the library add default event listeners:

`data-newbie-go-next`

`data-newbie-go-previous`

`data-newbie-stop`

This would look like:

```
...
<button
    data-newbie-go-next
    class="my-next-button"
>
    Go to the next step
</button>
...
```

Clicking button with `data-newbie-go-next` attribute is equivalent to `newbieInstance.goNext()`.

---

## Vue way:

Emit `go-next`, `go-previous`, `stop` events from your hint component:

```
<my-next-button
    @click="$emit('go-next')"
>
    Go to the next step
</my-next-button>
```

Emitting `go-next` is equivalent to `newbieInstance.goNext()`.
