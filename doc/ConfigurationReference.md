# Configuration reference

_Notes:_

Newbie's configuration is based on params inheritance. This means that some param can be set in global config and overrided in step's one. These params are marked as **Heritable**. This is what config looks like:

```
{
    ...
    shadow: {
        offset: 10, // set shadow offset for all steps
    },
    ...
    steps: [
        ...
        {
            shadow: {
                offset: 0, // override shadow offset for single step
            }
        },
        ...
    ]
}
```

> You can find important notes by blocks of this type.

---

---

## Here's what Newbie config is:

---

---

-   **steps**: Array<[IStepConfig](#istepconfig)>

    > Important!  
    > This field must be present in global configuration object!

    ***

    #### IStepConfig

    -   id: _string_  
        _Defaults to '`No. ${index}`'_

        > Important!  
        > Used to identify step in [goTo(id)](#go-to) method

        ***

    -   target: _string_ | _HTMLElemtnt_  
        _Defaults to `null`_

        If **HTML element** provided, then it will work with no surprises :)  
        If **string** provided, then target element will be queried right before mounting the entire step. So if you need to perform some operations to make your target element accessible (can be done using `beforeMount` hook), you should use this option.  
        If **no target element found or provided**, hint will be shown in the center of browser window.

        ***

    -   content: _object_  
        _Defaults to `{}`_

        > Depends on framework!

        For **vanilla** version it looks like this:  
        `{ '.title': 'Title of my awesome hint!', '.content': 'Content of my awesome hint!', ... }`,  
        e.g. key is selector, value is string.

        For **Vue** version, this object is passes as `propsData` to hint component.

        ***

    -   beforeMount: _async function_  
        _Defaults to `() => {}`_

        This hook will be called asynchronously before mounting the step.

        ***

    -   mounted: _async function(targetElement: HTMLElement)_  
        _Defaults to `targetElement => {}`_  
        _Parameters:_

        -   `targetElement` - as you might guess it's target element provided in config

        This hook will be called asynchronously when the step is fully mounted.

        ***

    -   beforeUnmount: _async function(targetElement: HTMLElement)_  
        _Defaults to `targetElement => {}`_  
        _Parameters:_

        -   `targetElement` - as you might guess it's target element provided in config

        This hook will be called asynchronously when the step is fully mounted.

        ***

    -   unmounted: _async function_  
        _Defaults to `() => {}`_

        This hook will be called asynchronously after unmounting the step.

---

---

-   **shadow**: [IShadowConfig](#ishadowconfig) - **Heritable**

    ***

    #### IShadowConfig

    -   enabled: _boolean_  
        _Defaults to `true`_

        ***

    -   color: _string_  
        _Defaults to `rgba(0, 0, 0, .3)`_

        ***

    -   offset: _number_  
        _Defaults to `10`_

        ***

    -   borderRadius: _number_  
        _Defaults to `5`_

---

---

-   **hint**: [IHintConfig](#hint-config) - **Heritable**

    > Important!  
    > This field must be present in global configuration object or in config of each step!  
    > Depends on framework!

    For **vanilla** version this should be an HTML element.

    For **Vue** version this must be a Vue component.

---

---

-   **arrow**: [IArrowConfig](#iarrowconfig) - **Heritable**

    ***

    #### IArrowConfig

    -   enabled: _boolean_  
        _Defaults to `true`_

        ***

    -   size: _number_  
         _Defaults to `5`_

        ***

    -   color: _string_  
         _Defaults to `#ffffff`_

        ***

    -   offsetX: _number_  
         _Defaults to `10`_

        ***

    -   offsetY: _number_  
         _Defaults to `10`_

---

---

-   **position**: _string_ - **Heritable**

    _Defaults to `bottom`_

    Possible values:  
     `top`  
     `top-left`  
     `top-right`  
     `right`  
     `right-top`  
     `right-bottom`  
     `bottom`  
     `bottom-left`  
     `bottom-right`  
     `left`  
     `left-top`  
     `left-bottom`  
     `center`

---

---

-   **offsetX**: _number_ - **Heritable**  
    _Defaults to `10`_

    Horizontal offset (_px_) of hint position.

---

---

-   **offsetY**: _string_ - **Heritable**  
    _Defaults to `10`_

    Vertical offset (_px_) of hint position.

---

---

-   **transitionDuration**: _string_ - **Heritable**

    _Defaults to `300`_

---

---

-   **beforeStart**: _function()_  
    _Defaults to `() => {}`_

    This lifecycle hook will be called before first step mount.

---

---

-   **started**: _function()_  
    _Defaults to `() => {}`_

    This lifecycle hook will be called after first step mount.

---

---

-   **beforeFinish**: _function()_  
    _Defaults to `() => {}`_

    This lifecycle hook will be called before last step mount.

---

---

-   **finished**: _function()_  
    _Defaults to `() => {}`_

    This lifecycle hook will be called after last step mount.

---

---
