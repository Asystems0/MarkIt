async function allTasks(){
    
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
            var category = [];

            var myDiv = document.getElementById('username');
            myDiv.innerHTML = `<h3 id="itemName">Hi, ${json.userName}</h3>`;

            try{
                document.getElementById('itemTitle').style.visibility = 'visible'//Show items title
                document.getElementById("form-box").innerHTML = '';
                for(var i = 0; i < json.tasks.length + 1; i++){

                    console.log(json.tasks[i].category);
                    if(!category.includes(json.tasks[i].category)){
                        category.push(json.tasks[i].category);
                    }
                    
                    var myDiv = document.createElement("div");  // Create a <div> node
                    myDiv.id = 'div_id' + (i+1);
                    myDiv.className = 'div_class'; 

                    myDiv.innerHTML = `<h3 class="taskName">${json.tasks[i].name}</h3>`;
                    myDiv.innerHTML += `<h3 class="taskDate">${json.tasks[i].date}</h3>`;
                    myDiv.innerHTML += `<h3 class="taskStatus">${json.tasks[i].complited}</h3>`;
                    myDiv.innerHTML += `<h3 class="taskCategory">${json.tasks[i].category}</h3>`;
                    document.getElementById("form-box").appendChild(myDiv);
                }
            } catch (err) {
                console.log(err);
                // res.status(400).json({message: err});
            }
            localStorage.setItem("Category", JSON.stringify(category));
            console.log("HHH: ");
        }
        else{
            console.log("HO");
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({message: err});
    }
}

allTasks();
