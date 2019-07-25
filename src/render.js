function render(element, container) {
  const { type, props } = element;
  const dom = document.createElement(type);

  const isListener = key => key.startsWith('on');

  Object.entries(props).forEach(([key, value]) => {
    if (isListener(key)) {
      const event = key.toLowerCase().substring(2);
      dom.addEventListener(event, value);
    } else {
      dom[key] = value;
    }
  });

  container.append(dom);
}

export default render;