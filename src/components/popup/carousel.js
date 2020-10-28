import React from 'react'
import Slider from 'infinite-react-carousel'
import { getIcon } from '../../constants/Utils'

const Carousel = (props) => {

    const settings = {
        arrows: false,
        arrowsBlock: false,
        autoplay: true,
        duration: 1000,
        pauseOnHover: false,
        autoplaySpeed: 3000,
        swipe: false,
        wheel: true
    }

    return <div style={{ float: 'left', height: '50px', width:'50px' }}>
        <Slider {...settings}>
            {props.items && props.items.map((w, i) =>
                <div key={i}>
                    <img src={getIcon(w.icon)} alt={w.description} style={{height: '50px', width:'50px'}} />
                </div>
            )}
        </Slider>
    </div>
}

export default Carousel