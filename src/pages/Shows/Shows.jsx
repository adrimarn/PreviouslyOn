import React, {useEffect, useState} from 'react';
import Navbar from "../../components/Navbar";
import {useHistory} from "react-router-dom";
import {fetchAPI} from "../../services/FetchAPI";
import {useCookies} from "react-cookie";
import ShowCard from "../../components/ShowCard";
import Loading from "../../components/Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Shows = () => {
    const [cookies] = useCookies();
    const token = cookies._auth
    const [isFetched, setFetch] = useState(false)
    const [shows, setShows] = useState([])
    const [showsOffset, setShowsOffset] = useState(0)
    const history = useHistory()


    const getShows = (offset = 0) => {
        fetchAPI.getShows({order: 'popularity', token, start: offset, limit: 48})
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Something went wrong');
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                setShows(old => [...old, ...data.shows])
                setShowsOffset(offset + 48)
                setFetch(true)
            })
            .catch((error) => {
                console.log(error)
                history.push('/login');
            });
    }
    useEffect(() => {
        getShows()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Navbar/>
            <section className="section">
                <h1 className="has-text-centered is-size-2 mb-3 section__title">Liste des séries</h1>
                <div className="container-fluid px-2">
                    {isFetched ? (
                        <InfiniteScroll next={() => getShows(showsOffset)} hasMore={true}
                                        loader={<p className='has-text-white has-text-centered'>Chargement...</p>}
                                        dataLength={shows.length}>
                            <div className="columns is-multiline">
                                {shows.map((show) => (
                                    <div key={show.id} className="column is-3-desktop is-full-mobile is-6-tablet ">
                                        <ShowCard show={show}/>
                                    </div>
                                ))}
                            </div>
                        </InfiniteScroll>
                    ) : (
                        <Loading color="#F15154"/>
                    )}
                </div>
            </section>
        </>
    );
};
export default Shows;