import { dia, shapes } from 'joint-plus';
import { useEffect } from "react";
export default function GroupPortComponent() {
    useEffect(() => {
        const namespace = shapes;
        const graph = new dia.Graph({}, { cellNamespace: namespace });

        const paper = new dia.Paper({
            el: document.getElementById('paper'),
            width: 650,
            height: 200,
            gridSize: 1,
            model: graph,
            background: { color: '#F5F5F5' },
            cellViewNamespace: namespace,
            linkPinning: false, // Prevent link being dropped in blank paper area
            defaultLink: () => new shapes.standard.Link(),
            defaultConnectionPoint: { name: 'boundary' },
            validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                // Prevent linking between ports within one element
                if (cellViewS === cellViewT) return false;
                return true
            }
        });

        const portsIn = {
            //端口位置
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }],
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
                    // args: { y: 6 }
                },
                markup: [{
                    tagName: 'text',
                    selector: 'porttext',
                }]
            }
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
                    selector: 'porttext',
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
                attrs: { porttext: { text: 'in1' } }
            },
            {
                group: 'in',
                attrs: { porttext: { text: 'in2' } }
            },
            {
                group: 'out',
                attrs: { porttext: { text: 'out' } }
            }
        ]);

        graph.addCell(model);

        return () => {
        }
    }, [])

    return (
        <div>
            <h2>GroupPortComponent</h2>
            <div id="paper"></div>
        </div>
    )
}
