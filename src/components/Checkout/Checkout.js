import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

export default class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: 5000
        }
    }

    onToken = (token) => {
        token.card = void 0
        axios.post('/api/checkout', {token, amount: this.state.amount}).then(res => {
            console.log(res)
        })
    }

    
  render() {
    return (
    <StripeCheckout
        name="Purchase Items"
        description="Making It Rain"
        image="https://s3.us-east-2.amazonaws.com/haliforniaapparelwebsite/supermarket-bag.svg"
        token= {this.onToken}
        stripeKey={process.env.STRIPE_KEY}
        amount={this.state.amount}
    />
    )
  }
}
