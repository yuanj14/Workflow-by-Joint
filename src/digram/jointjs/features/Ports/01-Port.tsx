import { useEffect } from "react";
import { dia, shapes } from '@joint/plus'
export default function PortComponent() {
    useEffect(() => {
        const namespace = shapes;
        const graph = new dia.Graph({}, { cellNamespace: namespace });

        const paper = new dia.Paper({
            el: document.getElementById('paper'),
            width: 650,
            height: 200,
            //越低 帧率越高
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

        const port = {
            //标签属性预设
            label: {
                position: {
                    name: 'right'
                },
                markup: [{
                    tagName: 'text',
                    selector: 'porttext'
                }]
            },
            //Body属性预设
            markup: [{
                tagName: 'rect',
                selector: 'portBody'
            }],
            //属性定义
            attrs: {
                portBody: {
                    magnet: true,
                    width: 16,
                    height: 16,
                    //center point
                    x: -8,
                    y: -8,
                    fill: '#03071E'
                },
                porttext: {
                    text: 'port'
                }
            }
        };

        const model = new shapes.standard.Rectangle({
            position: { x: 275, y: 50 },
            size: { width: 90, height: 90 },
            attrs: {
                body: {
                    fill: '#8ECAE6'
                }
            },
            ports: {
                items: [port, port] // add a port in constructor
            }
        });

        model.addPort(port); // add a port using Port API

        graph.addCell(model);


        return () => {
        }
    }, [])

    return (
        <div>
            <h2>PortComponent Example</h2>
            <div id="paper"></div>
        </div>
    )
}
