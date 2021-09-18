import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const FriendCard = ({
                        user,
                        primaryCallback,
                        secondaryCallback,
                        primaryText,
                        secondaryText,
                        primaryClassName,
                        primaryIcon,
                        secondaryClassName,
                        secondaryIcon,
                    }) => {
    return (
        <div>
            <div className="friend_card mb-3">
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img
                                    src={
                                        user.avatar ??
                                        `https://eu.ui-avatars.com/api/?name=${user.login}`
                                    }
                                    className="is-rounded"
                                    alt="friend_img"
                                />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4">{user.login}</p>
                            <p
                                className="subtitle"
                                style={{color: "rgb(255,214,1)"}}
                            >
                                {user.xp} XP
                            </p>
                        </div>
                        <div className="has-text-right buttons">
                            {primaryCallback && (
                                <button className={primaryClassName}
                                        onClick={primaryCallback}>
                                    <span className="icon is-small">
                                        <FontAwesomeIcon icon={primaryIcon}/>
                                    </span>
                                    <span>{primaryText}</span>
                                </button>
                            )}
                            {secondaryCallback && (
                                <button className={secondaryClassName}
                                        onClick={secondaryCallback}>
                                    <span className="icon is-small">
                                        <FontAwesomeIcon icon={secondaryIcon}/>
                                    </span>
                                    <span>{secondaryText}</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendCard;
