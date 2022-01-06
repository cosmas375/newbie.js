# Configuration reference

_Notes:_

Some params are marked as `Heritable`. This means that this param can be set in global config and overrided in step configuration object.

> You can find important notes by blocks of this type.

### Here's what Newbie config is:

---

-   **steps**: Array<[IStepConfig](#step-config)>

    > Important!  
    > This field must be present in global configuration object!

    <!--
            beforeMount?(): TStepCallback;
            mounted?(targetElement: HTMLElement): TStepCallback;
            beforeUnmount?(targetElement: HTMLElement): TStepCallback;
            unmounted?(): TStepCallback;
    -->

    ***

    #### IStepConfig

    -   id: _string_  
        _Defaults to '`No. ${index}`'_

        > Important!  
        > Used to identify step in [goTo(id)](#go-to) method

    -   target: _string_ | _HTMLElemtnt_  
        _Defaults to `null`_

        If **HTML element** provided, then it will work with no surprises :)  
        If **string** provided, then target element will be queried right before mounting the entire step. So if you need to perform some operations to make your target element accessible (can be done using `beforeMount` hook), you should use this option.  
        If **no target element found or provided**, hint will be shown in the center of browser window.

    -   content: _object_  
        _Defaults to `{}`_

        > Depends on framework!

        For **vanilla** version it looks like this:  
        `{ '.title': 'Title of my awesome hint!', '.content': 'Content of my awesome hint!', ... }`,  
        e.g. key is selector, value is string.

        For **Vue** version, this object is passes as `propsData` to hint component.

    -   beforeMount: _async function_  
        _Defaults to `() => {}`_

        This hook will be called asynchronously before mounting the step.

    -   mounted: _async function(targetElement: HTMLElement)_  
        _Defaults to `targetElement => {}`_  
        _Parameters:_

        -   `targetElement` - as you might guess it's target element provided in config

        This hook will be called asynchronously when the step is fully mounted.

    -   beforeUnmount: _async function(targetElement: HTMLElement)_  
        _Defaults to `targetElement => {}`_  
        _Parameters:_

        -   `targetElement` - as you might guess it's target element provided in config

        This hook will be called asynchronously when the step is fully mounted.

    -   unmounted: _async function_  
        _Defaults to `() => {}`_

        This hook will be called asynchronously after unmounting the step.

---

-   **shadow**: [IShadowConfig](#shadow-config) - Heritable

---

-   **hint**: [IHintConfig](#hint-config) - Heritable
    > Important!  
    > This field must be present in global configuration object or in config of each step!

---

-   **arrow**: [IArrowConfig](#arrow-config) - Heritable

---

-   **position**: string - Heritable

    _Defaults to 'bottom'_

---

-   **offsetX**: number - Heritable  
    _Defaults to 10_

    Horizontal offset of hint position.

---

-   **offsetY**: string - Heritable  
    _Defaults to 10_

    Vertical offset of hint position.

---

-   **transitionDuration**: string - Heritable

    _Defaults to 300_

---

-   **beforeStart**: function()  
    _Defaults to () => {}_

    This lifecycle hook will be called before first step mount.

---

-   **started**: function(elem)  
    _Defaults to () => {}_

    This lifecycle hook will be called after first step mount.

---

-   **beforeFinish**: function(elem)  
    _Defaults to () => {}_

    This lifecycle hook will be called before last step mount.

---

-   **finished**: function()  
    _Defaults to () => {}_

    This lifecycle hook will be called after last step mount.

---
