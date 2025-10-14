import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './digram/jointjs/App'
//从这里一直点击App路径 找到最后一个进行加载项修改

const root = createRoot(document.getElementById('root')!)

root.render(
    //reload but prevent the unnormal situation from HMR
    //if want to know what hooks of react work is, its necessary to open it 
    //the real environment of dev : build and preview to see it
    // <StrictMode>
        <App />
    // </StrictMode>
)
