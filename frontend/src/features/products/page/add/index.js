import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { $products, addProductFx } from '../../api/model';
import { $addShow, changeStateAddModal } from './api';

function ModalAdd() {
  const modal = useStore($addShow);

  const [addedBody, setAddedBody] = useState({
    name: '',
    price: '',
    amount: '',
  });
  const products = useStore($products);

  useEffect(() => {
    changeStateAddModal(false);
    setAddedBody({
      name: '',
      price: '',
      amount: '',
    });
  }, [products]);

  function handlerClose(e) {
    changeStateAddModal(false);
  }

  function handleChange(e) {
    let tmp = addedBody;
    switch (e.target.name) {
      case 'name': {
        setAddedBody({
          name: e.target.value,
          price: tmp.price,
          amount: tmp.amount,
        });
        break;
      }
      case 'amount': {
        setAddedBody({
          name: tmp.name,
          price: tmp.price,
          amount: e.target.value,
        });
        break;
      }
      case 'price': {
        setAddedBody({
          name: tmp.name,
          price: e.target.value,
          amount: tmp.amount,
        });
        break;
      }
      default:
        setAddedBody({
          name: tmp.name,
          price: tmp.price,
          amount: tmp.amount,
        });
    }
  }

  function handleSubmit(e) {
    addProductFx(addedBody);
  }

  return (
    <Modal isOpen={modal}>
      <ModalHeader>Add product</ModalHeader>
      <ModalBody>
        Name: <Input name='name' defaultValue={addedBody.name} onChange={handleChange}></Input>
        {''}
        Price:{' '}
        <Input
          name='price'
          defaultValue={addedBody.price}
          type='number'
          onChange={handleChange}></Input>
        {''}
        Amount:{' '}
        <Input
          name='amount'
          defaultValue={addedBody.amount}
          type='number'
          onChange={handleChange}></Input>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={handleSubmit}>
          Save
        </Button>{' '}
        <Button color='secondary' onClick={handlerClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalAdd;
