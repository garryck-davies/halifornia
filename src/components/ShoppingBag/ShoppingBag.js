import React, { Component } from "react";
import axios from 'axios';




export default class ShoppingBag extends Component {
    
    state = {
        products: [],
        quantity: 0
    }


    async componentDidMount(){
        let res = await axios.post('/api/shopping_bag')
        console.log(res.data)
        this.setState({products: res.data})
        console.log(this.state.products)    
    }

    render() {
        

        return(
            <div className="mens-container box-container">
            <div className="mens-all-item-component">
              {this.state.products.map((product, i) => {
                  return (
                      <div className='mens-item-component' key={i}>
                          <img className="mens-product-image" src={product.item_img} alt="img" />
                          <p className="item-name" >{product.item_name}</p>
                          <p>{product.price}</p>
                      </div>
                  )
              })}
            </div>
          </div>
        )
    }
}