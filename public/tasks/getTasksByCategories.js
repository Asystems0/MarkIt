async function getTasksByCategories (category) {
    const options = {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await fetch(`/tasks/${category}`, options);
        const json = await res.json();
        console.log(json);
        if(res.status === 200){
            
            document.getElementById('itemTitle').style.visibility = 'visible'//Show items title
            document.getElementById("form-box").innerHTML = '';
            
            for(var i = 0; i < json.tasks.length + 1; i++){
                
                var myDiv = document.createElement("div");  // Create a <div> node
                myDiv.id = 'div_id' + (i+1);
                myDiv.className = 'div_class'; 
                console.log(myDiv);

                myDiv.innerHTML = `<h3 class="taskName">${json.tasks[i].name}</h3>`;
                myDiv.innerHTML += `<h3 class="taskDate">${json.tasks[i].date}</h3>`;
                myDiv.innerHTML += `<h3 class="taskStatus">${json.tasks[i].complited}</h3>`;
                myDiv.innerHTML += `<h3 class="taskCategory">${json.tasks[i].category}</h3>`;
                document.getElementById("form-box").appendChild(myDiv);
            }   
        }
        else{
            document.getElementById('itemTitle').style.visibility = 'hidden'//Hidden items title
            document.getElementById("form-box").innerHTML = `<h1 id="emptyMessage">'${category}' is empty</h1>`;

            var myDiv = document.createElement("div");  // Create a <div> node
            myDiv.innerHTML = `<button id=newTask onclick="newTaskDiv()"> Create a new task </button>`; 
            document.getElementById("form-box").appendChild(myDiv);
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({message: err});
    }
};
