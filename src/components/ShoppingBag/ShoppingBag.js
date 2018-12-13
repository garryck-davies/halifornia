import React, { Component } from "react";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import StripeCheckout from '../Checkout/Checkout';



export default class ShoppingBag extends Component {
    
    state = {
        products: [],
        quantity: 1,
        amount: 0
    }


    async componentDidMount(){
        let res = await axios.post('/api/bag')
        console.log(res.data)
        this.setState({products: res.data, quantity: res.data[0].bag_quantity})
        console.log(this.state.products)    
    }

   removeProduct(product_id){
      axios.delete(`/api/removeProduct/${product_id}`).then((res) => {
          console.log(res.data)
          this.setState({products: res.data})
      })
      console.log(this.state.products) 
    }

    decreaseQuantity(quantity, product_id) {
        axios.put(`/api/editQuantity/${quantity}`, {product_id}).then((res) => {
            console.log(this.state.quantity)
            this.setState({products: res.data})
        })
    }

    increaseQuantity(quantity, product_id) {
        axios.put(`/api/editQuantity/${quantity}`, {product_id}).then((res) => {
            console.log(this.state.quantity)
            this.setState({products: res.data})
        })
    }


    render() {
        return (
          <div className="product-container">
            <div className="product-container">
            <div className="product-list">
              {this.state.products.map((product, i) => {
                let { product_id } = product
                return (
                  <div className="individual-products" key={i}>
                    <img className="product-img" src={product.item_img} alt='img' />
                    <p id="product-name">{product.item_name}</p>
                    <p id="price">{product.price}</p>
                    <Button id="add" onClick={() => this.removeProduct(product_id)} style={{backgroundColor: "black", color: "white"}}>Remove from Bag</Button>
                      <div id="quantity">
                          <div className='counter'>{product.bag_quantity}</div>
                          <button onClick={() => this.decreaseQuantity(this.state.quantity -1, product_id)}>-</button>
                          <button onClick={() => this.increaseQuantity(this.state.quantity +1, product_id)}>+</button>
                      </div>
                      </div>
                      )
                    })}
                      </div>
                      <div id="checkout">
                        <StripeCheckout />
                      </div>
          </div>
          </div>
        )
  }
}