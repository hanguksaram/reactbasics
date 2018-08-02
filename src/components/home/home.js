import React from 'react';
import NewsSlider from '../widgets/NewsSlider/slider'
import NewsList from '../widgets/NewsList/newsList'
import VideosList from '../widgets/VideosList/videosList'

const Home = () => {
    return (
        <div>
            <NewsSlider
                type="featured"
                start={0}
                amount={6}
                settings={{
                    dots:false
                }}/>
            <NewsList
                type="card"
                loadmore={true}
                start={0}
                amount={2}/>
            <VideosList
                type="card"
                title={true}
                loadmore={true}
                start={0}
                amount={2}/>
            
        </div>
    );
};

export default Home;