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
        console.log("IN: ", json.tasks[0]);
        if(res.status === 200)
        {
            console.log("OK");

            var myDiv = document.getElementById('username');
            myDiv.innerHTML = `<h3 id="itemName">Hi, ${json.userName}</h3>`;
            // document.body.appendChild(myDiv);

            // var myclass = document.getElementsByClassName('form-box');

            // var node = document.createElement("div");                 // Create a <li> node
            // var textnode = document.createTextNode(json.tasks[0].name, json.tasks[0].date);         // Create a text node
            // var textnode = document.createTextNode(json.tasks[0].date);         // Create a text node
            // node.appendChild(textnode);                              // Append the text to <li>
            // document.getElementById("form-box").appendChild(node);

            for(var i = 0; i < json.tasks.length + 1; i++){
                
                var myDiv = document.createElement("div");  // Create a <li> node
                myDiv.id = 'div_id' + (i+1);
                myDiv.className = 'div_class'; 
                console.log(myDiv);
                var textnode = document.createTextNode(json.tasks[i].name); // Create a text node
                myDiv.appendChild(textnode); // Append the text to div
                document.getElementById("form-box").appendChild(myDiv);

                // myDiv.innerHTML = `<h3 id="itemName">${json.tasks[0].name}</h3>`;
                // myDiv.innerHTML += `<h3 id="itemName">${json.tasks[0].date}</h3>`;
                //Create the element using the createElement method.
                // var myDiv = document.createElement("div");

                //Set its unique ID and public class.
                // myDiv.id = 'div_id' + (i+1);
                // myDiv.className = 'div_class';        

                //Add your content to the DIV
            }
             
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