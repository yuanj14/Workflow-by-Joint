import React, { useRef, useEffect } from "react";
import { dia, g, shapes, ui, elementTools } from "@joint/plus";
import "../../App.css";
import { useJointInit } from "../../global/hooks/useJointInit";

export default function Links() {
    const { paperRef, paper, graph } = useJointInit();

    useEffect(() => {
        if (!paper) { return }
        const element = new shapes.standard.Rectangle({
            position: { x: 100, y: 100 },
            size: { width: 100, height: 60 },
            attrs: {
                body: { fill: "lightblue", },
                label: { text: "Source", fill: "black" },
            },
        });
        graph.addCell(element)
        // create tool
        const boundaryTool = new elementTools.Boundary({
            padding: 10,
            rotate: true,
            useModelGeometry: true,
        });
        const removeButton = new elementTools.Remove();
        // create toolview
        const toolsView = new dia.ToolsView({
            tools: [
                boundaryTool,
                removeButton
            ]
        });
        // find elementView from paper
        const elementView = paper.findViewByModel(element)
        elementView.addTools(toolsView);
        elementView.hideTools();

        paper.on('element:mouseenter', function (elementView) {
            elementView.showTools();
        });

        paper.on('element:mouseleave', function (elementView) {
            elementView.hideTools();
        });



        // customizing button extend 
        const infoButton = new elementTools.Button({
            markup: [{
                tagName: 'circle',
                selector: 'button',
                attributes: {
                    'r': 7,
                    'fill': '#001DFF',
                    'cursor': 'pointer'
                }
            }, {
                tagName: 'path',
                selector: 'icon',
                attributes: {
                    'd': 'M -2 4 2 4 M 0 3 0 0 M -2 -1 1 -1 M -1 -4 1 -4',
                    'fill': 'none',
                    'stroke': '#FFFFFF',
                    'stroke-width': 2,
                    'pointer-events': 'none'
                }
            }],
            // icon位置
            x: '100%',
            y: '0%',
            // icon位置偏移
            offset: {
                x: 0,
                y: 0
            },
            rotate: true,
            action: function (evt) {
                alert('View id: ' + this.id + '\n' + 'Model id: ' + (this.model! as { id: string }).id);
            }
        });

        const toolsView2 = new dia.ToolsView({
            tools: [infoButton]
        });

        const elementView2 = element.findView(paper);
        elementView.addTools(toolsView2);




        return () => { graph.clear() };
    }, [paper]);

    return (
        <div>
            <div>Element Tools</div>
            <div ref={paperRef}></div>
        </div>
    );
}