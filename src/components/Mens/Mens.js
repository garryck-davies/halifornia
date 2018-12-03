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

   async componentDidMount(){
        let res = await axios.get('/api/products')
        console.log(res.data)
        this.setState({products: res.data})
        console.log(this.state.products)    
    }

    async handleAddToBag(product_id) {
        let res = await axios.post('/api/addToBag', {
            product_id
        })
        console.log(res.data)
    }
    

    render() {
    

        return(
            <div className="mens-container box-container">
              <div className="mens-all-item-component">
                {this.state.products.map((product, i) => {
                    console.log(product)
                    let {product_id} = product
                    return (
                        <div className='item-component' key={i}>
                            <img className="mens-product-image" src={product.item_img} alt="img" />
                            <p className="item-name" >{product.item_name}</p>
                            <p>{product.price}</p>
                            <Button onClick={() => this.handleAddToBag(product_id)} style={{backgroundColor: "black", color: "white"}}>Add To Bag</Button>
                        </div>
                    )
                })}
              </div>
            </div>
        )
    }
}