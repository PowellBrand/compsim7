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
    }

    componentDidMount() {
        axios.get('/api/getUsers').then(res => {
            console.log(res.data)
            this.setState({
                user: res.data
            })
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
