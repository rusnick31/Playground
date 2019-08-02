import instantiate from '../instantiate';

describe('instantiate tests', () => {
  
  it('should instantiate simple element without children', () => {
    const element = {
      type: 'div',
      props: {
        className: 'awe',
        children: []
      }
    };
    const instance = instantiate(element);
    
    expect(instance).not.toBeNull();
    expect(instance).toEqual({
      dom: expect.any(Object),
      element,
      childInstances: []
    });
    expect(instance.dom.className).toEqual('awe');
    expect(instance.dom.nodeName).toEqual('DIV');
  });

  it('should instantiate simple element with a child', () => {

    const childElement = {
      type: 'p',
      props: {
        children: []
      }
    };

    const element = {
      type: 'div',
      props: {
        children: [childElement]
      }
    }

    const instance = instantiate(element);

    expect(instance.childInstances).toContainEqual({
      dom: expect.any(Object),
      element: childElement,
      childInstances: []
    });

    const childInstance = instance.childInstances[0];

    expect(instance.dom.lastChild).toBe(childInstance.dom);

    expect(childInstance.dom.nodeName).toEqual('P');

  });

});