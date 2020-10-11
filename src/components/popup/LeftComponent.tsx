import React, { useState, useRef, HtmlHTMLAttributes, forwardRef, useImperativeHandle, useEffect } from 'react'
import { Weather } from '../../constants/typeDefinition'

const leftStyle: any = {
    position: 'absolute',
    top: '50px',
    right: '50px',
    width: '300px',
    height: '500px',
    background: 'green',
    zIndex: '9999'
}


const LeftComponent = forwardRef((props, ref) => {

    const [weathers, setWeathers] = useState<Weather[]>([]);
    const valueRef = useRef();

    const popupWeather = (weathers: Weather[]): void => {
        alert("asdasdas");
    }

    const onChangeHandle = (data: any) => {
        console.log(data);
    }

    useImperativeHandle(
        ref,
        () => ({
            getValue: (data: Weather[]) => {
                setWeathers(data);
            }
        }),
    );

    return <div onClick={(data) => onChangeHandle(data)} style={leftStyle}>
        <h2>{weathers[0]?.name}</h2>
    </div>
})

export default LeftComponent;