import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import {useHistory} from "react-router-dom";
import {fetchAPI} from "../services/FetchAPI";
import {useCookies} from "react-cookie";
import ShowCard from "../components/ShowCard";
import Loading from "../components/Loading";

const Shows = () => {
    const [cookies] = useCookies();
    const token = cookies._auth
    const [isFetched, setFetch] = useState(false)
    const [shows, setShows] = useState([])
    const history = useHistory()

    useEffect(() => {
        fetchAPI.getShows({order: 'popularity', token})
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
                history.push('/login');
            });
    }, [history, token])

    return (
        <>
            <Navbar/>
            <section className="section">
                <h1 className="has-text-centered is-size-2 mb-3 section__title">Liste des séries</h1>
                <div className="container-fluid px-2">
                    {isFetched ? (
                        <div className="columns is-multiline">
                            {shows.map((show) => (
                                <div key={show.id} className="column is-3-desktop is-full-mobile is-6-tablet ">
                                    <ShowCard show={show}/>
                                </div>

                            ))}
                        </div>
                    ) : (
                        <Loading color="#F15154"/>
                    )}
                </div>
            </section>
        </>
    );
};
export default Shows;