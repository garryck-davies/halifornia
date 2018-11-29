import React, { Component, Fragment } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// import './Login.scss';


export default class Login extends Component {
    constructor(props) {
        super(props);


        this.state = {
            open: false,
            username: '',
            password: ''
        }
    }
        handleClickOpen = () => {
            this.setState({open: true})
        }

        updateUsername(e) {
            this.setState({ username: e.target.value})
        }

        updatePassword(e) {
            this.setState({ password: e.target.value})
        }

    async login() {
        console.log('hello')
        this.setState({open: false})
        if (!this.state.username || !this.state.password) return alert('Please fill out username and password.')
        let res = await axios.post('/api/login', {
            username: this.state.username,
            password: this.state.password
        })
        console.log(res)
        if (res.data.message === 'logged in') {
            this.props.history.push('/')
        } else {
            alert(res.data.message)
        }
        console.log('got here')
    }

    async register() {
        console.log('register works')
        this.setState({open: false})
        if (!this.state.username || !this.state.password) return alert('Please fill out username and password.')
        let res = await axios.post('/api/register', {
            username: this.state.username,
            password: this.state.password
        })
        console.log(res)
        if (res.data.message === 'logged in') {
            this.props.history.push('/')
        } else {
            alert(res.data.message)
        }
    }



    render() {
        return(
            <Fragment>

            <Button onClick={this.handleClickOpen} style={{backgroundColor: "white"}}>Login</Button>
            <div className="login-container">
                { this.state.open && <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    >
                    <DialogTitle id="register">Account</DialogTitle>
                    <DialogContent>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Username"
                        type="text"
                        fullWidth
                        onChange={(e) => this.updateUsername(e)}
                        />
                        <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        onChange={(e) => this.updatePassword(e)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.login()} color="primary">
                        Login
                        </Button>
                        <Button onClick={() => this.register()} color="primary">
                        Register
                        </Button>
                    </DialogActions>
                    </Dialog>}
            </div>
        </Fragment>
        )
    }
}