import * as R from 'ramda';

const getEventName = event => event.toLowerCase().substring(2);
const propsStartsWithOn = (value, key) => key.startsWith('on');

function addPropsTo(dom) {
  
  const addListenerTo = R.curry((dom, listener, event) => dom.addEventListener(event, listener));

  const addPropTo = R.curry((dom, value, key) => dom[key] = value);
  
  const addListener = R.useWith(addListenerTo(dom), [R.identity, getEventName])
  const addToDom = R.ifElse(propsStartsWithOn, addListener, addPropTo(dom));
  
  return R.forEachObjIndexed(addToDom);
}

function render(element, container) {
  const { type, props } = element;
  const dom = document.createElement(type);

  addPropsTo(dom)(props);

  container.append(dom);
}

const element = {
  type: 'div',
  props: {
    className: 'awe',
    onClick: () => console.log('clicked')
  }
}

render(element, document.getElementById('root'));