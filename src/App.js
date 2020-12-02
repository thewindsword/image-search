import React, { useState, useEffect, useReducer } from 'react';
import logo from './logo.svg';
import Search from './components/Search';
import {
  searchImageByString
} from './services/api';
import './App.css';
import ImageList from './components/ImageList';
import { ContextStore } from './store/index';

interface T_imageData {
  page: Number;
  pages: Number;
  perpage: Number;
  photo: any[];
  total: String|Number;
}

function reducer(state, action) {
  console.log('action: ', action);
  switch (action.type) {
    case 'setLoading':
      return { loadingStatus: true };
    case 'setComplete':
      return { loadingStatus: false };
    default:
      throw new Error();
  }
}

const App = () => {
  // const { loadingStatus } = React.useContext(ContextStore);
  const [{ loadingStatus }, dispatch] = useReducer(reducer, { loadingStatus: false })
  console.log('loadingStatus: ', loadingStatus);
  const [imageData: T_imageData, setImageData] = useState(null);
  const [curSearchKey, setCurSearchKey] = useState('');
  const [showMoreBtn, setShowMoreBtn] = useState(false);

  useEffect(() => {
    const checkIsBottom = () => {
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
    <div className={`App ${loadingStatus ? 'loading' : ''}`}>
      <main className={imageData ? 'showResultTop' : 'noneResultTop'}>
        <section className="searchWrapper">
          <h1>Flickr image search</h1>
          <Search
            onSearch={async (keyStr) => {
              setCurSearchKey(keyStr);
              dispatch({ type: 'setLoading' });
              const data = await searchImageByString(keyStr)
              dispatch({ type: 'setComplete' });
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
                dispatch({ type: 'setLoading' });
                const appendData = await searchImageByString(curSearchKey, imageData.page + 1);
                dispatch({ type: 'setComplete' });
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
