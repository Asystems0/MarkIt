console.log("hi");

// function signInFunc(){
//     console.log("Clicked");

//     var signInDiv = document.getElementById('signInDiv');
//     document.getElementById('signUpDiv').style.visibility = 'hidden' //Hidden the sign up form
//     if (signInDiv.style.visibility === 'hidden' || signInDiv.style.zIndex === -1) {
//         signInDiv.style.visibility = 'visible';
//         signInDiv.style.zIndex = 1;

//     } else {
//         signInDiv.style.visibility = 'hidden';
//         signInDiv.style.zIndex === -1;
//     }
// }

// function signUpFunc(){
//     console.log("Clicked");

//     var signUpDiv = document.getElementById('signUpDiv');
//     document.getElementById('signInDiv').style.visibility = 'hidden' //Hidden the sign in form
//       if (signUpDiv.style.visibility === 'hidden' || signUpDiv.style.zIndex === -1) {
//         signUpDiv.style.visibility = 'visible';
//         signUpDiv.style.zIndex = 1;

//     } else {
//         signUpDiv.style.visibility = 'hidden';
//         signUpDiv.style.zIndex === -1;
//     }


//     // if (signUpDiv.style.visibility === 'hidden' || signUpDiv.style.zIndex === -1) {
//     //     signUpDiv.style.visibility = 'visible';
//     //     signUpDiv.style.zIndex = 1;

//     // } else {
//     //     signUpDiv.style.visibility = 'hidden';
//     //     signUpDiv.style.zIndex === -1;
//     // }

// }

function sendData(){
    const form = document.getElementById('signUpForm');
    const email = document.getElementById('emailUp');
    const password = document.getElementById('passwordUp');
    const password2 = document.getElementById('password2Up');

    form.addEventListener('submit', async (event) => {
        window.alert("sometext");
        event.preventDefault()

        const data = {email: email.value.trim(), password: password.value.trim()};
        console.log(data);
        
        const option = {
            method: 'POST',
            Headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };

        try {
            let res = await fetch('/user/login', options);
            let json = await res.json();

            console.log(json);
            document.body.innerHTML = {wellcome: req.body.name}
        } catch (error) {
            res.status(400).json({message: "Faild"});
        }

        // const res = await
    })
}


// sendData();


// function sendData(){

// }
// function sendData(){
//     const form = document.getElementById('form');
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

//             // document.body.append(json.token);
//             // console.log(json);
//             // console.log(res);
//             res = await fetch('/post/', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'auth-token': json.token
//                     }
//                 }
//             )
//             json = await res.json();
//             console.log(json.posts);
//             document.body.append(json.posts.title);
//         }catch(err){
//             // res.status(400).json(err.keyPattern);
//         }
        

//     });

// };


