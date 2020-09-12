import React from 'react'

export default function Button({value, onClick, className, id, color}) {

    return (
        <button style={{'color': color}} id={id} className={className} onClick={onClick}> {value} </button>
    )
}
