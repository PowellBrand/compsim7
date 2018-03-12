import axios from 'axios';

const initialState = {
    name: '',
    user: {},  
};

const NAME = 'NAME';
const USER = 'USER';



//Create Character function
export function createChar(value) {
    
    let body = {
        "name": value
    }
    let user = axios.post(`/api/createFriend`, body).then(res => {
        
        return res.data
    })

    return {
        type: NAME,
        payload: user.name
    }
}

//Get user function
export function getUser() {

    let user = axios.get('/api/getUser').then(res => {
       
        return res.data
    })
    return {
        type: USER,
        payload: user
    }
}






function reducer(state = initialState, action) {
    switch (action.type) {
       

        case NAME + '_FULFILLED':
            return Object.assign({}, state, { name: action.payload });

        case USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });

        default: return state;
    }
}


export default reducer;