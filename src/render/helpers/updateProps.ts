const isListener = (val: string) => val.startsWith('on');

function updateProps(dom: HTMLElement, previousProps: PropDictionary, nextProps: PropDictionary) {
  
  Object.entries(previousProps).forEach(([key, value]) => {
    if (isListener(key)) {
      const event = key.toLowerCase().substring(2);
      dom.removeEventListener(event, value);
    } else {
      dom[key] = null;
    }
  });
  
  Object.entries(nextProps).forEach(([key, value]) => {
    if (isListener(key)) {
      const event = key.toLowerCase().substring(2);
      dom.addEventListener(event, value);
    } else {
      dom[key] = value;
    }
  });

}

export default updateProps;