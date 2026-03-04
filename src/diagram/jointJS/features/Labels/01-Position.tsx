import { g, shapes, util } from '@joint/plus'
import { useEffect } from 'react'
import { useJointInit } from '../../global/hooks/useJointInit'
export default function Position() {
  const { paper, graph, paperRef } = useJointInit()
  useEffect(() => {
    if (!paper) {
      return
    }
    work_positon()

    return () => {
      graph.clear()
    }
  }, [paper])

  const work_positon = () => {
    const link = new shapes.standard.Link()
    link.source(new g.Point(100, 110))
    link.target(new g.Point(500, 110))
    link.vertices([{ x: 300, y: 190 }])
    link.appendLabel({
      attrs: { text: { text: '0.25' } },
      position: { distance: 0.25 },
    })
    link.appendLabel({
      attrs: { text: { text: '150' } },
      position: { distance: 150 },
    })
    link.appendLabel({
      attrs: { text: { text: '-100' } },
      position: { distance: -100 },
    })
    link.addTo(graph)

    function contract(link: shapes.standard.Link) {
      link.transition(
        'source',
        { x: 200, y: 110 },
        {
          delay: 1000,
          duration: 4000,
          timingFunction: function (time) {
            return time <= 0.5 ? 2 * time : 2 * (1 - time)
          },
          valueFunction: util.interpolate.object,
        },
      )

      link.transition(
        'target',
        { x: 400, y: 110 },
        {
          delay: 1000,
          duration: 4000,
          timingFunction: function (time) {
            return time <= 0.5 ? 2 * time : 2 * (1 - time)
          },
          valueFunction: util.interpolate.object,
        },
      )

      link.oscillateToggle = true
    }

    function oscillate(link: shapes.standard.Link) {
      link.transition(
        'source',
        { x: 100, y: 190 },
        {
          delay: 1000,
          duration: 4000,
          timingFunction: function (time) {
            return time <= 0.5 ? 2 * time : 2 * (1 - time)
          },
          valueFunction: util.interpolate.object,
        },
      )

      link.transition(
        'vertices/0',
        { x: 300, y: 110 },
        {
          delay: 1000,
          duration: 4000,
          timingFunction: function (time) {
            return time <= 0.5 ? 2 * time : 2 * (1 - time)
          },
          valueFunction: util.interpolate.object,
        },
      )

      link.transition(
        'target',
        { x: 500, y: 190 },
        {
          delay: 1000,
          duration: 4000,
          timingFunction: function (time) {
            return time <= 0.5 ? 2 * time : 2 * (1 - time)
          },
          valueFunction: util.interpolate.object,
        },
      )

      link.oscillateToggle = false
    }

    link.currentTransitions = 0
    link.oscillateToggle = 0

    contract(link)

    link.on('transition:start', function (link) {
      link.currentTransitions += 1
    })

    link.on('transition:end', function (link) {
      link.currentTransitions -= 1

      if (link.currentTransitions === 0) {
        if (link.oscillateToggle) oscillate(link)
        else contract(link)
      }
    })
  }

  return (
    <div>
      <h2>Position</h2>
      <div ref={paperRef}></div>
    </div>
  )

  const work = () => {
    const link = new shapes.standard.Link({
      source: { x: 50, y: 400 },
      target: { x: 500, y: 400 },
      defaultLabel: {
        markup: [
          { tagName: 'rect', selector: 'body' },
          { tagName: 'text', selector: 'label' },
        ],
        // use to calc(w)\calc(h)
        size: { width: 150, height: 100 },
        attrs: {
          body: {
            width: 'calc(w)',
            height: 'calc(h)',
            // center around label position:
            // x: 'calc(w/-2)',
            // y: 'calc(h/-2)',
            stroke: 'black',
            fill: 'white',
          },
          label: {
            textWrap: { width: 'calc(w-5)', height: 'calc(h-5)' },
            // textAnchor: 'middle',
            // textVerticalAnchor: 'middle',
            // fontFamily: 'sans-serif'
          },
        },
      },
      labels: [
        {
          // specification of an individual label:
          size: { width: 150, height: 100 }, // partially overwrites `defaultLabel.size`
          attrs: { label: { text: 'Hello Worldjjjjjjj24561231231' } },
          position: { distance: 0.5 }, // overwrites built-in default
        },
        {
          // specification of an individual label:
          size: { width: 50, height: 40 }, // partially overwrites `defaultLabel.size`
          attrs: { label: { text: 'Hello World' } },
          position: { distance: 0.2 }, // overwrites built-in default
        },
      ],
    })
    const rect1 = new shapes.standard.Rectangle({
      position: { x: 100, y: 100 },
      size: { width: 100, height: 60 },
      attrs: {
        body: { fill: 'lightgreen' },
        label: { text: 'text', fill: 'black' },
      },
    })
    const targetElement = rect1.clone().attr('label/text', 'double')
    graph.addCells([rect1, link, targetElement])

    const link2 = new shapes.standard.Link({
      source: { x: 200, y: 200 },
      target: { x: 300, y: 200 },
    })
    link2.appendLabel({ attrs: { text: { text: 'hhlo' } } })
    graph.addCell(link2)
  }
}
