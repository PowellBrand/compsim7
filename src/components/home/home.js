import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';



class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            user:{}
        }
    }

    componentDidMount() {
        axios.get('/api/getUsers').then(res => {
            console.log(res)
            this.setState({
                user: res.data
            })
        })
    }


    render() {
        return (
            <div className="homeMain">

            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        name: state.name
    }
}

export default connect(mapStateToProps)(Home)
