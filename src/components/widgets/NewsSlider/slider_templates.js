import React from 'react'
import Slick from 'react-slick'
import { Link } from 'react-router-dom'
import style from './slider.css'

const SliderTemplates = (props) => {

    
    let template = null
    const settings = {
        arrows: false,
        dots: true,
        infinite: true,
        arrow: false,
        speed: 500,
        slideToShow: 2,
        slidesToScroll: 1,
        ...props.settings
    }

    switch(props.type) {
        case 'featured' :
            template = props.data.map((elem, index) => {
                return(
                    <div key={index}>
                        <div className={style.featured_item}>
                            <div className={style.featured_image}
                                style={{
                                    background:`url(../images/articles/${elem.image}`
                                }}>

                            </div>
                        <Link to={`/articles/${elem.id}`}>
                                <div className={style.featured_caption}>
                                    {elem.title}
                                </div>
                        </Link>
                        </div>
                    </div>
                )

            })
            break;
        
        default:
            template = null;
    }


    return (
        <Slick {...settings}>
            {template}
        </Slick>
    );
};

export default SliderTemplates