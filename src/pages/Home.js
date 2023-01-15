import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Piechart from '../components/Piechart';


const Home = () => {
    const [prodData, setProdData] = useState([])
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(null)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const getData = ()=>{
        axios.get('https://fakestoreapi.com/products')
        .then((res)=>{
            const data  = res.data
            
            setProdData(data)
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    const getCategoryData = ()=>{
        axios.get('https://fakestoreapi.com/products/categories')
        .then((res)=>{
            const data  = res.data
            
            setCategories(data)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
getData();
getCategoryData();
    },[])
  return (
    <>
 <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">MyApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Select Category" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={()=> setCategory(null)} href="">All Products</NavDropdown.Item>
                {categories.map((category,index)=> <NavDropdown.Item key={index} onClick={()=> setCategory(category)} href="">{category}</NavDropdown.Item>)}
              
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>    
    <div className="main-container">
        {!category ? 
        prodData.map((data,index)=> <ProductCard key={index} data={data} />)
    :
    prodData.filter((prod)=> prod.category===category).map((data,index)=> <ProductCard key={index} data={data} />)
    }
        
    </div>
    <button onClick={handleShow} className="analyse-btn">ANALYSE</button>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Categories in Catalogue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Piechart categories={categories} prodData={prodData} />
        </Modal.Body>
  
      </Modal>
    </>
  )
}

export default Home