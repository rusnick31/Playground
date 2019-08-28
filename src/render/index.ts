import { reconcile } from './helpers';

let virtualDom: Instance = null;

function render(element: string | CustomElement, container: HTMLElement) {
  const instance = reconcile(container, virtualDom, element);
  virtualDom = instance;
}

export default render;