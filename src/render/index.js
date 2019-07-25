import { updateProps } from './helpers';

const isString = val => typeof val === 'string';

function render(element, container) {
  
  if (isString(element)) {
    container.append(element);
    return;
  }
  
  const { type, props } = element;
  const { children, ...nextProps } = props;
  const dom = document.createElement(type);

  updateProps(dom, [], nextProps);

  children.forEach(child => render(child, dom));

  if (container.lastChild) {
    container.replaceChild(dom, container.lastChild);
  } else {
    container.append(dom);
  }
}

export default render;