allTasks();

async function allTasks(){

    console.log('all tasks');
    
    const options = {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await fetch('/tasks/', options);
        const json = await res.json();
        console.log(json);
        if(res.status === 200)
        {
            console.log("OK");
            localStorage.setItem("Category", json.categories);

            var myDiv = document.getElementById('username');
            myDiv.innerHTML = `<h3 id="itemName">Hi, ${json.userName}</h3>`;

            try{
                document.getElementById('itemTitle').style.visibility = 'visible'//Show items title
                document.getElementById("form-box").innerHTML = '';
                for(var i = 0; i < json.tasks.length + 1; i++){
                    
                    var myDiv = document.createElement("div");  // Create a <div> node
                    myDiv.id = 'div_id' + (i+1);
                    myDiv.className = 'div_class'; 

                    myDiv.innerHTML = `<h3 class="taskName" ondblclick="editTaskName('${json.tasks[i].name}', '${myDiv.id}')">${json.tasks[i].name}</h3>`;
                    myDiv.innerHTML += `<h3 class="taskDate">${json.tasks[i].date}</h3>`;
                    myDiv.innerHTML += `<h3 class="taskStatus">${json.tasks[i].complited}</h3>`;
                    myDiv.innerHTML += `<h3 class="taskCategory">${json.tasks[i].category}</h3>`;
                    document.getElementById("form-box").appendChild(myDiv);
                }
            } catch (err) {
                // console.log(err);
                // res.status(400).json({message: err});
            }
        }
        else{
            if(json.msg === 'Access Denied' || json.msg === 'Invalid Token'){
                window.location.replace("/");
            }
        }
    } catch (err) {
        // console.log(err);
        res.status(400).json({message: err});
    }
};
