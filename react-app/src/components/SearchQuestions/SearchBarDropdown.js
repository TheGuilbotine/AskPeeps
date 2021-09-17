
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { search } from '../../store/search';
import './SearchBar.css';

export default function SearchBarDropdown({ setShowModal }) {
    // const history = useHistory();
    const dispatch = useDispatch();
    const [searchString, setSearchString] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        async function searchOnChange() {
            const searchResults = await dispatch(search(searchString));
            if ("results" in searchResults) {
                setResults(searchResults.results.slice(0, 10));
            } else {
                setResults([]);
            }
        }

        if (searchString.length !== 0) {
            searchOnChange();
        } else {
            setResults([]);
        }
    }, [dispatch, searchString])

    const handleLink = async (e) => {
        e.preventDefault();
        setShowModal(false);
        // TODO: link to place in feed
        // href={#${key_id}}
    };

    return (
        <>
        <div className="search-dropdown__container">
            <input
                className="navbar-search__input"
                value={search}
                type='text'
                placeholder='Search Questions'
                name='search'
                id='search'
                onChange={(e) => setSearchString(e.target.value)}
                autoComplete='off'
                autoFocus
            />
            <i className={"fas fa-search"}></i>
        </div>
        <div className="search-results__container">
            <ul>
                { results.length > 0 && results.map(result => (
                    <li
                        // onClick={(e) => handleLink(e, `/feed/${result.id}`)}
                        key={result.id}
                        className="search__link"
                    >
                        {/* TODO: async this to scroll and then close modal.... onClick={() => setShowModal(false)}  */}
                        <a className="question-link" href={`#${result.id}`}>{result.question}</a>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};
