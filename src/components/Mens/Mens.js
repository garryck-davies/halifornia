import React, { Component } from "react";
import axios from 'axios';



export default class Mens extends Component {
    constructor(props) {
        super(props);


        this.state = {
            products: []
        }
    }

   async componentDidMount(){
        let res = await axios.get('/api/products')
        console.log(res)    
    }

    handleAddToBag(item) {
        this.props.updateCart(item)
    }
    

    render() {
        

        return(
            <div className="mens-container box-container">
              <p>Men's</p>
              <div className="mens-all-item-component">
                {this.state.products.map((product, i) => {
                    return (
                        <div className='mens-item-component' key={i}>
                            <img className="mens-product-image" src={product.item_img} alt="img" />
                            <p className="item-name" src={product.item_name} />
                            <p>{product.price}</p>
                            <button onClick={() => this.handleAddToBag()}>Add To Bag</button>
                        </div>
                    )
                })}
              </div>
            </div>
        )
    }
}