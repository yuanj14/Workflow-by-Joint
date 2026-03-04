import { dia } from '@joint/core'

export class MyShape extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: 'MyShape',
      size: { width: 150, height: 80 },
      attrs: {
        rect: {
          fill: 'white',
          stroke: 'red',
          strokeWidth: 2,
          rx: 4,
          ry: 4,
          width: 'calc(w)', // 占满元素宽度
          height: 'calc(h)', // 占满元素高度
        },
        label: {
          text: 'Panamera',
          fill: 'black',
          fontSize: 14,
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
          x: 'calc(0.5*w)',
          y: 'calc(0.5*h)',
        },
      },
    }
  }

  initialize() {
    super.initialize(...arguments)
    this.markup = [
      { tagName: 'rect', selector: 'rect' },
      { tagName: 'text', selector: 'label' },
    ]
  }
}
