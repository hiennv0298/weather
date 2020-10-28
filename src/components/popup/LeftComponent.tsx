import React, { useState, useRef, HtmlHTMLAttributes, forwardRef, useImperativeHandle, useEffect } from 'react'
import { Weather } from '../../constants/typeDefinition'
import { useSpring, animated } from 'react-spring'
import WeatherDetail from './Weather'
import clear from '../../assets/clear.jpg'

const LeftComponent = forwardRef((props, ref) => {

    const [weathers, setWeathers] = useState<Weather[]>([]);    
    const [isShown, setIsShow] = useState(false);    
    const leftRef: any = useRef();

    useImperativeHandle(
        ref,
        () => ({
            getValue: (data: Weather[]) => {
                setWeathers(data);
                setIsShow(true);
            }
        }),
    );

    const removeLeftContainer = () => {
        setIsShow(false);
    }

    const setBackground = (image: any) => {
        console.log(image);
        leftRef.current.style.backgroundImage = `url(${image})`;
    }

    return <div style={{backgroundImage: `url(${clear})`}} className="left-container" ref={leftRef}>
        <div className={isShown ? "close-left-show" : "close-left-hide"}>
            <button onClick={removeLeftContainer}>X</button>
        </div>
        <div className="weathers">
        {
            (weathers && isShown )&&
            weathers.map((item, i) =>
                    <WeatherDetail weather={item} key={i} click={setBackground} />
            )
        }
        </div>
    </div>
})

export default LeftComponent;