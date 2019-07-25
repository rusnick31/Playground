import * as R from 'ramda';

const getEventName = event => event.toLowerCase().substring(2);
const propStartsWithOn = (value, key) => key.startsWith('on');

function addPropsTo(dom) {
  
  const addListenerTo = R.curry((dom, listener, event) => {
    const eventName = getEventName(event);
    dom.addEventListener(eventName, listener)
  });

  const addPropTo = R.curry((dom, value, key) => dom[key] = value);
  
  const addProp = addPropTo(dom);
  const addListener = addListenerTo(dom);

  const addToDom = R.ifElse(propStartsWithOn, addListener, addProp);
  
  return R.forEachObjIndexed(addToDom);
}

function render(element, container) {
  const { type, props } = element;
  const dom = document.createElement(type);

  addPropsTo(dom)(props);

  container.append(dom);
}

export default render;