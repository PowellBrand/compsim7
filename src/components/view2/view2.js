import React from 'react';
// 38D, 38C
export default function Friend(props){
    let friends = props.lists.map(friend=>{
        return (
            <div key={friend.id}>{friend.name}</div>
        )
    })

    return friends;
}