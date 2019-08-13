import reconcile from '../reconcile';

describe('reconciliation tests', () => {
  
  describe('when previousInstance is null', () => {
    
    it('should create instance from simple element', () => {
      const newElement = {
        type: 'div',
        props: {
          className: 'awesome',
          children: ['awesome text']
        }
      }

      const { dom, element, childInstances } = reconcile(null, newElement);
      
      expect(element).toEqual(newElement);
      expect(dom.className).toBe('awesome');

      const [ childInstance ] = childInstances;

      expect(childInstance.dom.nodeValue).toBe('awesome text');
      expect(childInstance.element).toBe('awesome text');
      expect(childInstance.childInstances).toHaveLength(0);
    });

    it('should create new Instance from nested element', () => {
      const pElement = {
        type: 'p',
        props: {
          className: 'p',
          children: ['text']
        }
      };
      
      const newElement = {
        type: 'div',
        props: {
          className: 'div',
          children: [pElement, 'textChild']
        }
      }
      const newInstance = reconcile(null, newElement);
      const { dom, element, childInstances } = newInstance;
      
      expect(element).toEqual(newElement);
      expect(dom.className).toBe('div');
      expect(childInstances).toHaveLength(2);
      expect(dom.childNodes).toHaveLength(2);

      const firstParNode = dom.firstChild as HTMLElement;
      expect(firstParNode.className).toBe('p');
      expect(firstParNode.firstChild.nodeValue).toBe('text');

      expect(dom.lastChild.nodeValue).toBe('textChild');
    });

  });

  describe('when previousInstance and newElement types differ', () => {
    it('should instantiate new element', () => {
      const element = {
        type: 'div',
        props: {
          children: []
        }
      };

      const instance = reconcile(null, element);

      const newElement = {
        type: 'p',
        props: {
          children: []
        }
      };

      const newInstance = reconcile(instance, newElement);

      expect(newInstance).not.toBe(instance);
      expect(newInstance.dom.nodeName).toBe('P');
    })
  });

  describe('when previousInstance and newElement have the same type', () => {
    
    it('should only update props in existing instance', () => {
      
      const previousProps = {
        className: 'awesomeClass',
        children: []
      }
      const previousElement = {
        type: 'div',
        props: previousProps
      };

      const instance = reconcile(null, previousElement);

      const newElement = {
        type: 'div',
        props: {
          className: 'newClass',
          children: []
        }
      }

      const newInstace = reconcile(instance, newElement);

      expect(newInstace).toBe(instance);
      expect(newInstace.dom).toBe(instance.dom);
      expect(newInstace.element).toBe(instance.element);
      expect(newInstace.element).toBe(previousElement);
      expect(newInstace.element.props).not.toBe(previousProps);
      expect(newInstace.element.props.className).toBe('newClass')
    });

    it('with the same amount of string children', () => {
      const previousElement = {
        type: 'p',
        props: {
          children: ['awesome text'],
        }
      };
  
      const previousInstance = reconcile(null, previousElement);
      const [ previousChild ] = previousInstance.childInstances;
  
      const newElement = {
        type: 'p',
        props: {
          children: ['new awesome text']
        }
      };
  
      const newInstance = reconcile(previousInstance, newElement);

      const [ newChild ] = newInstance.childInstances;
      expect(newChild).not.toBe(previousChild);
      expect(newChild).toMatchObject({
        dom: expect.any(Text),
        element: 'new awesome text',
        childInstances: []
      });
    });

    it('when newElement has more children', () => {
      const child = {
        type: 'div',
        props: {
          children: []
        }
      };
      
      const element = {
        type: 'div',
        props: {
          children: [ child ]
        }
      };

      const instance = reconcile(null, element);
      const [ childInstance ] = instance.childInstances;

      const newChildren = [
        {
          type: 'div',
          props: {
            children: []
          }
        },
        {
          type: 'p',
          props: {
            children: []
          }
        }
      ];

      const newElement = {
        type: 'div',
        props: {
          children: newChildren
        }
      };

      const newInstance = reconcile(instance, newElement);
      const [ divChild, parChild ] = newInstance.childInstances;

      expect(divChild).toBe(childInstance);
      expect(parChild).toMatchObject({
        dom: expect.any(HTMLParagraphElement),
        element: { type: 'p' },
        childInstances: []
      });
      console.log(newInstance.dom.childNodes);
      expect(newInstance.dom.firstChild).toBe(divChild.dom);
      expect(newInstance.dom.lastChild).toBe(parChild.dom);
    });

    it('when newElement has fewer children', () => {
      
      const children = [
        {
          type: 'div',
          props: {
            children: []
          }
        },
        {
          type: 'p',
          props: {
            children: []
          }
        }
      ];

      const element = {
        type: 'div',
        props: {
          children
        }
      };

      const instance = reconcile(null, element);

      const newElement = {
        type: 'div',
        props: {
          children: [{
            type: 'div',
            props: {
              children: []
            }
          }]
        }
      };

      const newInstace = reconcile(instance, newElement);
      expect(newInstace.childInstances).toHaveLength(1);
      const [ childInstance ] = newInstace.childInstances;

      expect(newInstace.dom.childNodes).toHaveLength(1);
      expect(newInstace.dom.firstChild).toBe(childInstance.dom);

    });
    
  });

})