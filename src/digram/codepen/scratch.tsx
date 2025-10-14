import React, { useEffect } from 'react'

export default function Scratch() {
    useEffect(() => {
      work();
    
      return () => {
        
      }
    }, [])
    
    const work = () =>{
        
    }

  return (
    <div>
        <div id="paper"></div>
    </div>
  )
}
