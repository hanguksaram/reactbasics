export const moviesList = () => ({
        type: 'MOVIES_LIST',
        payload: [
            {id: 1, name :'Pulp Fiction'},
            {id: 2, name :'Pulp '},
            {id: 3, name :'Fiction'}
        ]
    }
)
export const directorsList = () => ({
    type: 'DIR_LIST',
    payload: [
        {id: 1, name :'Tarantin'},
        {id: 2, name :'Scorcece'},
        
    ]
}
)