import React, {useState} from 'react';
import {Link} from "react-router-dom";
import addShowImg from "../assets/images/add_show.svg";
import removeShowImg from "../assets/images/remove_show.svg";
import {fetchAPI} from "../services/FetchAPI";
import {useCookies} from "react-cookie";

const AddShowButton = (props) => {
    const [cookies] = useCookies();
    const token = cookies._auth
    const [inAccount, setInAccount] = useState(props.inAccount)

    function addShow(id) {
        return fetchAPI.addShow({token, id})
            .then(res => {
                if (res.ok) {
                    setInAccount(true)
                }
            })
    }

    function removeShow(id) {
        return fetchAPI.removeShow({token, id})
            .then(res => {
                if (res.ok) {
                    setInAccount(false)
                }
            })
    }

    return (
        inAccount ? (
            <div className="column mr-2">
                <Link to={''} className="bloop" onClick={(e) => {
                    e.preventDefault();
                    removeShow(props.id);

                }}>
                    <p className="has-text-right"><img
                        className="remove_show" src={removeShowImg} alt="Adding show"/></p>
                </Link>
            </div>
        ) : (
            <div className="column mr-2">
                <Link to={''} className="bloop" onClick={(e) => {
                    e.preventDefault();
                    addShow(props.id);

                }}>
                    <p className="has-text-right"><img
                        className="add_show" src={addShowImg} alt="Remove show"/></p>
                </Link>
            </div>
        )
    );
};

export default AddShowButton;
