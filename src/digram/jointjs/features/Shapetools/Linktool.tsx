import React, { useRef, useEffect } from "react";
import { dia, g, shapes, ui, linkTools } from "@joint/plus";
import "../../App.css";
import "../../../css/codepen/lab01.css"
import { useJointInit } from "../../global/hooks/useJointInit";
import { Link } from "react-router-dom";

export default function Links() {
    const { paperRef, paper, graph } = useJointInit();
    const unit = 4;
    const bevel = 2 * unit;
    const spacing = 2 * unit;
    const flowSpacing = unit / 2;
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



        // const link = new shapes.standard.Link();
        // link.source(source, {
        //     anchor: {
        //         name: 'center',
        //         args: {
        //             dx: 30
        //         }
        //     }
        // });
        // link.target(target, {
        //     anchor: {
        //         name: 'center',
        //         args: {
        //             dx: -30
        //         }
        //     },
        //     connectionPoint: {
        //         name: 'boundary'
        //     }
        // });
        // link.vertices([
        //     { x: 130, y: 180 },
        //     { x: 400, y: 180 }
        // ]);
        // link.addTo(graph);
        const link = createFlow(source, target)
        graph.addCell(link);
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

        // const toolsView = new dia.ToolsView({
        //     tools: [
        //         verticesTool, segmentsTool,
        //         // sourceArrowheadTool,
        //         targetArrowheadTool,
        //         // sourceAnchorTool, targetAnchorTool,
        //         boundaryTool, removeButton
        //     ]
        // });

        // paper.on('link:mouseenter', function (linkView) {
        //     linkView.addTools(toolsView);
        // });

        paper.on('link:mouseleave', function (linkView) {
            linkView.removeTools();
        });

        paper.on("link:mouseenter", (cellView) => {
            paper.removeTools();
            dia.HighlighterView.removeAll(paper);

            const snapAnchor = function (coords, endView) {
                const bbox = endView.model.getBBox();
                // Find the closest point on the bbox border.
                const point = bbox.pointNearestToPoint(coords);
                const center = bbox.center();
                // Snap the point to the center of the bbox if it's close enough.
                const snapRadius = 10;
                if (Math.abs(point.x - center.x) < snapRadius) {
                    point.x = center.x;
                }
                if (Math.abs(point.y - center.y) < snapRadius) {
                    point.y = center.y;
                }
                return point;
            };

            const toolsView = new dia.ToolsView({
                tools: [
                    targetArrowheadTool,
                    new linkTools.SourceAnchor({
                        snap: snapAnchor,
                        resetAnchor: cellView.model.prop(["source", "anchor"])
                    })
                ]
            });
            toolsView.el.classList.add("jj-flow-tools");
            cellView.addTools(toolsView);
            // Add copy of the link <path> element behind the link.
            // The selection link frame should be behind all elements and links.
            // const strokeHighlighter = StrokeHighlighter.add(
            //     cellView,
            //     "root",
            //     "selection",
            //     {
            //         layer: dia.Paper.Layers.BACK
            //     }
            // );
            // strokeHighlighter.el.classList.add("jj-flow-selection");
        });


        return () => { graph.clear() };
    }, [paper]);


    function createFlow(
        source,
        target,
        sourceAnchor = "right",
        targetAnchor = "left"
    ) {
        return new shapes.standard.Link({
            // anchor 连接点位置
            source: { id: source.id, anchor: { name: sourceAnchor } },
            target: { id: target.id},
            z: 2,
            attrs: {
                line: {
                    class: "jj-flow-line",
                    targetMarker: {
                        class: "jj-flow-arrowhead",
                        d: `M 0 0 L ${2 * unit} ${unit} L ${2 * unit} -${unit} Z`
                    }
                },
                // The `outline` path is added to the `standard.Link` below in `markup``
                // We want to keep the `wrapper` path to do its original job,
                // which is the hit testing
                // outline: {
                //     class: "jj-flow-outline",
                //     connection: true
                // }
            },
            markup: [
                {
                    tagName: "path",
                    selector: "wrapper",
                    attributes: {
                        fill: "none",
                        cursor: "pointer",
                        stroke: "transparent",
                        "stroke-linecap": "round"
                    }
                },
                {
                    tagName: "path",
                    selector: "outline",
                    attributes: {
                        fill: "none",
                        "pointer-events": "none"
                    }
                },
                {
                    tagName: "path",
                    selector: "line",
                    attributes: {
                        fill: "none",
                        "pointer-events": "none"
                    }
                }
            ],
            defaultLabel: {
                attrs: {
                    labelBody: {
                        class: "jj-flow-label-body",
                        ref: "labelText",
                        d: `
                        M calc(x-${spacing}) calc(y-${spacing})
                        m 0 ${bevel} l ${bevel} -${bevel}
                        h calc(w+${2 * (spacing - bevel)}) l ${bevel} ${bevel}
                        v calc(h+${2 * (spacing - bevel)}) l -${bevel} ${bevel}
                        H calc(x-${spacing - bevel}) l -${bevel} -${bevel} Z
                    `
                    },
                    labelText: {
                        class: "jj-flow-label-text",
                        textAnchor: "middle",
                        textVerticalAnchor: "middle",
                        fontStyle: "italic"
                    }
                },
                markup: [
                    {
                        tagName: "path",
                        selector: "labelBody"
                    },
                    {
                        tagName: "text",
                        selector: "labelText"
                    }
                ]
            }
        });
    }

    return (
        <div>
            <div>Link Tools</div>
            <div ref={paperRef}></div>
        </div>
    );
}