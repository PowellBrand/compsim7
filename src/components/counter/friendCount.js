import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';



class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };

        this.addCount = this.addCount.bind(this);
        this.subCount = this.subCount.bind(this);
    }

    addCount = () => {
        this.setState({ count: this.state.count + 1 });
    }
    subCount = () => {
        this.setState({ count: this.state.count - 1 });
    }
 

    handleClick(e) {
        var body = {
            name: this.refs.name.value,
            password: this.refs.password.value
        }
        e.preventDefault()
        axios.post('/api/createFriend', body)
        this.refs.name.value = '';
        this.refs.password.value = '';
    }

    getUsers() {
        axios.get('/api/getUsers')
    }

    playSound() {
        var snd = new Audio();
        snd.src = "What_Dan.mp3"
        document.getElementById(snd)
        snd.play();
        snd.currentTime = 0;
    }


    render() {
        return (
            <div className="main">

               
                <button className="btn" onClick={this.addCount}>Add 1</button>
                <button className="btn" onClick={this.subCount}>Sub 1</button>
                <p className="countP">Count: {this.state.count}</p>

                <div className="addUserCont">
                    <form className="userForm" onSubmit={this.handleClick}>
                        <p>Name: </p>
                        <input className="nameInput" type="text" ref="name" />
                        <p>Location: </p>
                        <input className="passInput" type="text" disabled="disabled" ref="password" />
                        <button type="submit">Submit</button>
                    </form>
                    <div className="showUser"> User: {this.getUsers}</div>
                </div>
                <a href='/view1'><button className="startBtn">Start</button></a>
           

            </div>
        );
    }
}

function mapStateToProps(state) {

    return {
        count: state.count,
        name: state.name,
        password: state.password
    }
}
export default connect(mapStateToProps)(Landing)