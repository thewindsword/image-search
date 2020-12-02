import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import Search from './components/Search';
import {
  searchImageByString
} from './services/api';
import './App.css';
import ImageList from './components/ImageList';

interface T_imageData {
  page: Number;
  pages: Number;
  perpage: Number;
  photo: any[];
  total: String|Number;
}

const App = () => {
  const [imageData: T_imageData, setImageData] = useState(null);
  const [curSearchKey, setCurSearchKey] = useState('');
  const [showMoreBtn, setShowMoreBtn] = useState(false);

  useEffect(() => {
    const checkIsBottom = () => {
      console.log('imageData: ', imageData);
      if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight && imageData) {
        if (imageData.page >= imageData.pages) return;
        setShowMoreBtn(true);
      }
    }
    window.addEventListener('scroll', checkIsBottom);

    return () => {
      window.removeEventListener('scroll', checkIsBottom);
    }
  }, [imageData])

  return (
    <div className="App">
      <main className={imageData ? 'showResultTop' : 'noneResultTop'}>
        <section className="searchWrapper">
          <h1>Flickr image search</h1>
          <Search
            onSearch={async (keyStr) => {
              setCurSearchKey(keyStr);
              const data = await searchImageByString(keyStr)
              setImageData(data.data.photos);
              if (data.data.photos.page === 1) setShowMoreBtn(false); 
            }}
          />
        </section>
        <section className="imageResultWrapper">
          <header>Result{imageData ? `(${imageData.total})` : ''}:</header>
          <ImageList data={imageData}/>
          {showMoreBtn ? (
            <div className="imageResultMore">
              <button onClick={async () => {
                const appendData = await searchImageByString(curSearchKey, imageData.page + 1)
                const newImageData = {
                  ...imageData,
                  photo: imageData.photo.concat(appendData.data.photos.photo),
                  page: imageData.page + 1,
                };
                setImageData(newImageData);
                setShowMoreBtn(false)
              }}>More</button>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}

export default App;
