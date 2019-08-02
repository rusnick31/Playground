/** @jsx create */

import render from './render';
import '../styles/main.scss';

const container = document.getElementById('root');

const getElement = () => ({
  type: 'div',
  props: {
    onClick: () => console.log('clicked'),
    className: 'awe',
    children: [ new Date().toLocaleTimeString() ]
  }
});

let isDone: boolean = true;
setInterval(() => {
  render(getElement(), container);
}, 1000);