import React from 'react'

import {CartContext} from '../../App';
import { useContext , useEffect , useState} from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import env from '../../environment';
import {  useNavigate} from 'react-router-dom';

export default function Cart() {
  let context = useContext(CartContext);
  console.log(context.cart)
  let email = sessionStorage.getItem('email')
  const[total , setTotal] = useState(0)
  const navigate = useNavigate("")
  const handleSubmit = async() => {
    try {
      let res =  await axios.post(`${env.apiUrl}/users/add-bill`,{
        orderItems : context.cart,
        email : email ,
        orderAmount : total 
      })
      if(res.data.statusCode === 200) {
        context.setCart([])
        navigate('/users/products')
      }
    }catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    let sum = 0
    for(var i in context.cart)
    {
        sum += context.cart[i].price
    }
    setTotal(sum)
  },[context.cart])
  return (
    <div>

      {context.cart.map((product) => {
        return (
        <ol>
          <li>Name : {product.productName}</li>
          <li>Price : {product.price}</li>
        </ol>
        )
      })}
      <p>Total Price : {total}</p>
      <p>Add Bill to {email}</p>
      <Button variant="primary" onClick={handleSubmit}>Purchase</Button>
      
    </div>
  )
}
