# Configuration reference

_Notes:_

-   The configuration is based on params inheritance. This means that some param can be set in global config and overrided in step's one. For example:

    ```
    {
        ...
        shadow: {
            offset: 10, // set shadow offset for all steps
        },
        ...
        steps: [
            {
                ...
                shadow: {
                    offset: 0, // override shadow offset for single step
                }
                ...
            }
        ]
    }
    ```

    These params are marked as **Heritable**.

-   > You can find important notes in blocks of this type.

---

---

## Config:

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

        ```
        {
            '.title': 'Title of my awesome hint!',
            '.content': 'Content of my awesome hint!',
            ...
        }
        ```

        e.g. key is css-selector, value is string.  
        In this case content will be applied by setting `innerText`. If you want to set `innerHTML`, you need to pass an object containing `useHtml` set to `true` and `text` with your HTML code, like:

        ```
        {
            ...
            '.content': {
                useHtml: true,
                text: 'Content of my <strong>awesome</strong> hint!',
            },
            ...
        }
        ```

        For **Vue** version, this object is passes as `propsData` to hint component.

        ***

    -   beforeMount: _async function()_  
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

    -   unmounted: _async function()_  
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

    #### IShadowConfig

    -   component: _boolean_  
        _Defaults to `true`_

        > Depends on framework!

        For **vanilla** version it must be an HTML element.

        For **Vue** version it must be a Vue component.

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
         _Defaults to `0`_

        ***

    -   offsetY: _number_  
         _Defaults to `0`_

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

    _Defaults to `200`_

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
