import { reconcile } from './helpers';

let virtualDom: Instance = null;
function render(element: string | CustomElement, container: HTMLElement) {

  // if (isString(element)) {
  //   container.append(element as string);
  //   return;
  // }

  if (virtualDom === null) {
    const newInstance: Instance = reconcile(null, element as CustomElement);
    virtualDom = newInstance;
    container.append(newInstance.dom);
    return;
  }
  
  const instance = reconcile(virtualDom, element as CustomElement);
  virtualDom = instance;
}

export default render;