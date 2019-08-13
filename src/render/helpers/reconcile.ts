import instantiate from './instantiate';
import updateProps from './updateProps';
import { isString, zip, isNullOrUndef } from 'utils';

function reconcile(previousInstance: Instance, newElement: CustomElement): Instance {
  if (isNullOrUndef(previousInstance)) {
    return instantiate(newElement);
  }

  if (isString(newElement)) {
    const instance = instantiate(newElement);
    previousInstance.dom.replaceWith(instance.dom);
    return instance;
  }

  if (isNullOrUndef(newElement)) {
    previousInstance.dom.remove();
    return null;
  }

  if (previousInstance.element.type !== newElement.type) {
    const newInstance = instantiate(newElement);
    previousInstance.dom.replaceWith(newInstance.dom);
    return newInstance;
  }

  if (previousInstance.element.type === newElement.type) {
    const previousProps = previousInstance.element.props;
    const nextProps = newElement.props;
    updateProps(previousInstance.dom, previousProps, nextProps);
    previousInstance.element.props = newElement.props;
    
    const newChildInstances = reconcileChildren(previousInstance, newElement);

    previousInstance.childInstances = newChildInstances;

    return previousInstance;
  }

}

function reconcileChildren(previousInstance: Instance, newElement: CustomElement) {

  const reconcilePair = ([childInstance, childElement]) => {
    const newChildInstance = reconcile(childInstance, childElement);
    // TODO: add third 'container' parameter to reconcile
    if (!childInstance) {
      previousInstance.dom.append(newChildInstance.dom);
    }
    return newChildInstance;
  };

  const instanceElementPairs = zip(previousInstance.childInstances, newElement.props.children);
  return instanceElementPairs.map(reconcilePair).filter(Boolean)
}

export default reconcile;