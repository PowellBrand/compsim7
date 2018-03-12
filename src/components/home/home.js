import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';



class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            location: '',
            user: {}
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        axios.get('/api/getUsers').then(res => {
            console.log(res.data)
            this.setState({
                user: res.data
            })
        })
    }

    handleClick(){
        axios.get('/api/getUsers').then(res => {
            console.log(res.data)
        })
    }


    // 36E
    updateFriend() {
        axios.put('/api/updateFriend/' + this.props.match.params.id, this.state)
            .then((response) => {
                this.setState({
                    name: response.data[0].name,
                    location: response.data[0].location
                })

            })
    }
    testUser(){
        axios.get('/api/sheep').then(res => {
            console.log(res.data, 'You got it')
        })
    }

    // 83F
    callbackHOP(){
        var array = [2,4,6,8,10]
        var doubleUp = array.map((num)=>{
            return num * 2
        })
    }


    render() {
        return (
            <div className="homeMain">
                <button onClick={()=>this.handleClick()}>Get Users</button>
                <a href='/friendCount'><button className="startBtn">Friends</button></a>
                <button className="startBtn" onClick={()=>this.testUser()}>Test</button>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        name: state.name,
        locaton: state.location
    }
}

export default connect(mapStateToProps)(Home)
