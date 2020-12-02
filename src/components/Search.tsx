import React, { useState } from 'react';
import styles from './Search.module.css';

interface SearchProps {
  onSearch: Function;
}

export default (props: SearchProps) => {
  const [searchText, setSearchText] = useState('');
  return (
    <div className={styles.container}>
      <input type="search" value={searchText} onChange={e => {setSearchText(e.target.value)}} onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          props.onSearch(searchText);
        }
      }}/>
      <button onClick={() => {
        props.onSearch(searchText);
      }}>Search</button>
    </div>
  )
}