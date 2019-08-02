interface PropDictionary {
  [propName: string]: any;
}

interface Props extends PropDictionary {
  children: Array<CustomElement | string>;
}

interface CustomElement {
  type: string;
  props: Props;
}

interface Instance {
  dom: HTMLElement;
  element: CustomElement;
  childInstances: Array<Instance>;
}