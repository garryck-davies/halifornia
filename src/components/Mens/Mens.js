import React, { Component } from "react";




export default class Mens extends Component {
    constructor(props) {
        super(props);


        this.state = {
            products: []
        }
    }

    componentDidMount(){
        
    }
    render() {
        

        return(
            <div className="mens-container box-container">
                Mens
            </div>
        )
    }
}