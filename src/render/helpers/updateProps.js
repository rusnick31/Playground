const isListener = val => val.startsWith('on');

function updateProps(dom, previousProps, nextProps) {
  
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