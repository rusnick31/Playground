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
      const newInstance = reconcile(null, newElement);
      const { dom, element, childInstances } = newInstance;
      
      expect(element).toEqual(newElement);
      expect(dom.className).toBe('awesome');
      
      expect(childInstances).toContain('awesome text');
      expect(dom.firstChild.nodeValue).toBe('awesome text')
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

  describe.only('when previousInstance and newElement have the same type', () => {
    
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
  
      const newElement = {
        type: 'p',
        props: {
          children: ['new awesome text']
        }
      };
  
      const newInstance = reconcile(previousInstance, newElement);
  
      
    });
    
  });

})
