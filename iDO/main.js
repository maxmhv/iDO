document.getElementById("writeList").oninput = function() {clearWarning()};
document.getElementById("whatTodo").onsubmit = function() {createList()};
var arrayTodo = [];

function clearWarning(){
    document.getElementById("warning").innerHTML="";
    document.getElementById("writeList").style.borderColor="black";
}

function createList(){
    console.log("Submitting input value...");
    event.preventDefault();
    var text = document.getElementById("writeList").value;
    if (text === ""){
        console.log("Submitted empty value");
        document.getElementById("warning").innerHTML="Try writing something first."
        document.getElementById("writeList").style.borderColor="red";
    }
    else if (text.length < 3){
        console.log("Submitted too short value");
        document.getElementById("warning").innerHTML="Try writing something longer."
        document.getElementById("writeList").style.borderColor="red";
        //document.getElementById("writeList").value ="";
    }
    else {
        console.log("Input value: "+text);
        writeList.value ="";
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

function addComponents(){
    console.log("Creating table...")
    var node = document.createElement("TABLE");
    node.id = "listTable"
    var textNode = document.createElement("P");
    textNode.id = "clearList";
    textNode.innerHTML = "Clear completed items"

    node.appendChild(textNode);
    document.getElementById("mainCont").appendChild(node);

    var myNode = document.getElementById("clearList");
    myNode.addEventListener("click", function(){
        var array = document.getElementsByClassName("checked");
        console.log("Purging items...")
        for(i=0; i<array.length; i++){
            document.getElementsByClassName("checked")[i].style.display ="none";
        }
        console.log("Purging done");
    })
}

function addTodo(text){
    var table = document.getElementById("listTable");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = text +" <span class='close'>x</span> ";
    cell1.className = "todoItem";
    console.log("Created list item: "+text);

    console.log("Adding dynamic listeners...")
    var list = document.querySelector("td");
    list.addEventListener("click", function (ev){
        if (ev.target.tagName === "TD"){
            ev.target.classList.toggle("checked");
            console.log("Changed item status");
        }
    }, false);

    var list2 = document.querySelector("span");
    list2.addEventListener("click", function(){
            console.log("Deleted list item");
            var div = this.parentElement;
            div.style.display = "none";
    })
    console.log("Listeners added")
}

function lsSave(text){
    console.log("Saving into localStorage...");
    arrayTodo.push(text);
    window.localStorage.setItem("Todos",JSON.stringify(arrayTodo));
    console.log("Saved into localStorage")

}

