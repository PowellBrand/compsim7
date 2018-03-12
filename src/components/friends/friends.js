import React, { Component } from 'react';
import { connect } from 'react-redux';
import { quests, equipQuest } from '../../ducks/reducer'
import axios from 'axios';


class Quests extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            location: ''
        }

    }

    componentWillMount() {
        axios.get('/api/getFriends').then(res => {
            console.log(res.data)
            this.setState({
                name: res.data,
                location: res.data
            })
        })
    }

    showFriends(friend) {
        console.log(friend.name, friend.location)
        return (
            <div>
                <p>Name of friend: {friend.name}</p>
                <p>Location of friend: {friend.location}</p>
            </div>

        )
    }





    render() {
        // 83F
       var eightyThreeF = this.state.friends.map(friend => {
           return this.showFriends(friend)
       })
        

        return (
            <div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        quest: state.id

    }
}
export default connect(mapStateToProps, { quests, equipQuest })(Quests)