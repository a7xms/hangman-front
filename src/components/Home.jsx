import {Navigate} from "react-router";
import {useSelector} from "react-redux";


const Home = () => {
    const {user} = useSelector(state => state.loginReducer);

    console.log(user);

    if(!user) {
        return <Navigate to={'/signin'}/>
    }
    if(user.userRole === 'ROLE_ADMIN') {
        return <Navigate to={'/catalog'}/>
    }

    if(user.userRole === 'ROLE_USER') {
        return <Navigate to={'/play'}/>
    }

    return <Navigate to={'/signin'}/>


}

export default Home;