const isListener = val => val.startsWith('on');
const isString = val => typeof val === 'string';

function updateProps(dom, previousProps, nextProps) {
  
  Object.entries(previousProps).forEach(([key, value]) => {
    if (isListener(key)) {
      const event = key.toLowerCase().substring(2);
      dom.removeEventListener(event, value);
    } else {
      dom[key] = null;
    }
  });
  
  Object.entries(nextProps).forEach(([key, value]) => {
    if (isListener(key)) {
      const event = key.toLowerCase().substring(2);
      dom.addEventListener(event, value);
    } else {
      dom[key] = value;
    }
  });

}

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