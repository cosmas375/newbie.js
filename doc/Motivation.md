# Motivation

There are a few thigns which I don't like in existing tour libraries.

---

-   ## Relying on z-index of target element

Some libraries are trying to increase z-index of target element to make it greater than z-index of "shadow". It wont work if we've set z-index for any of its parent elements.  
Let's say we have an HTML structure like this:

```
<div>
    <div style="z-index: 5">
        <div>
            My hint target
        </div>
    </div>
</div>
```

In this case increasing z-index of target elemen to 999999 wont make any effect, because it will always be equal to 5. And to make it work we must iterate through all the parent elments and reset their z-indexes, otherwise our target will appear under the shadow. And this is awful, because in some cases these changes can break something in your app.

To avoid this kind of situations we use SVG to draw a shadow. It allows you not to care about all that stuff, because we don't make any changes to an existing layout.

---

-   ## Lack of customization

All the libraries provides us with their own popups for hints. In most cases they allow us to:

1. set the className for hint;
2. set hint content by passing an HTML code like this:

```
{
    elem: document.querySelector('.some-random-lib__popup-content'),
    content: `
        <div>
            You can do
            <script>
                alert('some unsafe and weird stuff');
            </script>
            here <br>
            :)
        </div>
    `
}
```

3. set controls visibility by passing bools (next, previous and close buttons; progressbars; ...);
4. And so on...

Really? What if I need to crate a popup with my own design and my own controls?

Do I need to pass all my layout to content param in a js file? Or do I need to apply some monkey patching (like overriding styles of lib's popup)?

Probably not the best idea!

Instead of providing you with our popups, we let you to crate it on your own. Just use HTML and CSS like a human being and pass a link to it to [**newbie's config**](https://github.com/cosmas375/newbie.js/tree/master/doc/ConfigurationReference.md). And that's it :)

Moreover, we've allowed you to use different popups for different steps, so you wont need to patch the only popup to make it look different.

---

-   ## Weird event handlig

You've probably seen API that allows you to handle _change_ events withowt knowing which step is active and which is about to be active.

To me it's a little bit strange, because in most cases all that we need is to perform some operations between the steps to make the next target element visible (to switch to another route, or to expand a menu, or watever...).

That's why we decided to use lificycle hooks for steps and tour in general. These are the functions that are called **asynchronously** in a specific monents of tour (before tour started, before step created, before step mounted and so on).

---

-   ## $$$

**newbie.js** is completely free :)

---

I think it's enough for now :)

If you have any poblems that are not listed here, please contact us.
