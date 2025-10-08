import React, { useRef, useEffect } from "react";
import { dia, g, shapes, ui, linkTools } from "@joint/plus";
import "../../App.css";
import { useJointInit } from "../../global/hooks/useJointInit";

export default function Links() {
    const { paperRef, paper, graph } = useJointInit();

    useEffect(() => {
        if (!paper) { return }

        const source = new shapes.standard.Rectangle();
        source.position(40, 40);
        source.resize(120, 60);
        source.attr({
            body: {
                fill: 'white',
                stroke: 'black',
                strokeWidth: 2
            },
            label: {
                text: 'Hello',
                fill: 'black'
            }
        });
        source.addTo(graph);

        const target = new shapes.standard.Ellipse();
        target.position(440, 200);
        target.resize(120, 60);
        target.attr({
            body: {
                fill: 'white',
                stroke: 'black',
                strokeWidth: 2,
                rx: 60,
                ry: 30,
            },
            label: {
                text: 'World!',
                fill: 'black'
            }
        });
        target.addTo(graph);

        const link = new shapes.standard.Link();
        link.source(source, {
            anchor: {
                name: 'center',
                args: {
                    dx: 30
                }
            }
        });
        link.target(target, {
            anchor: {
                name: 'center',
                args: {
                    dx: -30
                }
            },
            connectionPoint: {
                name: 'boundary'
            }
        });
        link.vertices([
            { x: 130, y: 180 },
            { x: 400, y: 180 }
        ]);
        link.addTo(graph);

        const verticesTool = new linkTools.Vertices();
        const segmentsTool = new linkTools.Segments();
        const sourceArrowheadTool = new linkTools.SourceArrowhead();
        const targetArrowheadTool = new linkTools.TargetArrowhead();
        const sourceAnchorTool = new linkTools.SourceAnchor();
        const targetAnchorTool = new linkTools.TargetAnchor();
        const boundaryTool = new linkTools.Boundary({
            
        });
        const removeButton = new linkTools.Remove({
            distance: 20
        });

        const toolsView = new dia.ToolsView({
            tools: [
                verticesTool, segmentsTool,
                // sourceArrowheadTool,
                 targetArrowheadTool,
                // sourceAnchorTool, targetAnchorTool,
                boundaryTool, removeButton
            ]
        });

        paper.on('link:mouseenter', function (linkView) {
            linkView.addTools(toolsView);
        });

        paper.on('link:mouseleave', function (linkView) {
            linkView.removeTools();
        });



        return () => { graph.clear() };
    }, [paper]);

    return (
        <div>
            <div>Link Tools</div>
            <div ref={paperRef}></div>
        </div>
    );
}