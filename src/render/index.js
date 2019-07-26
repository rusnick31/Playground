import { updateProps } from './helpers';

const isString = val => typeof val === 'string';



function reconcile(instance, element) {
  if (instance === null) {
    return instantiate(element);
  }
}


let virtualDom = null;
function render(element, container) {
  
  if (isString(element)) {
    container.append(element);
    return;
  }
  


  if (container.lastChild) {
    container.replaceChild(dom, container.lastChild);
  } else {
    container.append(dom);
  }
}

export default render;