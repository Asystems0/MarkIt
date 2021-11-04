// createNewTask();

function newTaskDiv() {
    document.getElementById('itemTitle').style.visibility = 'hidden'//Hidden items title
    document.getElementById('newTaskDiv').style.visibility = 'visible'//visible items
    createNewTask();
};

async function createNewTask() {
    console.log("taskName");
    const form = document.getElementById('newTaskForm');
    const button = document.getElementById('inputBtn');
    const taskName = document.getElementById('taskName');
    const categories = document.getElementById('categories');

    button.addEventListener('click', async (event) => {
        event.preventDefault();

        const data = {
        name: taskName.value.trim(),
        category: categories.value.trim(),
        };

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
            console.log(json);
            console.log(json.data.category);
            // console.log("resss: " , res);

            if(res.status === 200){
                console.log("suc");
                document.getElementById('errorMsg').style.visibility = 'hidden';
                exitFunc();
                successMsgFunc(json.data.name, json.data.category);
            }
        } catch(err){
            res.status(400).json({message: err});
        }
        
    });  
};

async function successMsgFunc(taskName, categoryName){
    document.getElementById('successAddedTask').style.visibility = 'visible'//visible items titl
    var myDiv = document.createElement("div");  // Create a <div> node
    myDiv.className = 'success_class'; 
    myDiv.innerHTML = `<h3>NAME: ${taskName}</h3>`;
    myDiv.innerHTML += `<h3>CATEGORY: ${categoryName}</h3>`;
    document.getElementById("successMsg").appendChild(myDiv);
};

function exitFunc() {
    document.getElementById('itemTitle').style.visibility = 'visible'//visible items title
    document.getElementById('newTaskDiv').style.visibility = 'hidden'//Hidden items
    document.getElementById('successAddedTask').style.visibility = 'hidden'//Hidden items
    document.getElementById('taskName').value = '';
};

