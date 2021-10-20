
function newUser(){
    console.log("Clicked!");
    const form = document.getElementById('form');
    const email = document.getElementById('email');
    const name = document.getElementById('name');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const data = {
            email: email.value.trim(),
            name: name.value.trim(),
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
            const res = await fetch('/user/register', options);
            const json = await res.json();
            console.log(json);

            if(res.status === 200){
                window.location.href = "../tasks/tasks.html" + `?auth-token=${json.token}`;
            }

        } catch (err) {
            console.log(err);
            res.status(400).json({message: err});
        }
    });
};

newUser();