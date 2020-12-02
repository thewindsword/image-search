import React from 'react';
import styles from './ImageList.module.css';

interface ImageListProps {
  data: any;
}

export default (props: ImageListProps) => {
  if (!props.data) return null;

  const {
    photo,
    total,
    perpage,
    pages,
    page,
  } = props.data;

  return (
    <div className={styles.container}>
      {
        props.data && props.data.photo.map((i:any) => {
          return (<div>
            <img src={`http://farm${i.farm}.static.flickr.com/${i.server}/${i.id}_${i.secret}.jpg`} alt={i.id} title={i.title} />
          </div>)
        })
      }
    </div>
  )
}