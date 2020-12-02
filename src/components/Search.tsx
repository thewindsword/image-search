import React, { useState } from 'react';
import styles from './Search.module.css';

interface SearchProps {
  onSearch: Function;
}

export default (props: SearchProps) => {
  const [searchText, setSearchText] = useState('');
  return (
    <div className={styles.container}>
      <input type="search" value={searchText} onChange={e => {setSearchText(e.target.value)}}/>
      <button onClick={() => {
        props.onSearch(searchText);
      }}>Search</button>
    </div>
  )
}