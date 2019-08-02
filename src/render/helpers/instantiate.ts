import updateProps from './updateProps';

function instantiate(element : CustomElement): Instance {
  
  const { type, props } = element;
  const { children, ...nextProps } = props;
  const dom = document.createElement(type);

  updateProps(dom, [], nextProps);

  const childInstances = children.map(instantiate);
  childInstances.forEach(child => dom.append(child.dom));

  const instance = {
    dom,
    element,
    childInstances
  };
  return instance;
}

export default instantiate;