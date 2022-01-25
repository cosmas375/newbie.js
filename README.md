# Newbie

Meet the most flexible tour library!

## Where to get

You can get Newbie.js from:

### 1. CDN

```
<script src="https://unpkg.com/newbie.js/cdn/newbie.js">
<link rel="stylesheet" href="https://unpkg.com/newbie.js/cdn/newbie.css"/>
```

### 2. npm

Run:

```
npm install newbie.js --save
```

and then import js:

```
import Newbie from 'newbie.js';
```

and scss:

```
@import '~newbie.js/src/assets/scss/style';
```

## Getting started

Import css and js:

```
<script src="https://unpkg.com/newbie.js/cdn/newbie.js">
<link rel="stylesheet" href="https://unpkg.com/newbie.js/cdn/newbie.css"/>
```

Add hint layout:

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

And then you can create the tour:

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

## Documentation

It's not ready ):  
But you can find drafts [here](https://github.com/cosmas375/newbie.js/tree/master/doc).
