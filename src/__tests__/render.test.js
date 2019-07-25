import render from '../render';

describe('index tests', () => {
  it('should test sum', () => {
    const container = document.createElement('div');
    container.id = 'root';
    const element = {
      type: 'div',
      props: {
        className: 'awesome'
      }
    };
    render(element, container);

    const addedElement = container.querySelector('div');

    expect(addedElement).not.toBeNull();
    expect(addedElement).toHaveProperty('className', 'awesome');
  })
});