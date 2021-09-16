import React from 'react';
import AddShowButton from "./AddShowButton";
import {Link} from "react-router-dom";
import {useIsAuthenticated} from "react-auth-kit";
import StarRatingComponent from "react-star-rating-component";

const ShowCard = ({show}) => {
    const isAuthenticated = useIsAuthenticated()
    return (
        <Link to={`/show/${show.id}`}>
            <div className="is-flex show_card" style={{height: "auto"}}>
                <div className="card-image pt-1 pl-1">
                    <img src={show.images.poster} alt=""/>
                </div>
                <div className="content">
                    <div className="title is-5 mt-1 pl-2 has-text-white">
                        {show.title.substring(0, 25)}{show.title.length > 25 && '...'}
                    </div>
                    <div className="subtitle is-size-7 text_gradient pl-2">
                        {Object.keys(show.genres).map((genre, index) => (
                            <span key={genre}>{(index ? ', ' : '') + genre}</span>
                        ))}
                    </div>
                    <div>
                        <p className="is-size-7 pl-2 has-text-grey-light">
                            {show.description.substring(0, 150)}
                            {show.description.length > 150 && '...'}</p>
                        <div className="columns is-gapless">
                            <div className="ml-2">
                                <StarRatingComponent
                                    name="score"
                                    editing={false}
                                    starCount={5}
                                    starColor="#f15154"
                                    value={Math.floor(show.notes.mean)}
                                />
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
