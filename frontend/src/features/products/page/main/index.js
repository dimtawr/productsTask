import { useCallback, useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { $products, deleteProductFx, getAllProductsFx } from '../../api/model';
import { Button, Input, Row, Table } from 'reactstrap';
import ModalAdd from '../add';
import { changeStateAddModal } from '../add/api';
import ComponentChanger from '../search';
import ModalEdit from '../edit';
import { changeStateEditElement, changeStateEditModal } from '../edit/api';

const ProductsMainPage = () => {
  const [products, setProducts] = useState([]);
  const productsStore = useStore($products);
  const [nameSortFlag, setNameSortFlag] = useState(true);
  const [priceSortFlag, setPriceSortFlag] = useState(true);
  const [amountSortFlag, setAmountSortFlag] = useState(true);
  const [typeSerachLine, setTypeSearchLine] = useState('name');

  const AddModalComponent = ModalAdd();
  const EditModalComponent = ModalEdit();

  useEffect(() => {
    getAllProductsFx();
  }, []);

  useEffect(() => {
    if (productsStore) setProducts(productsStore);
  }, [productsStore]);

  function handleClickName(e) {
    e.preventDefault();
    if (nameSortFlag) {
      setProducts(products.sort((a, b) => (a.name > b.name ? 1 : -1)));
      setNameSortFlag(false);
    } else {
      setProducts(products.sort((a, b) => (a.name > b.name ? -1 : 1)));
      setNameSortFlag(true);
    }
  }

  function handleClickPrice(e) {
    e.preventDefault();
    if (priceSortFlag) {
      setProducts(products.sort((a, b) => (a.price > b.price ? 1 : -1)));
      setPriceSortFlag(false);
    } else {
      setProducts(products.sort((a, b) => (a.price > b.price ? -1 : 1)));
      setPriceSortFlag(true);
    }
  }

  function handleClickAmount(e) {
    e.preventDefault();
    if (amountSortFlag) {
      setProducts(products.sort((a, b) => (a.price > b.price ? 1 : -1)));
      setAmountSortFlag(false);
    } else {
      setProducts(products.sort((a, b) => (a.price > b.price ? -1 : 1)));
      setAmountSortFlag(true);
    }
  }

  const handleDeleteClick = useCallback((uid) => {
    deleteProductFx(uid);
  }, []);

  function handleChangeSelector(e) {
    setTypeSearchLine(e.target.value);
  }

  function handleOpenModalAdd(e) {
    e.preventDefault();
    changeStateAddModal(true);
  }

  const handleOpenModalEdit = useCallback((element) => {
    changeStateEditElement(element);
    changeStateEditModal(true);
  }, []);

  return (
    <>
      {AddModalComponent}
      {EditModalComponent}
      <div className='product-table-container'>
        <Row className='product-table-support-line'>
          <div className='product-table-support-line-form-container'>
            <Input
              type='select'
              onChange={handleChangeSelector}
              className='product-table-support-line-form-container-selector'>
              <option value='name'>Name strict</option>
              <option value='nameLike'>Name unstrict</option>
              <option value='inStock'>In stock</option>
              <option value='price'>Price</option>
            </Input>
            {ComponentChanger(typeSerachLine)}
          </div>
          <Button className='product-table-support-line-button' onClick={handleOpenModalAdd}>
            ➕
          </Button>
        </Row>
        <div className='product-table-container-scroll'>
          <Table bordered dark>
            <thead>
              <tr>
                <th>
                  <div onClick={handleClickName}>Name</div>
                </th>
                <th>
                  <div onClick={handleClickPrice}>Price</div>
                </th>
                <th>
                  <div onClick={handleClickAmount}>Amount</div>
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((element) => (
                <tr key={element.uid}>
                  <th>{element.name}</th>
                  <th>{element.price}</th>
                  <th>{element.amount}</th>
                  <th>
                    <Button onClick={() => handleOpenModalEdit(element)}>✎</Button>
                  </th>
                  <th>
                    <Button onClick={() => handleDeleteClick(element.uid)}>🗑</Button>
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ProductsMainPage;
