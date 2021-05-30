import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { $products, editProductFx } from '../../api/model';
import { $editElement, $editShow, changeStateEditModal } from './api';

function ModalEdit() {
  const modal = useStore($editShow);
  const edited = useStore($editElement);

  const [editedBody, seteditedBody] = useState(edited);
  const products = useStore($products);

  useEffect(() => {
    changeStateEditModal(false);
  }, [products]);

  useEffect(() => {
    seteditedBody(edited);
  }, [edited]);

  function handlerClose(e) {
    changeStateEditModal(false);
  }

  function handleChange(e) {
    let tmp = editedBody;
    switch (e.target.name) {
      case 'name': {
        seteditedBody({
          uid: tmp.uid,
          name: e.target.value,
          price: tmp.price,
          amount: tmp.amount,
        });
        break;
      }
      case 'amount': {
        seteditedBody({
          uid: tmp.uid,
          name: tmp.name,
          price: tmp.price,
          amount: e.target.value,
        });
        break;
      }
      case 'price': {
        seteditedBody({
          uid: tmp.uid,
          name: tmp.name,
          price: e.target.value,
          amount: tmp.amount,
        });
        break;
      }
      default: {
        seteditedBody({
          uid: tmp.uid,
          name: tmp.name,
          price: tmp.price,
          amount: tmp.amount,
        });
      }
    }
  }

  function handleSubmit(e) {
    editProductFx(editedBody);
  }

  return (
    <Modal isOpen={modal}>
      <ModalHeader>Edit product</ModalHeader>
      <ModalBody>
        Name: <Input name='name' defaultValue={editedBody.name} onChange={handleChange}></Input>
        Price:{' '}
        <Input name='price' defaultValue={editedBody.price} type='number' onChange={handleChange} />
        Amount:{' '}
        <Input
          name='amount'
          defaultValue={editedBody.amount}
          type='number'
          onChange={handleChange}
        />
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

export default ModalEdit;
