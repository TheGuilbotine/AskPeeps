import { useState } from 'react';
import { Modal } from '../../context/Modal';
import SearchBarDropdown from './SearchBarDropdown';
import './SearchBar.css'

export default function SearchBar() {
    const [showModal, setShowModal] = useState(false);

    const handleOpen = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleClose = (e) => {
        e.preventDefault();
        setShowModal(false);
    };

    return (
        <div className="search__container">
            {showModal &&
                <Modal onClose={handleClose}>
                    <SearchBarDropdown setShowModal={setShowModal}/>
                </Modal>
            }
            {!showModal &&
                <>
                    <input
                        className="navbar-search__input"
                        key="search-bar"
                        placeholder="Search Questions"
                        onFocus={handleOpen}
                    />
                    <i className={"fas fa-search"} onClick={handleOpen}></i>
                </>
            }
        </div>
    );
};
