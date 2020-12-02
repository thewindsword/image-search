import React, { useState } from 'react';
import logo from './logo.svg';
import Search from './components/Search';
import {
  searchImageByString
} from './services/api';
import './App.css';
import ImageList from './components/ImageList';

const App = () => {
  const [imageData, setImageData] = useState(null);
  return (
    <div className="App">
      <main>
        <h1>Flickr image search</h1>
        <Search
          onSearch={async (keyStr) => {
            console.log(keyStr);
            const data = await searchImageByString(keyStr)
            setImageData(data.data.photos);
          }}
        />
        <section className="imageResultWrapper">
          <header>Result{imageData ? `(${imageData.total})` : ''}:</header>
          <ImageList data={imageData} />
        </section>
      </main>
    </div>
  );
}

export default App;
