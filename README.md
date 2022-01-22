# Newbie

Meet the most flexible tour library!

## Where to get

You can get Newbie from:

1. CDN

```
<script src="">
```

```
<script src="">
```

2. npm

```
npm install newbie --save
```

## Getting started

Import css and js:

```
<link rel="stylesheet" href="newbie.css" />
<script src="newbie.js"></script>
```

Add hint layout:

```
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
const myTour = new Newbie({
    steps: [{
        'my-hint__content': 'My first hint content',
    }],
    hint: document.querySelector('#hint'),
});

myTour.start();
```

And that's it!

## Documentation

It's not ready yet ):  
But you can find drafts [here](https://github.com/cosmas375/newbie/tree/master/doc).
