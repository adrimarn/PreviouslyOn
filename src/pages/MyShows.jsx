import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import {useHistory} from "react-router-dom";
import {fetchAPI} from "../services/FetchAPI";
import {useCookies} from "react-cookie";
import ShowCard from "../components/ShowCard";

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
                                <ShowCard show={show}/>
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