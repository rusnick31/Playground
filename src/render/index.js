import { updateProps, instantiate } from './helpers';

const isString = val => typeof val === 'string';


let virtualDom = null;
function render(element, container) {
  
  if (isString(element)) {
    container.append(element);
    return;
  }
  
  const instance = instantiate(element);
  const dom = instance.dom;

  if (container.lastChild) {
    container.replaceChild(dom, container.lastChild);
  } else {
    container.append(dom);
  }
}

export default render;