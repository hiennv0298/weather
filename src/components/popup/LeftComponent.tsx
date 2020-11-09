import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { Weather } from '../../constants/typeDefinition'
import WeatherDetail from './Weather'
import { getImageWithMain } from '../../constants/Utils'
import Chart from './Chart'

const LeftComponent = forwardRef((props, ref) => {

    const [weathers, setWeathers] = useState<Weather[]>([]);
    const [isShown, setIsShow] = useState(false);
    const [isShownChart, setIsShowChart] = useState(false);
    const leftRef: any = useRef();

    useImperativeHandle(
        ref,
        () => ({
            getValue: (data: Weather[]) => {
                setWeathers(data);
                if (data.length > 0) {
                    setIsShow(true);
                    const bg = getImageWithMain(data[0]?.weather[0].main);
                    setBackground(bg);
                }
            }
        }),
    );

    const removeLeftContainer = () => {
        setIsShow(false);
    }

    const setBackground = (image: any) => {
        leftRef.current.style.backgroundImage = `url(${image})`;
    }

    const forecast = (coord: Coordinates) => {
        setIsShowChart(true);
    }

    return <div className="popup">
        {
            isShownChart && <Chart />
        }
        <div className={isShown ? "left-container padding-75" : "left-container"} ref={leftRef}>
            <div className="weathers">
                {
                    (weathers && isShown) &&
                    weathers.map((item, i) =>
                        <WeatherDetail weather={item} key={i} click={setBackground} forecast={forecast} />
                    )
                }
            </div>
        </div>
        <div className={isShown ? "close-left-show" : "close-left-hide"}>
            <div className="close-container" onClick={removeLeftContainer}>
                <div className="leftright"></div>
                <div className="rightleft"></div>
            </div>
        </div>
    </div>
})

export default LeftComponent;