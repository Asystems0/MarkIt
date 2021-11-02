const category = localStorage.getItem('Category').split (','); //Get user categories        
    for(var i = 0; i < category.length; i++){
        
        var myDiv = document.createElement("div");  // Create a <div> node
        myDiv.id = 'user-category-' + (i+1);
        myDiv.className = 'user-list-tasks';
        console.log(typeof(category[i]));

        myDiv.innerHTML = `<button onclick="getTasksByCategories('${category[i]}')"> ${category[i]}</button>`;
        document.getElementById("userCategories").appendChild(myDiv);
    }