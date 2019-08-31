import instantiate from './instantiate';
import updateProps from './updateProps';
import { isString, zip, isNullOrUndef, partial } from 'utils';

function reconcile(container: HTMLElement, instance: Instance, element: CustomElement | string): Instance {
  if (isNullOrUndef(instance)) {
    const newInstace = instantiate(element);
    container.append(newInstace.dom);
    return newInstace;
  }

  if (isString(element) || isString(instance.element)) {
    const instance = instantiate(element);
    instance.dom.replaceWith(instance.dom);
    return instance;
  }

  if (isNullOrUndef(element)) {
    instance.dom.remove();
    return null;
  }

  const previousElement = instance.element as CustomElement;
  const nextElement = element as CustomElement;

  if (previousElement.type !== nextElement.type) {
    const newInstance = instantiate(element);
    instance.dom.replaceWith(newInstance.dom);
    return newInstance;
  }

  if (previousElement.type === nextElement.type) {
    const previousProps = previousElement.props;
    const nextProps = nextElement.props;
    updateProps(instance.dom, previousProps, nextProps);
    previousElement.props = nextElement.props;
    
    instance.childInstances = reconcileChildren(instance, element as CustomElement);

    return instance;
  }

}

function reconcileChildren(instance: Instance, element: CustomElement) {
  const reconcilePair = partial(reconcile, [ instance.dom ]);

  const instanceElementPairs = zip(instance.childInstances, element.props.children);
  return instanceElementPairs.map(reconcilePair).filter(Boolean);
}

export default reconcile;