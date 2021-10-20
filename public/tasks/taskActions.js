createTask();

function newTask(){
    const myDiv = document.getElementById('newTaskDiv');
    myDiv.style.display = 'inherit';
    document.getElementById('taskValueName').select();
};

function exitNewTask(element){
    const myDiv = document.getElementById(element);
    myDiv.style.display = 'none';
};

function createTask(){
    const form = document.getElementById('form');
    const taskValueName = document.getElementById('taskValueName');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({name: taskValueName.value.trim()})
        };

        try {
            const res = await fetch('/tasks/', options);
            const json = await res.json();
            console.log(json);
            location.reload();

        } catch (err) {
            res.status(400).json({message: err});
        }
    });
};

function delTask(itemId, itemName){
    console.log(itemName);
    console.log(itemId);
    const myDiv = document.getElementById('delTaskDiv');

    document.getElementById("taskName").innerHTML = 'Task name: ' + itemId.innerHTML; //Show task name 

    myDiv.style.display = 'inherit';

    // const delForm = document.getElementById('delForm');


    const cancelDelBtn = document.getElementById('cancelDelBtn');
    cancelDelBtn.addEventListener('click', (event) => {
        evt.preventDefault();
        try {
            // itemId = "";
            exitNewTask();
        } catch (error) {
            console.log(error);
        }
    });

    const delTaskBtn = document.getElementById('delTaskBtn');
    delTaskBtn.addEventListener('click', async (event) =>{
        event.preventDefault();
        
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({taskId: itemId.innerHTML})
        };

        try {
            const res = await fetch('/tasks/', options);
            const json = await res.json();
            console.log(json);
            location.reload();

        } catch (err) {
            res.status(400).json({message: err});
        }
    });
    // itemId = '';
};

function editTask(){

};