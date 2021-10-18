function newUser(){
    console.log("Clicked!");
    const form = document.getElementById('form');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const data = {
            email: email.value.trim(),
            password: password.value.trim()
            };

        console.log(email.value.trim(), password.value.trim());

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(data)
        };

        try {
            let res = await fetch('/user/register', options);
            let json = await res.json();
            console.log(json)
        } catch (err) {
            res.status(400).json({message: err});
        }
    });
};




// const form = document.getElementById('form');
//     const email = document.getElementById('email');
//     const password = document.getElementById('password');

//     form.addEventListener('submit', async (event) => {
//         event.preventDefault();

//         const data = {email: email.value.trim(), password: password.value.trim()}
//         console.log(email.value.trim(), password.value.trim());

//         const options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },

//             body: JSON.stringify(data)
//         };

//         try {
//             let res = await fetch('/user/login', options);
//             let json = await res.json();
