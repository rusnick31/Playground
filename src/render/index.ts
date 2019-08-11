import { reconcile } from './helpers';

let virtualDom: Instance = null;
function render(element: string | CustomElement, container: HTMLElement) {

  if (!virtualDom) {
    const instance = reconcile(virtualDom, element);
    virtualDom = instance;
    container.append(instance.dom);
  }

  const instance = reconcile(virtualDom, element);
  virtualDom = instance;
  
}

export default render;