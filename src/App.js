import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import Callback from "./pages/Callback";
import {AuthProvider, PrivateRoute} from "react-auth-kit";
import Login from "./pages/Login";
import Shows from "./pages/Shows";
import CheckTokenService from "./services/CheckToken";
import Show from "./pages/Show";

function App() {
    return (
        <AuthProvider authType={'cookie'}
                      authName={'_auth'}
                      cookieDomain={window.location.hostname}
        >
            <BrowserRouter>
                <CheckTokenService/>
                <Switch>
                    <Route exact path='/callback' component={Callback}/>
                    <Route exact path='/login' component={Login}/>
                    <PrivateRoute exact path='/myshows' component={Shows} loginPath={'/login'}/>
                    <PrivateRoute exact path='/show/:id' component={Show} loginPath={'/login'}/>
                    <Route exact path='/' component={Home}/>
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;
