import React from 'react'

import Form from 'react-bootstrap/Form';
import {useState } from 'react'
import { useParams , useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import env from '../../environment';

export default function AddProduct(props) {
  console.log(props.value)

  let navigate = useNavigate();
  let token = sessionStorage.getItem('token');
  const params = useParams();
  const { id } = params;
  console.log(id)
  const [record , setRecord] = useState({
  productId : 0 ,
  productName : ""  ,
  price : 0,
  imageUrl : "" ,
  quantity : 0
 })

 const { productId, productName, price, imageUrl, quantity} = record

 const handleChange = (e) => {
  setRecord({ ...record, [e.target.name]: e.target.value })
 }
 const handleSubmit = async() => {
  console.log(token+"\n"+env.apiUrl)
  if(productId !== 0 || productName !=="" || price !== 0 || imageUrl !=="" ||  quantity !== 0) {
    if(productId) {
      let result = await axios.put(`${env.apiUrl}/users/add-products/${productId}`,record,{
        headers:{"Authorization":`Bearer ${token}`}
      }).then(data => console.log(data))
      console.log(result)
    }else {
      let result = await axios.post(`${env.apiUrl}/users/add-products`,record,{
        headers:{"Authorization":`Bearer ${token}`}
      }).then(data => console.log(data))
      console.log(result)
      navigate('/users/products')
    }
   
  }else {
    alert("Enter all fields");
  }
 }

  return (
    <>
    <h3>{id ? "Update" : "Add"} Product</h3>
    <Form className='product-form-wrapper'>
      <Form.Group className="form-id" >
        <Form.Control type="number" name="productId" 
        value={productId} onChange={handleChange} placeholder="Product ID" />
      </Form.Group>
      <Form.Group className="form-name" >
        <Form.Control type="text" name="productName" value={productName} onChange={handleChange} placeholder="Product Name" />
      </Form.Group>
      <Form.Group className="form-price">
        <Form.Control type="number" name="price" value={price} onChange={handleChange} placeholder="Product Price" />
      </Form.Group>
      <Form.Group className="form-image">
        <Form.Control type="string" name="imageUrl" value={imageUrl} onChange={handleChange} placeholder="Image URL" />
      </Form.Group>
      <Form.Group className="form-quantity">
        <Form.Control type="number" name="quantity" value={quantity} onChange={handleChange} placeholder="Quantity" />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}>SUBMIT</Button>
    </Form>
    </>
    
  )
}
