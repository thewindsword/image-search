import axios from 'axios';

interface imageDataResult {
  photos: any[];
  stat: string;
}

export const searchImageByString = async (searchKey: string) => {
  const res = await axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3e7cc266ae2b0e0d78e279ce8e361736&format=json&nojsoncallback=1&safe_search=1&text=kittens');
  return res;
}