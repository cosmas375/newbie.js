export default {
    arrow: {
        type: 'triangle',
        size: 20,
        padding: 10,
    },
    steps: [
        {
            id: 'centered',
            content: {
                title: 'popup',
                content: 'Must be centered if no target specified',
            },
            position: 'bottom',
        },
        {
            id: 'walk-around-top-left',
            target: '[data-newbie-target="walk-around"]',
            position: 'top-left',
            content: {
                content: 'top-left',
            },
        },
        {
            id: 'walk-around-top',
            target: '[data-newbie-target="walk-around"]',
            position: 'top',
            content: {
                content: 'top',
            },
        },
        {
            id: 'walk-around-top-right',
            target: '[data-newbie-target="walk-around"]',
            position: 'top-right',
            content: {
                content: 'top-right',
            },
        },
        {
            id: 'walk-around-right-top',
            target: '[data-newbie-target="walk-around"]',
            position: 'right-top',
            content: {
                content: 'right-top',
            },
        },
        {
            id: 'walk-around-right',
            target: '[data-newbie-target="walk-around"]',
            position: 'right',
            content: {
                content: 'right',
            },
        },
        {
            id: 'walk-around-right-bottom',
            target: '[data-newbie-target="walk-around"]',
            position: 'right-bottom',
            content: {
                content: 'right-bottom',
            },
        },
        {
            id: 'walk-around-bottom-right',
            target: '[data-newbie-target="walk-around"]',
            position: 'bottom-right',
            content: {
                content: 'bottom-right',
            },
        },
        {
            id: 'walk-around-bottom',
            target: '[data-newbie-target="walk-around"]',
            position: 'bottom',
            content: {
                content: 'bottom',
            },
        },
        {
            id: 'walk-around-bottom-left',
            target: '[data-newbie-target="walk-around"]',
            position: 'bottom-left',
            content: {
                content: 'bottom-left',
            },
        },
        {
            id: 'walk-around-left-bottom',
            target: '[data-newbie-target="walk-around"]',
            position: 'left-bottom',
            content: {
                content: 'left-bottom',
            },
        },
        {
            id: 'walk-around-left',
            target: '[data-newbie-target="walk-around"]',
            position: 'left',
            content: {
                content: 'left',
            },
        },
        {
            id: 'walk-around-left-top',
            target: '[data-newbie-target="walk-around"]',
            position: 'left-top',
            content: {
                content: 'left-top',
            },
        },
        {
            id: 'high-top',
            target: '[data-newbie-target="high"]',
            position: 'top',
            content: {
                content: 'top',
            },
        },
        {
            id: 'high-bottom',
            target: '[data-newbie-target="high"]',
            position: 'bottom',
            content: {
                content: 'bottom',
            },
        },
        {
            id: 'wide-left',
            target: '[data-newbie-target="wide"]',
            position: 'left',
            content: {
                content: 'left',
            },
        },
        {
            id: 'wide-right',
            target: '[data-newbie-target="wide"]',
            position: 'right',
            content: {
                content: 'right',
            },
        },
    ],
};
