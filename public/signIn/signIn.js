
function connection(){

    const form = document.getElementById('form');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const data = {

            email: email.value.trim(),
            password: password.value.trim(),
            };
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(data)
        };

        try {
            const res = await fetch('/user/login', options);
            const json = await res.json();
            console.log(json.token);
            if(res.status === 200)
            {
                console.log("OK");
                window.location.href = "../tasks/tasks.html" + `?auth-token=${json.token}`;
            }
            else{
                console.log("HO");
            }
        } catch (err) {
            res.status(400).json({message: "Faild"});
        }
    });
};

connection();