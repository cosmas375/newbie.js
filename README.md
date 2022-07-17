# Newbie

Meet the most flexible tour library!

[Motivation](https://github.com/cosmas375/newbie.js/tree/master/doc/Motivation.md)

[Examples](https://github.com/cosmas375/newbie.js/tree/master/doc/Examples.md)

Try it:
https://codesandbox.io/s/old-hooks-f41m34

---

---

## Where to get

You can get Newbie.js from:

### 1. CDN

```
<script src="https://unpkg.com/newbie.js/cdn/newbie.js">
<link rel="stylesheet" href="https://unpkg.com/newbie.js/cdn/newbie.css"/>
```

---

### 2. npm

Run:

```
npm install newbie.js --save
```

---

---

## Getting started

Import css and js:

```
<script src="https://unpkg.com/newbie.js/cdn/newbie.js">
<link rel="stylesheet" href="https://unpkg.com/newbie.js/cdn/newbie.css"/>
```

Create you hint layout:

```
<style>
#hint {
    padding: 10px;
    border-radius: 5px;
    background-color: #fff;
}
</style>
<span id="target">Hint target</span>
<div id="hint" class="my-hint">
    <div class="my-hint__content"></div>
    <button
        data-newbie-go-next
        class="my-hint__button my-hint__button_next"
    >Show next</button>
    <button
        data-newbie-go-previous
        class="my-hint__button my-hint__button_previous"
    >Show previous</button>
</div>
```

Now you can create the tour:

```
const myTour = new window.Newbie({
    steps: [{
        content: {
            '.my-hint__content': 'Hi there!',
        },
    }, {
        target: '#target',
        content: {
            '.my-hint__content': 'This hint is pointed to given target...',
        },
        position: 'bottom-left',
    }],
    hint: {
      component: document.getElementById('hint'),
    },
});

myTour.start();
```

And that's it!

---

---

## Documentation

[API reference](https://github.com/cosmas375/newbie.js/tree/master/doc/ApiReference.md)

[Configuration reference](https://github.com/cosmas375/newbie.js/tree/master/doc/ConfigurationReference.md)

And if you missed in the beginning:  
[Motivation](https://github.com/cosmas375/newbie.js/tree/master/doc/Motivation.md)
