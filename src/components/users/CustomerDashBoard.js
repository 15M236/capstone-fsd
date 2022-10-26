import React, { useEffect , useState} from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import env from '../../environment';
import Table from 'react-bootstrap/Table';
import DisplayItems from '../admin/DisplayItems';
import { useNavigate } from 'react-router-dom'


export default function CustomerDashBoard() {
  let email = sessionStorage.getItem('email');
  const[count , setCount] = useState(0)
  const[bills,setBills] = useState([])
  let navigate = useNavigate()
 
  
  const listbills = async() => {
    let res =await axios.get(`${env.apiUrl}/users/get-bill/${email}`)
    if(res.data.statusCode === 200 ){
      console.log(res.data.result)
      setBills(res.data.result)
      setCount(res.data.result.length)
    }else {
      console.log("No bills found")
    }
  }

  useEffect(() => {
    listbills()
  },[])
  return (
    <div>
      <Button variant="primary" onClick={() => navigate('/users/products')} >List Products</Button>
        <p>Number of Bills Generated : {count}</p>          
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Total Amount</th>
              <th>purchasedAt</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => {
              return ( 
                <tr className='table-row details'>
                  <DisplayItems  value={bill}></DisplayItems>
                  <th>{bill.orderAmount}</th>
                  <th>{bill.purchasedAt}</th>
                </tr>
              )
            })}
          </tbody>
        </Table>
      
    </div>
  )
}
