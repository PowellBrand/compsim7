module.exports = {
    login: (req, res, next) =>{
        let {username} = req.body;
        const db = req.app.get('db');
        let users = db.getUsers().then(users=>{

            const user = users.find(user=> user.username === username);
            
            if (user) {
                console.log(req.session.user);
                req.session.user.username = user.username;
                res.status(200).send(req.session.user);
            }
            else {
                res.status(403).send('Please Register');
            }

        }).catch(e=>console.log(e))
    },

    register: (req, res, next) => {
        id++;
        let {username, password} = req.body;
      
        const db = req.app.get('db');
        db.newUser([id, username]).then(users => {
            res.status(200).send(users);
        }
        )

    },

    getUsers: (req,res)=>{
        req.app.get('db').getUsers().then(users=>{
            if (users===null){
                res.json(users)
            }
            res.send(users)
        })
    },
    addUser: (req,res)=>{
        let {username} = req.body;
        req.app.get('db').addUser([username]).then(results=>{
            res.send("All Good.")
        })
    },

    deleteUser: (req,res)=>{
        let username = req.params.username;
        req.app.get('db').deleteUser([username]).then(results=>{
            res.send("deleted")
        })
    },

    

   
}