import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import AuthorizationCodeExample from "./Authorization";
import Callback from "./pages/Callback";

function App() {
    return (
        <BrowserRouter>
            <AuthorizationCodeExample/>
            <Switch>
                <Route exact path='/callback' component={Callback}/>
                <Route path='/' component={Home}/>
            </Switch>
        </BrowserRouter>
    )
}

export default App;
