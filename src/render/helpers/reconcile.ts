import instantiate from './instantiate';
import updateProps from './updateProps';
import { isString, zip } from '../../utils';

function reconcile(previousInstance: Instance, newElement: CustomElement): Instance {
  if (previousInstance === null || previousInstance === undefined) {
    return instantiate(newElement);
  }

  if (isString(newElement)) {
    const instance = instantiate(newElement);
    previousInstance.dom.replaceWith(instance.dom);
    return instance;
  }

  if (newElement === null || newElement === undefined) {
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
    
    const newChildInstances = zip(previousInstance.childInstances, newElement.props.children)
    .map(([childInstance, childElement]) => reconcile(childInstance, childElement));

    previousInstance.childInstances = newChildInstances;

    return previousInstance;
  }

}

export default reconcile;