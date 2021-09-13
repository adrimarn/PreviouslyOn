import React, {useState} from "react";
import archiveShowButton from "../assets/images/archive.png";
import {fetchAPI} from "../services/FetchAPI";
import {useCookies} from "react-cookie";
import {Link} from "react-router-dom";

const ArchiveLink = (props) => {
    const [isArchived, setArchived] = useState(props.isArchived)
    const [cookies] = useCookies();
    const token = cookies._auth;

    function archive(id) {
        fetchAPI.archiveShow({id, token})
            .then(res => {
                if (res.ok) {
                    setArchived(true)
                }
            })
    }

    function unarchive(id) {
        fetchAPI.unarchiveShow({id, token})
            .then(res => {
                if (res.ok) {
                    setArchived(false)
                }
            })
    }

    return (
        <div>
            {props.inAccount && (
                isArchived ? (
                    <Link to={'#unarchive'} onClick={(e) => {
                        e.preventDefault()
                        unarchive(props.id)
                    }}>
                        <span className="mr-1">Désarchiver la série</span>
                        <img src={archiveShowButton} alt="archive_img"/>
                    </Link>
                ) : (
                    <Link to={'#archive'} onClick={(e) => {
                        e.preventDefault()
                        archive(props.id)
                    }}>
                        <span className="mr-1">Archiver la série</span>
                        <img src={archiveShowButton} alt="archive_img"/>
                    </Link>
                )
            )}
        </div>
    );
};

export default ArchiveLink;

