import React, { useState } from "react";
import PropTypes from 'prop-types';

import s from "./Searchbar.module.css";

export default function Searchbar({updateSearchQuery, updateSearchParams, resetState}) {
    const [query, setQuery] = useState('');
    
    const onChange = e => {
        const normalizeQuery = e.target.value.trim().toLocaleLowerCase();
        setQuery(normalizeQuery);
    }

    return (
            <header className={s.header}>
                <a href="index.html"><h1 className={s.mainTitle}>Find.<span>Photo</span></h1></a>
                
                <form className={s.form} onSubmit={e => {
                    e.preventDefault();

                    if (!query) {
                        alert("write down your request");
                        return;
                    }
                resetState();
                updateSearchQuery(query);
                updateSearchParams({ query });
                setQuery('');
                
            }}>
                    

                    <input className={s.input}
                        onChange={onChange}
                    type="text"
                    autoComplete="off"
                    autoFocus
                        placeholder="Search images and photos"
                        value={query}
                    />
                    <button className={s.button} type="submit">
                    Search
                </button>
            </form>
        </header>);
}


Searchbar.propTypes = {
    updateSearchQuery: PropTypes.func,
    resetState: PropTypes.func
}