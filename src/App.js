import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import Callback from "./pages/Callback";
import {AuthProvider, PrivateRoute} from "react-auth-kit";
import Login from "./pages/Login";
import MyShows from "./pages/Shows/MyShows";
import CheckTokenService from "./services/CheckToken";
import Show from "./pages/Shows/Show";
import Shows from "./pages/Shows/Shows";
import Friends from "./pages/Friends/Friends";
import Profile from "./pages/Profile";
import {Toaster} from "react-hot-toast";
import FriendRequest from "./pages/Friends/FriendRequest";
import SearchMember from "./pages/Friends/SearchMember";

function App() {
    return (
        <AuthProvider authType={'cookie'}
                      authName={'_auth'}
                      cookieDomain={window.location.hostname}
        >
            <BrowserRouter>
                <Toaster/>
                <CheckTokenService/>
                <Switch>
                    <Route exact path='/callback' component={Callback}/>
                    <Route exact path='/login' component={Login}/>
                    <PrivateRoute exact path='/friends' component={Friends} loginPath={'/login'}/>
                    <PrivateRoute exact path='/friends/request' component={FriendRequest} loginPath={'/login'}/>
                    <PrivateRoute exact path='/members/search' component={SearchMember} loginPath={'/login'}/>
                    <PrivateRoute exact path='/myshows' component={MyShows} loginPath={'/login'}/>
                    <Route exact path='/show/:id' component={Show} loginPath={'/login'}/>
                    <Route exact path='/shows' component={Shows}/>
                    <PrivateRoute exact path='/profile' component={Profile} loginPath={'/login'}/>
                    <Route exact path='/' component={Home}/>
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;
