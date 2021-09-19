import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchAPI} from "../../services/FetchAPI";
import {useCookies} from "react-cookie";
import Navbar from "../../components/Navbar";
import ArchiveLink from "../../components/ArchiveLink";

const Show = () => {
    const {id} = useParams();
    const [isFetched, setFetch] = useState(false)
    const [cookies] = useCookies();
    const token = cookies._auth;
    const [show, setShow] = useState([]);

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
                                <h1 className="section__title_wl is-size-2 has-text-centered mt-2">
                                    {show.title}
                                </h1>
                                <div className="columns">
                                    <div className="is-size-7 has-text-white pl-2 column is-6">
                                        <span className='has-text-weight-bold'>Genre: </span>
                                        <span className='text_gradient'>
                                            {Object.keys(show.genres).map((genre, index) => (
                                                <span key={genre}>{(index ? ', ' : '') + genre}</span>
                                            ))}
                                        </span>
                                    </div>
                                    <div className="text_primary is-size-7 column is-6 has-text-right">
                                        <ArchiveLink id={show.id} isArchived={show.user.archived}
                                                     inAccount={show.in_account}/>
                                    </div>
                                </div>
                                <div style={{height: "auto"}}>
                                    <div className="card-image pt-1 pl-1 has-text-centered">
                                        <img src={show.images.show} alt=""/>
                                    </div>
                                    <div className="content">
                                        <h2 className="section__subtitle is-size-5 has-text-centered">Résumé</h2>
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