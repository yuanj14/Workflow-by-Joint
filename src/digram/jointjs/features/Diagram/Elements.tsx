import React, { useRef, useEffect, useState } from "react";
import { dia, g, shapes, ui } from "@joint/plus";
import "../../App.css";
import { useJointInit } from "../../global/hooks/useJointInit";
export default function Elements(): React.ReactElement {
    const { paperRef, graph, paper } = useJointInit()
    useEffect(() => {
        init(test)
        return () => { };
    }, []);

    const test = (element : dia.Element) => {
        console.log('here');
        element.prop('size/width', 121);
        element.prop('attrs/label/text', 'porp');
        //Merge at the penultimate layer, and the last update.
        element.prop('data/count', 10);
        
        element.prop({ data: { ct: 20 }});
        // element.prop('z', 0);
        // set cover the original data
        element.set({data : {guod : 1}})
        element.set('angle', 90)
        // quicky set
        // element.attr('body','1231')
        console.log(element.toJSON());
        
    }

    const init = (func : (x : dia.Element)=> void) => {
        const markup: dia.MarkupJSON = [{
            tagName: 'g',
            children: [
                { tagName: 'circle', selector: 'circle1', groupSelector: 'circles' },
                'text content',
                { tagName: 'circle', selector: 'circle2', groupSelector: 'circles' }
            ]
        }]
        const element_markup = new shapes.standard.Rectangle({
            position: { x: 200, y: 50 },
            markup: markup,
            attrs: {
                circles: { stroke: 'black', strokeWidth: 2 },
                // the child origin of cordination is the position of parent container
                // no filled area cant be interactive
                circle1: { fill: 'green', r: 10, cx: 10, cy: 100 },
                circle2: { fill: 'bule', r: 10, cx: 40, cy: 10 }
            }
        })
        graph.addCell(element_markup)
        // func(element_markup)
        const markup2: dia.MarkupJSON = [{
            tagName: 'rect',
            selector: 'body'
        }, {
            tagName: 'text',
            selector: 'label',
            //静态属性
            attributes: {
                'stroke': 'none'
            }
        }]
        const element_markup2 = new shapes.standard.Rectangle({
            position: { x: 100, y: 50 },
            size: { width: 100, height: 50 },
            attrs: {
                body: { stroke: '#C94A46' },
                label: { text: 'hello', fill: 'black' }
            }
        })
        graph.addCell(element_markup2)
        func(element_markup2)
    }


    return (
        <div>
            <h3>JointJS Events no instance demo, so this is a practice of 'set/prop/attr'</h3>
            <div ref={paperRef}></div>
        </div>
    );
}
