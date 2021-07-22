import React from "react";
import './Tag.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Tag = (props: { idTag: number, searchCriteria: string, onDeleteClicked: (criteria: number) => void }) => {

    return (
        <div className="tag mr-2 p-2 pl-3 pr-2">
            <span>{props.searchCriteria}</span>
            <button onClick={() => props.onDeleteClicked(props.idTag)}>
                <FontAwesomeIcon icon={faTimes}
                    style={
                        {
                            fontSize: '1rem', color: 'white', cursor: 'pointer', width: '16px', backgroundColor: '#7A7A7A',
                            borderRadius: '50%'
                        }
                    } />

            </button>

        </div>
    );
}

export default Tag;