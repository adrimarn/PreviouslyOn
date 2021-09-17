import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import {faBan, faCheck, faCheckSquare, faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fetchAPI} from "../services/FetchAPI";
import FriendCard from "../components/FriendCard";


const SearchMember = () => {
    const [needle, setNeedle] = useState('');
    const [users, setUsers] = useState(null);
    const [isFetched, setFetch] = useState(false);

    useEffect(() => {
        if (needle.length > 2) {
            fetchAPI.searchMember({login: needle})
                .then(res => res.json())
                .then((data) => {
                    setUsers(data.users)
                    setFetch(true)
                })
        }
    }, [needle])

    const handleSearch = (needle) => {
        return setNeedle(needle)
    }

    return (
        <>
            <Navbar/>
            <section className="section">
                <h1 className="has-text-centered is-size-2 mb-3 section__title">Rechercher un membre</h1>
                <div className="dropdown is-active is-flex is-justify-content-center">
                    <div className="dropdown-trigger">
                        <div className="field">
                            <p className="control is-expanded has-icons-right">
                                <input className="input" type="search" placeholder="Search..."
                                       onChange={(e) => handleSearch(e.target.value)}/>
                                <span className="icon is-right">
                                    <FontAwesomeIcon icon={faSearch}/>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                {isFetched && (
                    <div className='mt-6'>
                        {users.length !== 0 ?
                            users.map((user) => (
                                <FriendCard user={user}
                                            primaryCallback={''}
                                            primaryIcon={faCheck}
                                            primaryText='Ajouter en ami'
                                            primaryClassName='button is-outlined'
                                />
                            ))
                            : (
                                    needle.length !== 0 && (
                                        <p className='has-text-centered'>Aucun utilisateur correspondant à {needle}</p>
                                    )
                            )
                        }
                            </div>)}
                    </section>
                    </>
                    );
                };

                export default SearchMember;