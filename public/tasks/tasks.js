
async function allTasks(){
    
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        },
    };

    try {
        const res = await fetch('/tasks/', options);
        const json = await res.json();
        console.log(json);
        if(res.status === 200)
        {
            console.log("OK");
            // document.body.append(json.tasks[0].name);
            console.log(json.tasks.length);
            for(var i = 0; i < json.tasks.length + 1; i++){

                //Create the element using the createElement method.
                var myDiv = document.createElement("div");

                //Set its unique ID and public class.
                myDiv.id = 'div_id' + (i+1);
                myDiv.className = 'div_class';        

                //Add your content to the DIV
                
                
                myDiv.innerHTML = `<h3 id="itemName${i+1}">${json.tasks[i].name}</h3>`;
                myDiv.innerHTML += `<p>Date: ${json.tasks[i].date}</p>`;

                // if(json.tasks[i].complited === true){
                //     myDiv.innerHTML += `<i class="far fa-check-circle" id="fontawesome1" style="color:green;"></i>`;

                // }else{
                //     myDiv.innerHTML += `<i class="far fa-times-circle" id="fontawesome2" style="color:#E86888;"></i>`;
                // }

                // myDiv.innerHTML += `<button id="btnEdit${i+1} onclick="editTask(itemId${i+1}"><i class="far fa-edit"></i></button>`;
                myDiv.innerHTML += `<p class ="itemId" id="itemId${i+1}" style="display: none;">${json.tasks[i]._id}</p>`;
                myDiv.innerHTML += `<button id="btnDel${i+1}" onclick="delTask(itemId${i+1}, itemName${i+1})"><i class="far fa-trash-alt"></i></button>`;
                
                document.body.appendChild(myDiv);

                // console.log(myDiv.itemId);

            }

            // myDiv.innerHTML += `<h3>Complited tasks</h3>`;

            // for(var i = 0; i < json.complitedTasks.length + 1; i++){

            //     //Create the element using the createElement method.
            //     var myDiv = document.createElement("div");

            //     //Set its unique ID and public class.
            //     myDiv.id = 'div_id' + (i+1);
            //     myDiv.className = 'div_class';        

            //     //Add your content to the DIV
                
                
            //     myDiv.innerHTML += `<h3 id="itemName${i+1}">${json.complitedTasks[i].name}</h3>`;
            //     myDiv.innerHTML += `<p>Date: ${json.complitedTasks[i].date}</p>`;

            //     // if(json.tasks[i].complited === true){
            //     //     myDiv.innerHTML += `<i class="far fa-check-circle" id="fontawesome1" style="color:green;"></i>`;

            //     // }else{
            //     //     myDiv.innerHTML += `<i class="far fa-times-circle" id="fontawesome2" style="color:#E86888;"></i>`;
            //     // }

            //     // myDiv.innerHTML += `<button id="btnEdit${i+1} onclick="editTask(itemId${i+1}"><i class="far fa-edit"></i></button>`;
            //     myDiv.innerHTML += `<p class ="itemId" id="itemId${i+1}" style="display: none;">${json.complitedTasks[i]._id}</p>`;
            //     myDiv.innerHTML += `<button id="btnDel${i+1}" onclick="delTask(itemId${i+1}, itemName${i+1})"><i class="far fa-trash-alt"></i></button>`;
                
            //     document.body.appendChild(myDiv);
            // }
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