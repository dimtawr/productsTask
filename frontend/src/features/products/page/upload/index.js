import React from 'react';
import { errorHandler } from '../../../../lib/errorHandler';
import { reqMedia } from '../../../../lib/request';
import { getAllProductsFx } from '../../api/model';

const Uploader = ({ uid }) => {
  const onFileChange = (event) => {
    const formData = new FormData();

    if (!event.target.files[0]) return errorHandler('Please choose file');
    console.log(event.target.files[0]);
    formData.append(uid, event.target.files[0]);

    reqMedia('POST', 'products', 'image', formData);

    setTimeout(() => {
      getAllProductsFx();
    }, 1000);
  };

  return <input type='file' onChange={onFileChange} />;
};

export default Uploader;
