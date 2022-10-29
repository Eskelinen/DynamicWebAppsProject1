/*Function to add text from the form into the table as a new row.
Function is validated to meet length requirements.
Wrong input results in the text box turning red and an error message being displayed.*/
function addToTable() {
    var chara = document.getElementById("textfield").value;
    //If-else clause for validating user input.
    if (chara.length < 1 || chara.length > 20) {
        document.getElementById("textfield").style.borderColor="red";
        document.getElementById("textfield").value="";
        document.getElementById("error").style.color="red";
        document.getElementById("error").innerHTML="The length of your input must be between 1-20 characters!";
        return false;
    }
    else {
    /*Initializing the table and defining the contents of the cells.
    Cell0 contains a checkmark, that appears when marking a task as done.
    Cell1 contains the task given by the user.
    Cell2 contains a button to mark the task as done.
    Cell3 contains a button to delete the task from the table.*/
   var row = document.getElementById("table").insertRow(0);
   var cell0 = row.insertCell(0);
   var cell1 = row.insertCell(1);
   var cell2 = row.insertCell(2);
   var cell3 = row.insertCell(3);
   cell0.innerHTML = "";
   cell1.innerHTML = document.getElementById("textfield").value;
   cell3.innerHTML = "<button onclick=\"removeFromTable(this)\">Remove</button>";
   cell2.innerHTML = "<button onclick=\"markAsDone(this)\">Done</button>";
   /*If the user gives wrong input the textbox turns red.
   When the user submits their input the textbox will be emptied and turned into the default black color.*/
   document.getElementById("textfield").value="";
   document.getElementById("error").innerHTML="";
   document.getElementById("textfield").style.borderColor="black";
    //These are defined below.
        saveToStorage();
        countTasks();
   return true;
    }
}
//This function sends the table and the count of completed tasks to localStorage.
function saveToStorage() {
    var taulukko = document.getElementById("table");
    localStorage.setItem("thingsToDo", taulukko.innerHTML);
    localStorage.setItem("thingsDone", doneCount);
}
//This function counts the number of tasks left. The number is displayed below the table.
function countTasks(){
    var table = document.getElementById("table");
    if (table.rows.length-doneCount < 2 && table.rows.length-doneCount != 0) {
     document.getElementById("howMany").innerHTML = "You have " + (table.rows.length-doneCount) + " thing to do";
     } else {
         document.getElementById("howMany").innerHTML = "You have " + (table.rows.length-doneCount) + " things to do";
     }
}
/*Function to remove a row from the table by clicking on a button.
The function searches the index number of the specific row and deletes it. */
function removeFromTable(row) {
    //Finding the index number of the row the user wants to delete.
    var i = row.parentNode.parentNode.rowIndex;
    var table = document.getElementById("table");
    //If the task wasn't marked as done, then it will just be deleted.
    if (table.rows[i].cells[0].innerHTML != "✓") {
        document.getElementById("table").deleteRow(i);
        saveToStorage();
    } else {
    //If the task was marked as done, it needs to be calculated into the task counter.
        doneCount = (doneCount - 1);
        document.getElementById("table").deleteRow(i);
        saveToStorage();
    }
    countTasks();
}
/*For some reason 'var doneCount' was saved to localStorage as a string,
so it needed to be turned into a number for the program to work. */
var newDoneCount = Number(localStorage.getItem("thingsDone"));
var doneCount = 0 + newDoneCount;
//Function to mark a row as done by using strikethrough.
function markAsDone(row) {
//Everytime the button is pressed and function is run, the count of tasks done needs to be incremented.
    doneCount = doneCount + 1;
    //Finding the right row index number.
    var j = row.parentNode.parentNode.rowIndex;
    var table = document.getElementById("table");
    /*Line is drawn through the text and a green check mark appears to mark the task done.
    Removing the onclick-listener from the button to make sure the button isn't
    pressed twice and giving a false count.*/
    table.rows[j].cells[1].style.textDecoration="line-through";
    table.rows[j].cells[2].innerHTML="<button>Done</button>";
    table.rows[j].cells[0].innerHTML="✓";
    table.rows[j].cells[0].style.color="green";
    saveToStorage();
    countTasks();
}
//Function to load the table when the page is loaded.
function loadTable() {
    //Inserting the saved table to the table element.
    document.getElementById("table").innerHTML=localStorage.getItem("thingsToDo");
    countTasks();
}