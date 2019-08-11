const isListener = (val: string) => val.startsWith('on');

const addTo = (dom: HTMLElement) => ([key, value]) => {
  if (key === 'children') return;

  if (isListener(key)) {
    const event = key.toLowerCase().substring(2);
    dom.addEventListener(event, value);
  } else {
    dom[key] = value;
  }
};

const removeFrom = (dom: HTMLElement) => ([key, value]) => {
  if (key === 'children') return;
  
  if (isListener(key)) {
    const event = key.toLowerCase().substring(2);
    dom.removeEventListener(event, value);
  } else {
    dom[key] = null;
  }
};

function updateProps(domElement: HTMLElement, previousProps: Props | [], nextProps: Props) {
  
  Object.entries(previousProps)
        .forEach(removeFrom(domElement));
  
  Object.entries(nextProps)
        .forEach(addTo(domElement));

};

export default updateProps;