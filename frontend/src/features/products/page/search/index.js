import { useEffect, useState } from 'react';
import { Button, Input } from 'reactstrap';
import {
  findByProductNameFx,
  findByProductNameLikeFx,
  findProductsByPriceRangeFx,
  getAllProductsFx,
  productsInStockFx,
} from '../../api/model';

function ComponentChanger(type) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue('');
  }, [type]);

  useEffect(() => {
    if (value === '') getAllProductsFx();
  }, [value, type]);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleChangePrice(e) {
    if (e.target.name === 'after') {
      value.before
        ? setValue({
            after: e.target.value,
            before: value.before,
          })
        : setValue({
            after: e.target.value,
          });
    }
    if (e.target.name === 'before') {
      value.after
        ? setValue({
            after: value.after,
            before: e.target.value,
          })
        : setValue({
            before: e.target.value,
          });
    }
  }

  function handleSearchName(e) {
    findByProductNameFx(value);
  }

  function handleSearchNameLike(e) {
    findByProductNameLikeFx(value);
  }

  function handleSearchInStock(e) {
    productsInStockFx();
  }

  function handleSearchPrice(e) {
    findProductsByPriceRangeFx(value);
  }

  switch (type) {
    case 'name': {
      return (
        <>
          <Input onChange={handleChange} value={value} />
          <Button className='product-table-support-line-button' onClick={handleSearchName}>
            🔎
          </Button>
        </>
      );
    }
    case 'nameLike': {
      return (
        <>
          <Input onChange={handleChange} value={value} />
          <Button className='product-table-support-line-button' onClick={handleSearchNameLike}>
            🔎
          </Button>
        </>
      );
    }
    case 'inStock': {
      return (
        <Button className='product-table-support-line-button' onClick={handleSearchInStock}>
          🔎
        </Button>
      );
    }
    case 'price': {
      return (
        <div className='product-table-support-line-price'>
          <Input placeholder='from' name='after' type='number' onChange={handleChangePrice} />{' '}
          <Input placeholder='to' name='before' type='number' onChange={handleChangePrice} />
          <Button className='product-table-support-line-button' onClick={handleSearchPrice}>
            🔎
          </Button>
        </div>
      );
    }
    default:
      return <></>;
  }
}

export default ComponentChanger;
