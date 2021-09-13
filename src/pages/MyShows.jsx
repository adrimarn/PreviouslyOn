import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import {Link, useHistory} from "react-router-dom";
import {fetchAPI} from "../services/FetchAPI";
import {useCookies} from "react-cookie";
import AddShowButton from "../components/AddShowButton";

const MyShows = () => {
    const [isFetched, setFetch] = useState(false)
    const [cookies] = useCookies();
    const token = cookies._auth
    const [shows, setShows] = useState([])
    const history = useHistory()

    useEffect(() => {
        fetchAPI.getShowsMember({token, order: 'alphabetical', limit: 100})
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Something went wrong');
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                setShows(data.shows)
                setFetch(true)
            })
            .catch((error) => {
                console.log(error)
                //history.push('/login');
            });
    }, [history, token])

    return (
        <>
            <Navbar/>
            <h1 className="has-text-centered is-size-2 mb-3">Mes séries</h1>
            <div className="container-fluid px-2">
                {isFetched ? (
                    <div className="columns is-multiline is-variable is-2-desktop">
                        {shows.map((show) => (
                            <div key={show.id} className="column is-3">
                                <Link to={`/show/${show.id}`}>
                                    <div className="card is-flex show_card" style={{height: "auto"}}>
                                        <div className="card-image pt-1 pl-1">
                                            <img src={show.images.poster} alt=""/>
                                        </div>
                                        <div className="content">
                                            <div className="title is-5 has-text-centered mt-2 has-text-info">
                                                {show.title}
                                            </div>
                                            <div className="subtitle is-size-7 has-text-grey pl-2">
                                                {Object.keys(show.genres).map((genre, index) => (
                                                    <span key={genre}>{(index ? ', ' : '') + genre}</span>
                                                ))}
                                            </div>
                                            <div>
                                                <p className="is-size-7 pl-2">{show.description.substring(0, 150)}...</p>
                                                <div className="columns is-gapless">
                                                    <div className="column ml-2">
                                                        <p className="is-size-7 pr-2"> Note: {Math.floor(show.notes.mean)}</p>
                                                    </div>
                                                    <AddShowButton inAccount={show.in_account} id={show.id}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                        ))}
                    </div>
                ) : (
                    <p>CHARGEMENT...</p>
                )}
            </div>
        </>
    );
};
export default MyShows;