import {useCookies} from "react-cookie";


const Token = () => {
    const [cookies] = useCookies();
    return cookies._auth
}

export const authToken = <Token/>