import React, { Component } from "react";
import axios from 'axios';
import Button from '@material-ui/core/Button';



export default class Mens extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        products: []
      }
    }
  
  
    async componentDidMount() {
     let res = await axios.get('/api/womens')
      console.log(res.data)
      this.setState({products: res.data})
      console.log(this.state.products)
    }
  
    addToBag(product_id) {
      axios.post('/api/addToBag', {
        product_id
      })
    }
    render() {
      return (
        <div className="product-container">
          <div className="product-list">
          {this.state.products.map((product, i) => {
              let { product_id } = product
              return (
                <div className="individual-products" key={i}>
                  <img className="product-img" src={product.item_img} alt='img' />
                  <p id="product-name">{product.item_name}</p>
                  <p id="price">{product.price}</p>
                  <Button id="add" onClick={() => this.addToBag(product_id)} style={{backgroundColor: "black", color: "white"}}>Add To Bag</Button>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  }