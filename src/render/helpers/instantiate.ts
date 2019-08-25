import updateProps from './updateProps';
import { isString } from 'utils';

function instantiate(element: CustomElement | string): Instance {

  if (isString(element)) {
    const instance = {
      dom: document.createTextNode(element as string),
      element,
      childInstances: []
    };
    return instance;
  }
  
  const { type, props } = element as CustomElement;
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