import updateProps from './updateProps';

interface Props {
  children: Array<Element>;
  [propName: string]: any;
};

interface Element {
  type: string;
  props: Props;
  className: number;
};

interface Instance {
  dom: HTMLElement;
  element: Element;
  childInstances: Array<Instance>;
};

function instantiate(element : Element): Instance {
  
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