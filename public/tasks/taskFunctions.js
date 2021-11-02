async function createNewTask(category) {
    console.log("in");
    const categories = localStorage.getItem('Category').split (','); //Get user categories
    console.log(categories);
    document.getElementById('itemTitle').style.visibility = 'hidden'//Hidden items title

    var myDiv = document.createElement('div');
    myDiv.id = 'wrapper';

    myDiv.innerHTML = `<button id="exitBtn" onclick="exitFunc()"><i class="fas fa-times"></i></button>`;
    myDiv.innerHTML += `<form id="newTaskForm">`;
    myDiv.innerHTML += `<label for="taskName">TASK NAME:</label>`;
    myDiv.innerHTML += `<input type="text" id="taskName" name="taskName" minlength="2" maxlength="20" onkeyup="success()"><br><br>`;
    myDiv.innerHTML += `<h2>Category: </h2>`;
    myDiv.innerHTML += `<select name="categories" id="categories">`;
    for(var i = 0; i < categories.length; i++){
        console.log(categories[i]);
        myDiv.innerHTML += `<option value="${categories[i]}">${categories[i]}</option>`; ////EDITTT
    }
    myDiv.innerHTML += `</select>`;
    myDiv.innerHTML += `<button id="inputBtn" disabled>Create task</button>`;
    myDiv.innerHTML += `</form>`;

    document.body.append(myDiv);

        // <button id="exitBtn" onclick="exitFunc()"><i class="fas fa-times"></i></button>
        // <form id="newTaskForm">
            // <label for="taskName">TASK NAME:</label>
            // <input type="text" id="taskName" name="taskName" minlength="2" maxlength="20" onkeyup="success()"><br><br>
            // <h2>Category: </h2>
            // <select name="categories" id="categories">
                // <option value="volvo">Work</option>
                // <option value="saab">Develop</option>
                // <option value="mercedes">Sport</option>
    //           </select>
    //         <!-- <label for="category">Category:</label>
    //         <input type="text" id="category" name="category" value=""><br><br> -->
    //         <button id="inputBtn" disabled>Create task</button>
    //         <!-- <input type="submit" value="Submit"> -->
    //       </form>
    // </div>

};

function exitFunc() {
    document.getElementById('wrapper').remove();
};

function success() {
    if(document.getElementById("taskName").value === "") { 
            document.getElementById('inputBtn').disabled = true; 
    } else { 
        document.getElementById('inputBtn').disabled = false;
    }
};