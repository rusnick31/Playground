import instantiate from './instantiate';

function reconcile(previousInstance: Instance, newElement: CustomElement): Instance {
  if (previousInstance === null || previousInstance === undefined) {
    return instantiate(newElement);
  }
}

export default reconcile;