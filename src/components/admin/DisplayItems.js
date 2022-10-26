import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DisplayItems(props) {
    console.log(props.value.orderItems)
    const [show, setShow] = useState(false);
    // console.log(props.value.billId)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
       <Button variant="primary" onClick={handleShow}>
        {props.value.billId}
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Order Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.value.orderItems.map((orderItem) => {
            return (
                <>
                <p>{orderItem.productName}</p>
                </>
            )
        })}</Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
  )
}

