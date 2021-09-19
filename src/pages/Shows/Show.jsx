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
    const [episodes, setEpisodes] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(1);

    useEffect(() => {
        fetchAPI.getShow({id, token})
            .then(res => res.json())
            .then((data => {
                setShow(data.show)
                getEpisodes(selectedSeason)
                setFetch(true)
            }))
        // eslint-disable-next-line
    }, [token, id, selectedSeason])

    const getEpisodes = async (season) => {
        fetchAPI.getEpisodes({id, token, season})
            .then((res) => res.json())
            .then((data) => {
                const episodesList = data.episodes
                setEpisodes(episodesList)
                episodesList.map((episode, index) => {
                    return fetchAPI.getEpisodePicture({id: episode.id})
                        .then((res) => {
                            // retrieves episode picture from API
                            const updatedEpisodes = [...episodesList];
                            updatedEpisodes[index].picture = res.url;
                            setEpisodes(updatedEpisodes);
                        })

                })
            })
    }

    const showEpisode = (season) => {
        const filterSeason = episodes.filter((item) => item.season = season);
        return filterSeason.map((episode) => {
                return (
                    <div onLoad={() => getEpisodes} className="column is-3-desktop is-full-mobile is-6-tablet">
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <img src={episode.picture}
                                     alt={episode.title}/>
                            </figure>
                        </div>

                        <div className="content">
                            <p className="title is-5 mt-1 has-text-white">{episode.title}</p>
                            <p className="is-size-7 has-text-grey-light">
                                {episode.description.substring(0, 150)}
                                {episode.description.length > 150 && '...'}
                            </p>
                            <ul className='card__list'>
                                <li>{episode.code}</li>
                            </ul>
                        </div>
                    </div>
                )
            }
        )
    }

    const selectSeason = () => {
        let nbSeason = show.seasons;
        let option = []
        for (let i = 1; i <= nbSeason; i++) {
            option[i] = <option value={i}>Saison {i}</option>
        }
        if (nbSeason > 1) {
            return (
                <div className='column is-full-mobile is-2'>
                    <div className="select is-fullwidth">
                        <select value={selectedSeason} onChange={handleChange} id="season-select">
                            {option}
                        </select>
                    </div>
                </div>
            )
        }
    }

    const handleChange = (e) => {
        setSelectedSeason(e.target.value)
    }


    return (
        <>
            <Navbar/>
            <section className="section">
                {isFetched && (
                    <div className="container-fluid px-2">
                        <div className="columns is-variable is-2-desktop is-centered">
                            <div className="column is-8 is-centered">
                                <h1 className="section__title_wl is-size-2 has-text-centered mt-2">
                                    {show.title}
                                </h1>
                                {show.platforms &&
                                <div>
                                    <p className='has-text-grey-light is-size-7 mb-1'>Disponible sur : </p>
                                    <ul className='card__list'>
                                        {show.platforms.svods.map((svod) => {
                                            return <li>{svod.name}</li>
                                        })}
                                    </ul>
                                </div>}
                                <br/>
                                <div className="columns">
                                    <div className="is-size-7 has-text-white column is-6">
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
                                                <p className="is-size-7 pl-2"> Nombre
                                                    d'épisodes: {show.episodes}</p>
                                            </div>
                                            <div className="column">
                                                <p className="is-size-7 pl-2"> Durée d'un
                                                    épisode: {show.length}min</p>
                                            </div>
                                            <div className="column">
                                                <p className="is-size-7 pl-2"> Nombre de
                                                    saisons: {show.seasons
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
                        <div>
                            <h2 className="section__subtitle is-size-5 has-text-centered mb-5">Liste des épisodes</h2>
                            {selectSeason()}
                            <div className="columns is-multiline">
                                {showEpisode(selectedSeason)}
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default Show;