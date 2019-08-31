import reconcile from '../reconcile';

describe('reconciliation tests', () => {
  
  describe('when instance is null', () => {
    
    it('should create instance from simple element', () => {
      const newElement = {
        type: 'div',
        props: {
          className: 'awesome',
          children: ['awesome text']
        }
      };
      const container = document.createElement('div');

      const { dom, element, childInstances } = reconcile(container, null, newElement);
      
      expect(element).toEqual(newElement);
      expect(dom).toBeInstanceOf(HTMLElement);
      expect((dom as HTMLElement).className).toBe('awesome');

      const [ childInstance ] = childInstances;
      const firstChild = dom.firstChild;

      expect(firstChild).toBe(childInstance.dom);
      expect(childInstance.dom.nodeValue).toBe('awesome text');
      expect(childInstance.element).toBe('awesome text');
      expect(childInstance.childInstances).toHaveLength(0);
    });

    it('should create new Instance from nested element', () => {
      const childElement = {
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
          children: [childElement, 'textChild']
        }
      };

      const container = document.createElement('div');

      const { dom, element, childInstances } = reconcile(container, null, newElement);
      
      expect(element).toEqual(newElement);
      expect((dom as HTMLElement).className).toBe('div');
      expect(childInstances).toHaveLength(2);
      expect(dom.childNodes).toHaveLength(2);

      const [ firstChildInstance, secondChildInstance ] = childInstances;
      const [ firstChildNode, secondChildNode ] = dom.childNodes;

      expect(firstChildInstance.dom).toBe(firstChildNode);
      expect(secondChildInstance.dom).toBe(secondChildNode);
      expect(firstChildInstance.element).toBe(childElement);
      expect(secondChildInstance.element).toBe('textChild');

      expect((firstChildNode as HTMLElement).className).toBe('p');
      expect(firstChildNode.firstChild.nodeValue).toBe('text');

      expect(secondChildNode.nodeValue).toBe('textChild');
    });

  });

  describe('when previousInstance and newElement types differ', () => {
    it('should instantiate new element', () => {
      const element = {
        type: 'div',
        props: {
          className: 'div',
          children: []
        }
      };
      const container = document.createElement('div');
      const instance = reconcile(container, null, element);

      expect(container.firstChild).toBe(instance.dom);

      const newElement = {
        type: 'p',
        props: {
          className: 'p',
          children: []
        }
      };
      const newInstance = reconcile(container, instance, newElement);

      expect(newInstance).not.toBe(instance);
      expect(newInstance.element.props.className).toBe('p');
      expect(newInstance.dom.nodeName).toBe('P');
    });

    it('should instantiate new string element', () => {
      const element = {
        type: 'div',
        props: {
          className: 'div',
          children: []
        }
      }
      const container = document.createElement('div');
      const instance = reconcile(container, null, element);

      const newElement = 'string';
      const newInstance = reconcile(container, instance, newElement);

      expect(newInstance).not.toBe(instance);
      expect(newInstance.dom.nodeValue).toBe(newElement);
      expect(newInstance.element).toBe(newElement);
    });
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

      const container = document.createElement('div');

      const instance = reconcile(container, null, previousElement);

      const newElement = {
        type: 'div',
        props: {
          className: 'newClass',
          children: []
        }
      }

      const newInstace = reconcile(container, instance, newElement);

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
      const container = document.createElement('div');
  
      const previousInstance = reconcile(container, null, previousElement);
      const [ previousChild ] = previousInstance.childInstances;
  
      const newElement = {
        type: 'p',
        props: {
          children: ['new awesome text']
        }
      };
  
      const newInstance = reconcile(container, previousInstance, newElement);

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

      const container = document.createElement('div');

      const instance = reconcile(container, null, element);
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

      const newInstance = reconcile(container, instance, newElement);
      const [ divChild, parChild ] = newInstance.childInstances;

      expect(divChild).toBe(childInstance);
      expect(parChild).toMatchObject({
        dom: expect.any(HTMLParagraphElement),
        element: { type: 'p' },
        childInstances: []
      });
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

      const container = document.createElement('div');

      const instance = reconcile(container, null, element);

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

      const newInstace = reconcile(container, instance, newElement);
      expect(newInstace.childInstances).toHaveLength(1);
      const [ childInstance ] = newInstace.childInstances;

      expect(newInstace.dom.childNodes).toHaveLength(1);
      expect(newInstace.dom.firstChild).toBe(childInstance.dom);

    });
    
  });

});
