console.log("hi");

sendData();

function sendData(){
    const form = document.getElementById('form');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const data = {email: email.value.trim(), password: password.value.trim()}
        console.log(email.value.trim(), password.value.trim());

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(data)
        };

        try {
            let res = await fetch('/user/login', options);
            let json = await res.json();

            // document.body.append(json.token);
            // console.log(json);
            // console.log(res);
            res = await fetch('/post/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': json.token
                    }
                }
            )
            json = await res.json();
            console.log(json.posts);
            document.body.append(json.posts.title);
        }catch(err){
            // res.status(400).json(err.keyPattern);
        }
        

    });

};