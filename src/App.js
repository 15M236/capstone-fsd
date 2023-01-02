import {Routes , Route, BrowserRouter} from 'react-router-dom';
import AdminDashBoard from './components/admin/AdminDashBoard'
import AddProduct from './components/admin/AddProduct'
import Products from  './components/users/Products'
import Cart from './components/users/Cart'
import Login from './components/users/Login'
import SignUp from './components/users/SignUp'
import CustomerDashBoard from './components/users/CustomerDashBoard'
import Title from './Title';
import './App.css';
import React , {useState} from 'react';
export const CartContext = React.createContext();

function App() {
  let [cart,setCart] = useState([])
  

  return (
    <div className="App">
      <CartContext.Provider value={{cart,setCart}}>
      <BrowserRouter>
      <Title/>
        <Routes>
          <Route path="/customerDashboard" element={<CustomerDashBoard/>}/>
          <Route path="/adminDashboard" element={<AdminDashBoard/>}/>
          <Route path="/users/products" element={<Products/>}/>
          <Route path="/admin/add-product" element={<AddProduct/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signin" element={<SignUp/>}/>
        </Routes>
        </BrowserRouter>
      </CartContext.Provider>
      
    </div>
  );
}

export default App;
