import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import Callback from "./pages/Callback";
import {AuthProvider} from "react-auth-kit";

function App() {
    return (
        <AuthProvider authType={'cookie'}
                      authName={'_auth'}
                      cookieDomain={window.location.hostname}
        >
            <BrowserRouter>
                <Switch>
                    <Route exact path='/callback' component={Callback}/>
                    <Route exact path='/' component={Home}/>
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;
