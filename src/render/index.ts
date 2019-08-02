import { instantiate } from './helpers';

const isString = (val:any): boolean => typeof val === 'string';


let virtualDom = null;
function render(element: string | CustomElement, container: HTMLElement) {
  
  if (isString(element)) {
    container.append(element as string);
    return;
  }
  
  const instance = instantiate(element as CustomElement);
  const dom = instance.dom;

  if (container.lastChild) {
    container.lastChild.replaceWith(dom);
  } else {
    container.append(dom);
  }
}

export default render;