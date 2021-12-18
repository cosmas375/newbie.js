const instance = new Newbie({
    shadow: {
        type: 'html',
    },
    hint: {
        component: document.getElementById('newbie-hint'),
    },
    steps: [
        {
            id: '0',
            target: '[data-newbie-target="666"]',
            content: {
                '[data-newbie-step-title]':
                    'Commodo duis cillum magna pariatur aute sint.',
                '[data-newbie-step-content]':
                    'Officia Lorem consequat sit pariatur. Labore culpa elit consectetur nostrud aliqua veniam et qui proident incididunt pariatur minim. Eu amet aliquip do non qui enim qui. Do deserunt incididunt pariatur aliqua. Aliqua duis quis cillum excepteur nulla ex mollit irure non reprehenderit.',
            },
            hint: {
                position: 'bottom-right',
            },
            shadow: {
                type: 'svg',
                offset: 10,
                borderRadius: 10,
            },
        },
        {
            id: '1',
            target: document.querySelector('[data-newbie-target="1"]'),
            content: {
                '[data-newbie-step-title]':
                    'Consectetur cupidatat sit cupidatat ullamco nostrud ut aliqua.',
                '[data-newbie-step-content]': `
                    Exercitation ut non laborum voluptate mollit. Nulla aute qui nulla culpa aliquip ipsum occaecat ad eu voluptate Lorem. Quis aliqua eu consectetur consectetur veniam. Non velit officia id nisi esse duis est occaecat excepteur aute in labore eiusmod.
                    Aliquip tempor fugiat sit labore aliqua. Esse nostrud dolor velit Lorem veniam est ex commodo cillum non commodo adipisicing. Elit anim dolor enim commodo pariatur commodo sunt cillum aliqua fugiat aute pariatur dolore dolore. Sunt proident consectetur dolor elit in tempor excepteur non exercitation officia. Anim ullamco elit mollit exercitation anim quis et. Magna laboris qui non reprehenderit elit sit est excepteur.
                    Minim ullamco cillum excepteur eiusmod aliqua aute proident tempor. Eu adipisicing et quis ex esse cupidatat deserunt consequat proident laborum est. Ad ipsum non consectetur aliqua irure excepteur. Nisi eiusmod ipsum proident id tempor sunt. Aliqua dolore excepteur nulla ad mollit commodo.
                `,
            },
            hint: {
                position: 'bottom-right',
            },
        },
        {
            id: '2',
            target: '[data-newbie-target="2"]',
            content: {
                '[data-newbie-step-content]':
                    'Amet nulla voluptate ipsum et irure. Anim magna nostrud occaecat aute id ullamco laboris elit mollit esse cillum proident ullamco reprehenderit. Irure eiusmod irure labore sit occaecat dolore. In dolor commodo esse mollit dolor quis magna culpa Lorem eu reprehenderit. Minim nostrud officia id mollit voluptate esse qui commodo. Sit aliqua in nisi qui labore eu laborum aliquip ipsum non. Voluptate sint irure tempor nulla velit eiusmod consequat dolore aute sint veniam voluptate nulla.',
            },
            shadow: {
                type: null,
            },
            hint: {
                position: 'left-top',
            },
        },
        {
            id: '3',
            target: '[data-newbie-target="3"]',
            content: {
                '[data-newbie-step-title]':
                    'Incididunt ea magna sit ea officia excepteur deserunt et mollit consectetur aliqua commodo mollit quis. Velit culpa sint cupidatat consequat ut ut laboris ipsum. Adipisicing sint amet amet nisi voluptate excepteur. Officia dolor ipsum excepteur Lorem aute deserunt ut tempor sunt pariatur proident commodo nulla velit.',
                '[data-newbie-step-content]':
                    'Dolore aliquip fugiat aliqua nulla quis.',
            },
            shadow: {
                type: 'html',
                offset: 10,
            },
            hint: {
                position: 'right-bottom',
            },
        },
    ],
});

const startButton = document.getElementById('start');

startButton.addEventListener('click', () => {
    instance.start();
});
