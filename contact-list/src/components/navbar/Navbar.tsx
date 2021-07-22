import React, { useState, useRef } from "react";
import './Navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Tag from "../tag/Tag";

// https://www.youtube.com/channel/UCPiHaffGYp5JcQ8MzZzgtDg
const Navbar = (props: { handleSearch: (criteria: string) => void }) => {

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState<{ key: number, content: string }[]>([]);
    const key = useRef(0);
    const inputSearchRef = useRef(null);

    const onEnterSearchingCriteria = () => {
        // if (!search) return;

        debugger;
        const kaka = tags.map(t => t.content);
        const criteriaStr = tags.map(t => t.content).join('&criterias=');
        console.log('criteriaStr: ', criteriaStr);
        props.handleSearch(criteriaStr);
    }

    const onDelete = (idTag: number) => {
        const filteredTags = tags.filter(t => t.key !== idTag);
        setTags(filteredTags);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            key.current++;
            setTags([...tags, { key: key.current, content: search }]);
            setSearch('');
            // onEnterSearchingCriteria();
        }
    }

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top">
                <div className="container-fluid">

                    <div className="row p-2">
                        <div className="col-1">
                            <button type="button" className="magnifying"
                                onClick={onEnterSearchingCriteria}>
                                <FontAwesomeIcon icon={faSearch} style={{ fontSize: '1.25rem', color: 'black' }} />
                            </button>
                        </div>
                        <div className="col-10">
                            <div className="collapse navbar-collapse" id="navbarCollapse" onKeyDown={handleKeyDown}>
                                {tags.map(t => (
                                    <Tag key={t.key} idTag={t.key} searchCriteria={t.content} onDeleteClicked={onDelete} />
                                ))}
                                <div>
                                    <input className="form-control me-2" type="text" placeholder="" aria-label="Search"
                                        onChange={e => setSearch(e.target.value)} ref={inputSearchRef} value={search} />
                                </div>

                            </div>
                        </div>
                        <div className="col-1">
                            <button className="btn btn-secondary" type="button" onClick={onEnterSearchingCriteria}>Search</button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
