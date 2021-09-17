import React, {useState} from 'react';
import addShowImg from "../assets/images/add_show.svg";
import removeShowImg from "../assets/images/remove_show.svg";
import {fetchAPI} from "../services/FetchAPI";
import {useCookies} from "react-cookie";
import {toast} from "react-hot-toast";

const AddShowButton = (props) => {
    const [cookies] = useCookies();
    const token = cookies._auth
    const [inAccount, setInAccount] = useState(props.inAccount)

    function addShow(id) {
        return toast.promise(
            fetchAPI.addShow({token, id})
                .then((res => {
                        if (res.ok) {
                            setInAccount(true)
                        }
                    })
                ),
            {
                loading: 'Ajout...',
                success: <b>Série ajoutée</b>,
                error: <b>Échec de l'ajout</b>,
            }, {
                style: {
                    borderRadius: '10px',
                    background: '#2b2b30',
                    color: '#fff',
                    border: '1px solid #d64356',
                },
            }
        );
    }

    function removeShow(id) {
        return toast.promise(
            fetchAPI.removeShow({token, id})
                .then((res => {
                        if (res.ok) {
                            setInAccount(false)
                        }
                    })
                ),
            {
                loading: 'Suppression...',
                success: <b>Série supprimée</b>,
                error: <b>Échec de la suppression</b>,
            }, {
                style: {
                    borderRadius: '10px',
                    background: '#2b2b30',
                    color: '#fff',
                    border: '1px solid #d64356',
                },
            }
        );
    }

    return (
        inAccount ? (
            <div className="column mr-2">
                <span onClick={(e) => {
                    e.preventDefault();
                    removeShow(props.id);

                }}>
                    <p className="has-text-right"><img
                        className="remove_show" src={removeShowImg} alt="Adding show"/></p>
                </span>
            </div>
        ) : (
            <div className="column mr-2">
                <span onClick={(e) => {
                    e.preventDefault();
                    addShow(props.id);

                }}>
                    <p className="has-text-right"><img
                        className="add_show" src={addShowImg} alt="Remove show"/></p>
                </span>
            </div>
        )
    );
};

export default AddShowButton;
