async function createNewTask(category) {
    document.getElementById('itemTitle').style.visibility = 'hidden'//Hidden items title

    var myDiv = document.createElement('div');
    myDiv.id = 'wrapper';


};

function exitFunc() {
    document.getElementById('wrapper').remove();
}