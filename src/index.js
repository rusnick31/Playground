/** @jsx create */

import render from './render';
import './styles/main.scss';

const container = document.getElementById('root');

const element = {
  type: 'div',
  props: {
    onClick: () => console.log('clicked'),
    className: 'awe'
  }
};

function create(...args) {
  console.log(...args);
};

<div className='swag'></div>

render(element, container);