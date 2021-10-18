
async function addTasks(){
    
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTZkZTZkMmU4OTU0ZGEyOGI5MWNlNjEiLCJpYXQiOjE2MzQ1OTI0ODF9.h0mbD_panLwQ6rA6ZsB259OvQRq6NlihJy3FRhPbvcU"
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
            for(var i = 0; i < json.tasks.length; i++){

                //Create the element using the createElement method.
                var myDiv = document.createElement("div");

                //Set its unique ID and public class.
                myDiv.id = 'div_id' + (i+1);
                myDiv.className = 'div_class';

                console.log(myDiv.id);
                console.log(myDiv.className);

                //Add your content to the DIV
                myDiv.innerHTML = `<h3>${json.tasks[i].name}</h3>`;
                myDiv.innerHTML += `<p>Date: ${json.tasks[i].date}</p>`;
                myDiv.innerHTML += `<i class="far fa-check-circle" id="fontawesome"></i>`;
                myDiv.innerHTML += `<button id="btnEdit"><i class="far fa-edit"></i></button>`;
                myDiv.innerHTML += `<button id="btnDel"><i class="far fa-trash-alt"></i></button>`;
                
                

                //Finally, append the element to the HTML body
                document.body.appendChild(myDiv);

                // console.log((i+1));

                // var cartHTML = "<div id=" + "div" + (i+1) + "><h3>" + `Task number ${i + 1}: ` + json.tasks[i].name + "</h3><br></div>'";
                // console.log(cartHTML);
                // document.body.append(cartHTML);

                // var div = document.createElement("div");
                // var h3 = document.createElement("h3").value = `Task number ${i + 1}: ` + json.tasks[i].name;
                // h3.id = "anyName" + i;
                // console.log(h3.id);
                // const br = document.createElement("br");
                
                // document.body.append(h3, br);


                // console.log(json.tasks[i].name);
                // console.log(json.tasks[i].complited);
            }
        }
        else{
            console.log("HO");
        }
    } catch (err) {
        res.status(400).json({message: "Faild"});
    }

}

addTasks();