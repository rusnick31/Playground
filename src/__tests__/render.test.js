import render from '../render';

describe('render tests', () => {
  
  it('should render a simple element', () => {
    const container = document.createElement('div');
    container.id = 'root';
    const element = {
      type: 'div',
      props: {
        className: 'awesome',
        children: []
      }
    };

    render(element, container);

    const addedElement = container.querySelector('div');
    expect(addedElement).not.toBeNull();
    expect(addedElement).toHaveProperty('className', 'awesome');
  });

});