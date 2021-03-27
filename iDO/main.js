document.getElementById("writeList").oninput = function() {clearWarning()}; //Clears the red warning text when input is detected in the input field
document.getElementById("whatTodo").onsubmit = function() {createList()}; //Upon pressing ENTER, activates said function to print out the inputted text in a table
var arrayTodo = []; //An array for a function which saves input values into localStorage
function clearWarning(){
    document.getElementById("warning").innerHTML="";
    document.getElementById("writeList").style.borderColor="rgb(230, 165, 112";
}
function createList(){
    console.log("Submitting input value...");
    event.preventDefault(); //Prevents the page form refreshing
    var text = document.getElementById("writeList").value;
    if (text === ""){ // Alerts the user if no text is inputted
        console.log("Submitted empty value");
        document.getElementById("warning").innerHTML="Try writing something first."
        document.getElementById("writeList").style.borderColor="red";
    }
    else if (text.length < 3){ // Alerts the user if only 2 charecters or less are inputted
        console.log("Submitted too short value");
        document.getElementById("warning").innerHTML="Try writing something longer."
        document.getElementById("writeList").style.borderColor="red";
        document.getElementById("writeList").value ="";
    }
    else { // If input is succesfull, first creates a table, if one isn't found, then proceeds to add the inputted text into said table
        console.log("Input value: "+text);
        writeList.value =""; // Clears the input field after ENTER
        console.log("Transferring to function...")
        var table = document.getElementById("listTable");
        
        if (table === null){
            addComponents();
            console.log("Table creation done")
        } 
        addTodo(text);
        lsSave(text);
        console.log("Done")
    }
}
function addComponents(){ //Creates the table which houses the todo-list, and a clear "button" to delete multiple "done" todos at once
    console.log("Creating table...")
    var node = document.createElement("TABLE");
    node.id = "listTable"
    var textNode = document.createElement("P");
    textNode.id = "clearList";
    textNode.innerHTML = "Clear completed tasks"
    node.appendChild(textNode);
    document.getElementById("mainCont").appendChild(node);

    var myNode = document.getElementById("clearList"); //Listener is set up for the clear button, which deletes multiple "done" todos at once 
    myNode.addEventListener("click", function(){
        var array = document.getElementsByClassName("checked");
        console.log("Purging items...")
        for(i=0; i<array.length; i+1){
            document.getElementsByClassName("checked")[i].remove();

        }
        if (document.getElementsByTagName("tr").length == 0){ //Deletes the table if no todos remain after clearing, effectively resetting the app
            document.getElementById("listTable").remove();
        }
        console.log("Purging done");
    })
}
function addTodo(text){ //Takes the input value, inserts it into the table, creates a delete button for it and creates listeners for these
    addText(text);
    addClose();
    console.log("Created list item: "+text);

    console.log("Adding dynamic listeners...")
    var list = document.querySelector("td"); //Creates a listener which reacts to clicks on the todo td-element, which will toggle its status between done and not done
    list.addEventListener("click", function (ev){ 
        if (ev.target.tagName === "TD"){
            ev.target.classList.toggle("checked");
            ev.target.parentElement.classList.toggle("checked");
            ev.target.parentElement.children[1].classList.toggle("checked");
            console.log("Changed item status");
        }
    });
    var list = document.querySelector(".close"); //Creates a listener which reacts to clicks on the close "button", deleting the table row where the button was pressed on
    list.addEventListener("click", function (ev){
        console.log("Deleting list item...");
        ev.target.parentElement.children[0].remove();
        ev.target.parentElement.remove();
        ev.target.remove();
        buttonRemove(); //Activates a function which checks how many remaining todos are in the table
        console.log("Done");
    })
    console.log("Added listeners")
}
function addText(text){ //Creates a table row and inserts the input value into it
    var table = document.getElementById("listTable");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = text;
    cell1.className = "todoItem";
}
function addClose(){ //Creates a delete "button" and attaches it onto the same row the inputted value is on
    console.log("Adding delete button...")
    var node = document.getElementsByTagName("tr")[0];
    var span = document.createElement("TD");
    span.className = "close";
    span.innerHTML = "X";
    node.appendChild(span);
}
function lsSave(text){ //Saves inputted values into localStorage
    console.log("Saving 'todo' into localStorage...");
    arrayTodo.push(text);
    window.localStorage.setItem("todo",JSON.stringify(arrayTodo));
    console.log("Saved into localStorage")

}
function buttonRemove(){ //Upon deletetion of a table row, if no rows remain, deletes the table itself, effectively resetting the app
    if (document.getElementsByTagName("tr").length == 0){
        document.getElementById("listTable").remove();
      }
}