import React , {useState , useEffect , useContext} from 'react'
import axios from 'axios';
import env from '../../environment';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import { Archive , Trash } from 'react-bootstrap-icons';
import AddProduct from '../admin/AddProduct';
import {CartContext} from '../../App';

export default function Products() {
  const[products , setProducts] = useState([])
  const[session,setSession] = useState("Products")
  let context = useContext(CartContext);
  const navigate = useNavigate()
  let role = sessionStorage.getItem('role');
  let token = sessionStorage.getItem('token');
  const img = "https://via.placeholder.com/150"
  
  const listProducts = async() =>{
    if(sessionStorage.getItem('token')) {
      let token = sessionStorage.getItem('token');
    let res =await axios.get(`${env.apiUrl}/users/products`,{
      headers:{"Authorization":`Bearer ${token}`}
    })
    if(res.data.statusCode === 200 )
    {
      setProducts(res.data.products)
    }
    else
    {
      navigate('/login')
    }
    }
      else {
        setSession("Not logged in")
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      }
  }
  useEffect(() => { 
      listProducts();
  },)
  const handleEdit = (product) => {
    return <>
      <AddProduct value={product}/>
      </>
    
  }

  const handleDelete = async(id) => {
    console.log(id)
    let res =await axios.delete(`${env.apiUrl}/users/delete/${id}`,{
      headers:{"Authorization":`Bearer ${token}`}
    });
    console.log(res)
    listProducts();
  }

  const handleAddProduct = async(product) => {
    let newArray = [...context.cart]
    newArray.push(product);
    context.setCart(newArray);
  }
  return (
    <div>
      <h1>{session}</h1>
      {role === "admin" && <Button variant="primary" onClick={() => navigate("/admin/add-product")}>Add Product</Button>}
      {products.map((product,i) => {
        return <div className='card-wrapper' key={i}>
          <div className='card-image'>
                <img src={product.imageUrl?product.imageUrl:img} alt="" width={"150px"} height={"150px"}></img>
          </div>
          <div className='card-details'>
                <h2>{product.name}</h2>
                <h4>&#8377; {product.price}</h4>
                <div>Available : {product.quantity}</div>
                <div>
                  {role === "customer" ? 
                  <Button onClick={()=>handleAddProduct(product)}>Add to Cart</Button> : null
                  }
                  {role === "admin" ? 
                  <>
                  <Archive onClick={() => { 
                    handleEdit(product)}} /> 
                  <Trash onClick={() => {
                    handleDelete(product._id)}} />
                  </>: null}
                </div>
              </div>
        </div>
      })}
    </div>
  )
}
