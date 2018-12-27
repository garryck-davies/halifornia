import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

import '../../icons8-shopping-bag-filled-100.png';

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
        image=""
        token= {this.onToken}
        stripeKey={process.env.STRIPE_KEY}
        amount={this.state.amount}
    />
    )
  }
}
