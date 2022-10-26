import React, { useEffect , useState} from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import env from '../../environment';
import Table from 'react-bootstrap/Table';
import DisplayItems from './DisplayItems';

export default function AdminDashBoard() {
  const[count , setCount] = useState(0)
  const[bills,setBills] = useState([])
  let navigate = useNavigate()

  const listBills = async() => {
    let token = sessionStorage.getItem('token');
    let res =await axios.get(`${env.apiUrl}/users/get-bills`,{
      headers:{"Authorization":`Bearer ${token}`}
    })
    if(res.data.statusCode === 200 )
    {
      setBills(res.data.bills)
      setCount(res.data.bills.length)
    }else {
      console.log("No bills found")
    }
  }
  useEffect(() => {
    if(sessionStorage.getItem('token')) {
      listBills();
    }else {
      console.log("Not logged in")
    }
  },[])

  return (
  <>
  <div>
        <Button variant="primary" onClick={() => navigate('/users/products')} >List Products</Button>
        <p>Number of Bills Generated : {count}</p>          
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Purchased by</th>
              <th>Total Amount</th>
              <th>purchasedAt</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => {
              return ( 
                <tr className='table-row details'>
                  <DisplayItems  value={bill}></DisplayItems>
                  <th>{bill.email}</th>
                  <th>{bill.orderAmount}</th>
                  <th>{bill.purchasedAt}</th>
                </tr>
              )
            })}
          </tbody>
        </Table>
        
  </div>
  </>
    
  )
}
