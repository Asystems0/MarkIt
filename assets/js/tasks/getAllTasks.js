$(document).ready( async () => {

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
            try{
                localStorage.setItem("Category", json.categories);
                $('#itemTitle').show();
                $('#form-box').html();
                for(var i = 0; i < json.tasks.length + 1; i++){
                    var myDiv = document.createElement("div");  // Create a <div> node
                        myDiv.id = 'div_id' + (i+1);
                        myDiv.className = 'div_class';
                        
                        $(myDiv).append($("<h3></h3>").addClass("taskName").text(json.tasks[i].name));
                        $(myDiv).append($("<h3></h3>").addClass("taskDate").text(json.tasks[i].dateStart));
                        $(myDiv).append($("<h3></h3>").addClass("taskEndDate").attr( 'id', 'taskEndDateId' + (i+1) ));
                        makeTimer(json.tasks[i].dateEnd, '#taskEndDateId' + (i+1));
                        $(myDiv).append($("<h3></h3>").addClass("taskCategory").text(json.tasks[i].category));
                        $("#form-box").append(myDiv);

                }
            }catch(err){
                console.log(err);
            }

        }else{
            if(json.msg === 'Access Denied' || json.msg === 'Invalid Token'){
                window.location.replace("/");
            }
        }
    }catch (err) {
        // console.log(err);
        res.status(400).json({message: err});
    }
});


function makeTimer(taskEndTime, itemToChange) {

    // Set the date we're counting down to
    var countDownDate = new Date(taskEndTime).getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();
        
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
        
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    
    // Output the result in an element with id="demo"
    $(itemToChange).text(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
    
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        $(itemToChange).text("EXPIRED");
    }
    }, 1000);
};