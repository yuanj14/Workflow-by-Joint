import React, { useRef, useEffect } from "react";
import { dia, g, shapes, ui } from "@joint/plus";
import "../../App.css";

export default function Paper(): React.ReactElement {
    const graphRef = useRef<dia.Graph | null>(null);
    const paperRef = useRef<HTMLDivElement>(null);
    const paperInstanceRef = useRef<dia.Paper | null>(null);
    useEffect(() => {
        const graph = new dia.Graph({}, { cellNamespace: shapes });
        graphRef.current = graph;
        if (paperRef.current && graphRef.current) {
            const paper = new dia.Paper({
                el: paperRef.current,
                model: graph,
                width: "100%",
                height: 500,
                cellViewNamespace: shapes,
                background: { color: "#f5f5f5" },
            });
            paperInstanceRef.current = paper;
            // single DOM element
            const markup1: dia.MarkupJSON = [{ tagName: "rect", selector: "body" }]; // selector改为body1
            const element1 = new shapes.standard.Rectangle({
                position: { x: 50, y: 50 },
                size: { width: 100, height: 40 },
                markup: markup1,
                attrs: {
                    body: {
                        // 这里的键要和selector保持一致
                        fill: "blue",
                        stroke: "black",
                        strokeWidth: 2,
                        rx: 5,
                        ry: 5,
                        width: "calc(w)", // 减去描边宽度
                        height: "calc(h)", // 减去描边宽度
                    },
                },
            });
            graph.addCell(element1);
            // multiple DOM elements
            const markup2: dia.MarkupJSON = [
                {
                    tagName: "rect",
                    selector: "body",
                },
                {
                    tagName: "text",
                    selector: "label",
                },
            ];
            const element2 = new shapes.standard.Rectangle({
                position: { x: 200, y: 50 },
                size: { width: 100, height: 40 },
                markup: markup2,
                attrs: {
                    body: {
                        fill: "green",
                        stroke: "black",
                        strokeWidth: 2,
                        rx: 5,
                        ry: 5,
                    },
                    label: {
                        text: "Hello",
                        fill: "black",
                    },
                },
            });

            // nested DOM elements
            const markup3: dia.MarkupJSON = [
                {
                    tagName: "g",
                    children: [
                        {
                            tagName: "circle",
                            selector: "circle1",
                            groupSelector: "circles",
                        },
                        // svg标签中 文本必须 <text> 才能显示
                        "text content111",
                        {
                            tagName: "circle",
                            selector: "circle2",
                            groupSelector: "circles",
                        },
                    ],
                },
            ];
            const element3 = new shapes.standard.Rectangle({
                position: { x: 350, y: 50 },
                size: { width: 100, height: 40 },
                markup: markup3,
                attrs: {
                    circles: {
                        stroke: "black",
                        strokeWidth: 2,
                    },
                    circle1: {
                        r: 10,
                        cx: 20,
                        cy: 20,
                        fill: "red",
                    },
                    circle2: {
                        r: 10,
                        cx: 80,
                        cy: 20,
                        fill: "red",
                    },
                },
            });
            graph.addCell(element2);
            graph.addCell(element3);
        } else {
            console.error("paperRef or graphRef is null");
        }
        return () => { };
    }, []);

    return (
        <div>
            <h3>JointJS Cells</h3>
            <div ref={paperRef}></div>
        </div>
    );
}
