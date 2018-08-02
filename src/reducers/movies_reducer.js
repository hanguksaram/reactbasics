

//1 ACTION returns an object

//2 REDUCER finds a match



export default (state = {}, action) => {

    switch(action.type){
        case 'MOVIES_LIST':
            return {
                ...state,
                movies: {...action.payload}
            }
        case 'DIR_LIST':
            return {
                ...state,
                director: {...action.payload}
            }
        default:
            return state
    }
}
// example of private router


// <PrivateRouter {...props} component={} path={}/>

// const PrivateRouter = ({
//     component: Comp,
//     isAuth,
//     ...other
// }) => {
//     return (
//         <Route {...other} component={(props) => {
//             isAuth ? <Comp {...props}
//             :
//             <redirect to=
//         }}
//     )
// }