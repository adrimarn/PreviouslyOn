import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import {faSearch, faUser, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fetchAPI} from "../services/FetchAPI";
import FriendCard from "../components/FriendCard";
import {useCookies} from "react-cookie";
import Loading from "../components/Loading";
import {toast} from "react-hot-toast";

const SearchMember = () => {
    const [cookies] = useCookies();
    const token = cookies._auth;
    const [needle, setNeedle] = useState('');
    const [users, setUsers] = useState(null);
    const [isFetched, setFetch] = useState(false);
    const [isFetching, setFetching] = useState(false);
    const [isTyping, setTyping] = useState(false);

    useEffect(() => {
        const stopTyping = setTimeout(() => {
            setTyping(false)
            if (needle.length > 2) {
                setFetching(true)
                fetchAPI.searchMember({login: needle, token})
                    .then(res => res.json())
                    .then((data) => {
                        setUsers(data.users)
                        setFetch(true)
                        setFetching(false)
                    })
            }
        }, 500);
        return () => clearTimeout(stopTyping);
    }, [needle, token])

    const handleSearch = (needle) => {
        setTyping(true)
        return setNeedle(needle)
    }

    const emptyFunc = () => {
        return false;
    }

    function addFriend(id, index) {
        return fetchAPI.addFriend({id, token})
            .then(() => {
                const updatedUsers = [...users];
                updatedUsers[index].in_account = true;
                setUsers(updatedUsers);
                toast.success('Ami ajouté',
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#2b2b30',
                            color: '#fff',
                            border: '1px solid #d64356',
                        },
                    }
                );
            });
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
                                <input className="input" type="text" placeholder="Recherche un membre..."
                                       onChange={(e) => handleSearch(e.target.value)}/>
                                <span className="icon is-right">
                                    <FontAwesomeIcon icon={faSearch}/>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                {isFetching ? (
                    <Loading color="#F15154"/>
                ) : (
                    isFetched && (
                        <div className='mt-6'>
                            {users.length !== 0 ?
                                users.map((user, index) => (
                                    user.in_account ?
                                        <FriendCard
                                            key={index}
                                            user={user}
                                            primaryCallback={() => emptyFunc}
                                            primaryIcon={faUser}
                                            primaryText='Ami'
                                            primaryClassName='button is-static'
                                        />
                                        :
                                        <FriendCard
                                            key={index}
                                            user={user}
                                            primaryCallback={() => addFriend(user.id, index)}
                                            primaryIcon={faUserPlus}
                                            primaryText='Ajouter en ami'
                                            primaryClassName='button is-outlined'
                                        />
                                ))
                                : (
                                    needle.length > 2 && isTyping === false && (
                                        <p className='has-text-centered'>Aucun utilisateur correspondant à {needle}</p>
                                    )
                                )
                            }
                        </div>
                    ))}
            </section>
        </>
    );
};

export default SearchMember;