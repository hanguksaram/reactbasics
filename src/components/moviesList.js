import React from 'react';

const MoviesList = (props) => {
    console.log(props)
    
    const renderMovies = (movies) => {
        movies ?
            movies.map(element => (
                <div> {element.name} </div>
            )) : null
    }
    return (
        <div>
            {renderMovies(props.data.movies)}
        </div>
    );
};

export default MoviesList;