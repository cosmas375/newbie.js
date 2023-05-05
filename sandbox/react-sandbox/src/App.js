import Newbie, { useNewbie } from '../../../src/entry-react.ts';
import '../../../src/assets/scss/style.scss';

import ReactDOM from 'react-dom/client';
import { useEffect } from 'react';

import Hint from './Hint';
import './App.css';

import config from '../../config';

let newbie = null;

function doStart() {
    newbie.start();
}

document.querySelector('#start').addEventListener('click', doStart);

function App() {
    useNewbie({ ReactDOM });

    useEffect(() => {
        newbie = new Newbie({
            ...config,
            hint: {
                component: Hint,
            },
        });
    }, []);

    return <></>;
}

export default App;
