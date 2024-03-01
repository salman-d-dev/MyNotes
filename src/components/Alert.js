import React from 'react'

function Alert(props) {
    const capitalize = (word)=>{
      if (word==="danger"){
        word = "error"
      }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{height: '50px', pointerEvents:'none'}} className='fixed-top'>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show topBadge${props.alert.type==="success"?"G":"E"}`} role="alert">
           <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg} 
        </div>}
        </div>
    )
}

export default Alert