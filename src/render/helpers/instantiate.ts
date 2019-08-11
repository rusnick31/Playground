import updateProps from './updateProps';

const isString = (val:any): boolean => typeof val === 'string';

function instantiate(element: string): Instance;
function instantiate(element: CustomElement): Instance;
function instantiate(element: any): any {

  if (typeof element === 'string') {
    const instance = {
      dom: document.createTextNode(element),
      element,
      childInstances: []
    };
    return instance;
  }
  
  const { type, props } = element;
  const { children, ...nextProps } = props;
  const dom = document.createElement(type);

  updateProps(dom, [], nextProps);

  const childInstances = children.map(instantiate);
  childInstances.forEach((child: Instance | string) => {
    const htmlElement = isString(child) ? child : (child as Instance).dom ;
    dom.append(htmlElement);
  });

  const instance = {
    dom,
    element,
    childInstances
  };
  return instance;
}

export default instantiate;