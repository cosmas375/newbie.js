# API reference

## Newbie methods:

-   **start**() - starts the tour and displays the first hint;
-   **goNext**() - displays the next step;
-   **goPrevious**() - displays the previous step;
-   **goTo**(id: _string_) - displays given step;
-   **stop**() - finishes the tour;

## Handling options:

Using **vanilla** version you have multiple options:

-   you can add custom event listeners on your own to handle the tour, like so:  
    `...`  
    `const nextCallback = () => NewbieInstance.goNext();`  
    `const nextBtn = document.querySelector('#my-awesome-next-button');`
    `nextBtn.addEventListener('click', nextCallback);`  
    `...`

-   you can mark your buttons with specific data-attributes to let the library add default event listeners:  
    `data-newbie-go-next` - for button that leads to the next step;  
    `data-newbie-go-previous` - for button that leads to the previous step;  
    `data-newbie-stop` - for button that finishes the tour.

    This would look like:  
    `...`  
    `<button data-newbie-go-next class="my-next-button">Go to the next step</button>`  
    `...`
