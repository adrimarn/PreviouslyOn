import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {fetchAPI} from "../services/FetchAPI";
import {useCookies} from "react-cookie";
import Navbar from "../components/Navbar";
import archiveShowButton from "../assets/images/archive.png";

const Show = () => {
    const {id} = useParams();
    const [isFetched, setFetch] = useState(false)
    const [cookies] = useCookies();
    const [show, setShow] = useState([]);
    const token = cookies._auth;

    useEffect(() => {
        fetchAPI.getShow({id, token})
            .then(res => res.json())
            .then((data => {
                setShow(data.show)
                setFetch(true)
            }))
    }, [token, id])
    return (
        <>
            <Navbar/>
            <section className="section">
                <div className="container-fluid px-2">
                    {isFetched && (
                        <div className="columns is-variable is-2-desktop is-centered">
                            <div className="column is-8 is-centered">
                                <div className="title is-5 has-text-centered mt-2 has-text-info">
                                    {show.title}
                                </div>
                                <div className="columns">
                                    <div className="subtitle is-size-7 has-text-grey pl-2 column is-6">
                                        <strong>Genre: </strong>
                                        {Object.keys(show.genres).map((genre, index) => (
                                            <span key={genre}>{(index ? ', ' : '') + genre}</span>
                                        ))}
                                    </div>
                                    <div className="subtitle is-size-7 column is-6 has-text-right">
                                        <span className="mr-1">
                                            Archiver la série
                                        </span>
                                        <Link to={''}>
                                            <img src={archiveShowButton} alt="archive_img"/>
                                        </Link>
                                    </div>
                                </div>
                                <div className="card" style={{height: "auto"}}>
                                    <div className="card-image pt-1 pl-1 has-text-centered">
                                        <img src={show.images.show} alt=""/>
                                    </div>
                                    <div className="content">
                                        <h2 className="subtitle is-size-5 has-text-centered">Résumé</h2>
                                        <p className="is-size-7 pl-2">{show.description}</p>
                                        <div className="columns is-gapless">
                                            <div className="column">
                                                <p className="is-size-7 pl-2"> Nombre d'épisodes: {show.episodes}</p>
                                            </div>
                                            <div className="column">
                                                <p className="is-size-7 pl-2"> Durée d'un épisode: {show.length}min</p>
                                            </div>
                                            <div className="column">
                                                <p className="is-size-7 pl-2"> Nombre de saisons: {show.seasons
                                                }</p>
                                            </div>
                                            <div className="column ml-2">
                                                <p className="is-size-7 has-text-right pr-2"> Note: {Math.floor(show.notes.mean)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>


        </>
    );
};

export default Show;