import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import Callback from "./pages/Callback";
import {AuthProvider, PrivateRoute} from "react-auth-kit";
import Login from "./pages/Login";
import Shows from "./pages/Shows";

function App() {
    return (
        <AuthProvider authType={'cookie'}
                      authName={'_auth'}
                      cookieDomain={window.location.hostname}
        >
            <BrowserRouter>
                <Switch>
                    <Route exact path='/callback' component={Callback}/>
                    <Route exact path='/login' component={Login}/>
                    <PrivateRoute exact path='/shows' component={Shows} loginPath={'/login'}/>
                    <Route exact path='/' component={Home}/>
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;
