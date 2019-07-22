function render(element, container) {
  const { type, props } = element;
  const dom = document.createElement(type);

  Object.entries(props).forEach(([key, value]) => {
    dom[key] = value;
  });

  container.append(dom);
}

export default render;