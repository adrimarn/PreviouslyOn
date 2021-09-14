import React from 'react';
import AddShowButton from "./AddShowButton";
import {Link} from "react-router-dom";
import {useIsAuthenticated} from "react-auth-kit";

const ShowCard = ({show}) => {
    const isAuthenticated = useIsAuthenticated()
    return (
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
                                <p className="is-size-7 has-text-left"> Note: {Math.floor(show.notes.mean)}</p>
                            </div>
                            {isAuthenticated() &&
                            <AddShowButton inAccount={show.in_account} id={show.id}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ShowCard;
