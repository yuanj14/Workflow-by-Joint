import * as joint from 'joint-plus';
import { dia, shapes } from 'joint-plus';
import { useEffect } from 'react';
export default function NSClab() {
    useEffect(() => {
        const namespace = shapes
        const graph = new dia.Graph({}, { cellNamespace: namespace })
        var paper = new joint.dia.Paper({
            el: document.getElementById('paper'),
            width: 1000,
            height: 1000,
            gridSize: 10,
            linkPinning: false,
            drawGrid: true,
            model: graph, // Set graph as the model for paper
            defaultLink: function (elementView, magnet) {
                return new joint.shapes.standard.Link({
                    router: {
                        //优化后的正交曲线模式
                        name: 'manhattan',
                        args: {
                            startDirections: ['right'],
                            endDirections: ['left']
                        }
                    },
                    connector: {
                        // name: 'jumpover'
                        name: 'normal'
                    },
                    attrs: {
                        line: {
                            stroke: 'red',
                            strokeDasharray: '4 2',
                            connection: true,
                        }
                    }
                });
            },
            interactive: { linkMove: true },
            // snapLinks: {radius: 30},
            defaultConnectionPoint: {
                name: 'boundary',
                args: {
                    offset: -4.5,
                }
            },
            // 验证连线是否允许
            validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                if (magnetS === magnetT) { return false; }
                if (end === 'target') {
                    // 连线起点是普通"in"类型时，连线目标是普通"out"类型连接点
                    if (magnetS && magnetS.getAttribute('port-group') && magnetS.getAttribute('port-group').indexOf('in') >= 0 && magnetS.getAttribute('port-group').indexOf('e') < 0) { return magnetT && magnetT.getAttribute('port-group') && magnetT.getAttribute('port-group').indexOf('out') >= 0 && magnetT.getAttribute('port-group').indexOf('e') < 0; }
                    // 连线起点是普通"out"类型时，连线目标是普通"in"类型连接点
                    else if (magnetS && magnetS.getAttribute('port-group') && magnetS.getAttribute('port-group').indexOf('out') >= 0 && magnetS.getAttribute('port-group').indexOf('e') < 0) { return magnetT && magnetT.getAttribute('port-group') && magnetT.getAttribute('port-group').indexOf('in') >= 0 && magnetT.getAttribute('port-group').indexOf('e') < 0; }
                    // 连线起点模块是电力电子器件时，连线目标模块是电力电子器件
                    else if (magnetS && magnetS.getAttribute('port-group') && magnetS.getAttribute('port-group').indexOf('e') >= 0) { return magnetT && magnetT.getAttribute('port-group') && magnetT.getAttribute('port-group').indexOf('e') >= 0; }
                    // 连线起点模块未连接时，连线目标为全体端口
                    else return true;
                }
                else { // end === 'source'
                    if (magnetT && magnetT.getAttribute('port-group') && magnetT.getAttribute('port-group').indexOf('in') >= 0 && magnetT.getAttribute('port-group').indexOf('e') < 0) { return magnetS && magnetS.getAttribute('port-group') && magnetS.getAttribute('port-group').indexOf('out') >= 0 && magnetS.getAttribute('port-group').indexOf('e') < 0; }
                    else if (magnetT && magnetT.getAttribute('port-group') && magnetT.getAttribute('port-group').indexOf('e') >= 0) { return magnetS && magnetS.getAttribute('port-group') && magnetS.getAttribute('port-group').indexOf('e') >= 0; }
                    else return true;
                }
            },
        });
        const rect2 = new shapes.standard.Rectangle()
            .position(100, 250)
            .resize(100, 40)
            .attr({
                body: { stroke: '#C94A46', rx: 2, ry: 2 },
                label: { text: 'Source', fill: "balck" }
            })
            .addTo(graph)
        const portsIn = {
            //端口位置
            position: {
                name: 'left'
            },
            attrs: {
                portBody: {
                    magnet: true,
                    r: 10,
                    fill: '#023047',
                    stroke: '#023047'
                }
            },
            label: {
                position: {
                    name: 'left',
                    args: { y: 6 }
                },
                markup: [{
                    tagName: 'text',
                    selector: 'label',
                    className: 'label-text'
                }]
            },
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }]
        };

        const portsOut = {
            position: {
                name: 'right'
            },
            attrs: {
                portBody: {
                    magnet: true,
                    r: 10,
                    fill: '#E6A502',
                    stroke: '#023047'
                }
            },
            label: {
                position: {
                    name: 'right',
                    args: { y: 0 }
                },
                markup: [{
                    tagName: 'text',
                    selector: 'label',
                    className: 'label-text'
                }]
            },
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }]
        };
        const model = new shapes.standard.Rectangle({
            position: { x: 275, y: 50 },
            size: { width: 90, height: 90 },
            attrs: {
                body: {
                    fill: '#8ECAE6',
                },
                label: {
                    text: 'Model',
                    fontSize: 16,
                    y: -10
                }
            },
            ports: {
                groups: {
                    'in': portsIn,
                    'out': portsOut
                }
            }
        });

        model.addPorts([
            {
                group: 'in',
                attrs: { label: { text: 'in1' } }
            },
            {
                group: 'in',
                attrs: { label: { text: 'in2' } }
            },
            {
                group: 'out',
                attrs: { label: { text: 'out' } }
            }
        ]);

        graph.addCell(model);

        return () => {

        }
    }, [])

    return (
        <div>
            <div id="paper"></div>
        </div>
    )
}
