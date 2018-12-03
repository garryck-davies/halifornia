import React, { Component } from "react";
import axios from 'axios';
import Button from '@material-ui/core/Button';



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

   delete(product_id){
      axios.delete(`/api/shopping_bag_delete/${product_id}`).then((res) => {
          console.log(res.data)
          this.setState({products: res.data})
      })
      console.log(this.state.products) 
    }

    render() {
        

        return(
            <div className="mens-container box-container">
            <div className="mens-all-item-component">
              {this.state.products.map((product, i) => {
                  console.log(product)
                  return (
                      <div className='item-component' key={i}>
                          <img className="product-image" src={product.item_img} alt="img" />
                          <p className="item-name" >{product.item_name}</p>
                          <p>{product.price}</p>
                          <Button onClick={() => this.delete(product.product_id)} style={{backgroundColor: "black", color: "white"}}>Remove from Bag</Button>
                      </div>
                  )
              })}
            </div>
          </div>
        )
    }
}