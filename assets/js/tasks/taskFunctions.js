function newTaskDiv() {
    document.getElementById('itemTitle').style.visibility = 'hidden'//Hidden items title
    document.getElementById('newTaskDiv').style.visibility = 'visible'//visible items
    document.getElementById('taskName').focus() //focus on input field
    createNewTask();
};

async function createNewTask() {
    console.log("taskName");
    const form = document.getElementById('newTaskForm');
    const button = document.getElementById('inputBtn');
    const taskName = document.getElementById('taskName');
    const categories = document.getElementById('categoriesSelect');
    const taskTime = document.getElementById('taskTime');

    button.addEventListener('click', async (event) => {
        event.preventDefault();

        console.log(taskTime);
        const data = {
        name: taskName.value.trim(),
        category: categories.value.trim(),
        dateEnd: taskTime.value,
        };

        console.log(data);

        if(data.name === ''){
            document.getElementById('errorMsg').innerHTML = 'Must provide name';
            document.getElementById('errorMsg').style.visibility = 'visible';
            return;
        }

        try{

            const options = {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            };

            const res = await fetch('/tasks/addTask', options);
            const json = await res.json();

            if(json.msg){ //Show user error
                document.getElementById('errorMsg').innerHTML = json.msg;
                document.getElementById('errorMsg').style.visibility = 'visible';
                return;
            }

            if(res.status === 200){
                console.log("suc");
                document.getElementById('errorMsg').style.visibility = 'hidden';
                // exitFunc();
                successMsgFunc(json.data.name, json.data.category);
            }
        } catch(err){
            console.log(err);
            res.status(400).json({message: err});
        }        
    });  
};

async function successMsgFunc(taskName, categoryName){
    document.getElementById('successAddedTask').style.visibility = 'visible'//visible items titl
    var myDiv = document.createElement("div");  // Create a <div> node
    myDiv.className = 'success_class'; 
    myDiv.id = 'success_id'; 
    myDiv.innerHTML = `<h3>NAME: ${taskName}</h3>`;
    myDiv.innerHTML += `<h3>CATEGORY: ${categoryName}</h3>`;
    document.getElementById("successMsg").appendChild(myDiv);
};

async function editTaskName(taskName, divId){
    console.log(taskName, divId);
    const myDiv = document.getElementById(divId).getElementsByClassName('taskName');
    console.log(myDiv);
    var newInput = document.createElement('input');
    newInput.innerHTML = `<input type="text" id="taskName" placeholder="${taskName}" name="taskName" minlength="2" maxlength="20" required><br><br>`
    console.log(newInput);
    // myDiv.innerHTML = newInput;
    // document.getElementById(divId).getElementsByClassName('taskName').appendChild(newInput);
    // document.getElementById(divId).appendChild(newInput);
    // document.getElementById().appendChild(newInput);
    // insertAfter(newInput, myDiv);
    myDiv.appendChild(newInput);



    console.log(myDiv);

};

function exitFunc() {
    document.getElementById('itemTitle').style.visibility = 'visible'//visible items title
    document.getElementById('newTaskDiv').style.visibility = 'hidden'//Hidden items
    document.getElementById('successAddedTask').style.visibility = 'hidden'//Hidden items
    document.getElementById('success_id').remove(); // Clean success message div
    document.getElementById('taskName').value = '';
    document.getElementById('errorMsg').innerHTML = '';
};

