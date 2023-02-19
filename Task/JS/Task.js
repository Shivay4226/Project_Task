let ProjectId = document.getElementById("projectId")
let TaskName = document.getElementById("task_name")
let Description1 = document.getElementById("desc")
let Team1 = document.getElementById("team_group")
// let Technology = document.getElementById("technology")
let Startdate1 = document.getElementById("start_date")
let EndDate1 = document.getElementById("end_date")
let currUpdateBtn1 = document.getElementById("addtask_btn1")
let tbody1 = document.getElementById("tbody1");

// Check for Product List in Local Storage
var ProjectList1 = [];
if (localStorage.getItem("task")) {
    ProjectList1 = JSON.parse(localStorage.getItem("task"))
    console.log("found local storage");
} else {
    console.log("no local storage found");
}

function findRow(index){
    var rowID = ProjectList[index]
     ProjectId.value = rowID.id;
    Team1.value = rowID.Team;
    console.log("team--->>",Team1.value);
    console.log("id------->>>",ProjectId.value);
}

var select = document.getElementById('team_group').options.length;
for (var i = 0; i < select; ) {
  document.getElementById('team_group').options.remove(i);
}
console.log("ProjectList Array------>>>",ProjectList)
for (var i = 0; i < ProjectList.length; i++) {
    var newSelect = document.createElement('option');
    // var ID  = 
    selectHTML = "<option value='" + ProjectList[i].Team + "'>" + ProjectList[i].Team + "</option>";
    newSelect.innerHTML = selectHTML;
    document.getElementById('team_group').add(newSelect);
  }

  // ProjectName dropdown list 
  var select = document.getElementById('ProjectName').options.length;
    for (var i = 0; i < select; ) {
        document.getElementById('ProjectName').options.remove(i);
      }
      for (var i = 0; i < ProjectList.length; i++) {
        var newSelect = document.createElement('option');
        selectHTML = "<option value='" + ProjectList[i].ProjectName + "'>" + ProjectList[i].ProjectName + "</option>";
        newSelect.innerHTML = selectHTML;
        document.getElementById('ProjectName').add(newSelect);
      }
      
// Create Product
function createTaskProject() {
    let thisProd = {
        id: ProjectId.value,
        TaskName:TaskName.value,
        Description1: Description1.value,
        Team1: Team1.value,
        // Technology: Technology.value,
        Startdate1: Startdate1.value,
        EndDate1: EndDate1.value
    }
    ProjectList1.push(thisProd);
    saveProj();
    showData();
    ClearForm();
}
// Save Data in LocalStorage
function saveProj() {
    localStorage.setItem("task", JSON.stringify(ProjectList1));
    console.log("done!");
}
// Clear Inputs after creating a product
function ClearForm() {
    TaskName.value = "";
    Description1.value = "";
    Team1.value = "";
    // Technology.value = "";
    Startdate1.value = "";
    EndDate1.value = "";
}
// Read and Show Data In Table (output)
// function showData() {
//     let table1 = ``;
//     for (let i = 0; i < ProjectList1.length; i++) {
//         table1 += `           <tr>
//                         <td>${ProjectList1[i].TaskName}</td>
//                         <td>${ProjectList1[i].Description1}</td>
//                         <td>${ProjectList1[i].Team1}</td>
//                         <td>${ProjectList1[i].Startdate1}</td>
//                         <td>${ProjectList1[i].EndDate1}</td>
//                     <td><input id = "update1" data-toggle="modal" data-target="#myModal1" style="color: white;background-color: green;border-radius: 7px;"  onclick="updateProj(${i})" type="button" value="Update"></td>
//                         <td><input  style="color: white;background-color: red;border-radius: 7px;" onclick="deleteProj(${i})" type="button" value="Delete"></td>
//                     </tr>`
//     }
//     tbody1.innerHTML = table1;
// }
// Delete a product
function deleteProj(i) {
    if (confirm("Do you want to delte you records?")) {
        ProjectList1.splice(i, 1);
        localStorage.task = JSON.stringify(ProjectList1);
        showData();
    }
}
// Submit button ( Create Or Update)
function submitTask() {
    //debugger;
    let taskname = TaskName.value;
    let description1 = Description1.value;
    let team1 = Team1.value;
    // let technology = Technology.value;
    let startdate1 = Startdate1.value;
    let enddate1 = EndDate1.value;

    let textRegex = /^[^\s].+[^]$/;
    let dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    var regex = /\s/g;

    if (!taskname.match(textRegex)) {
        alert("Please Enter Task Name, Starting space not allowed");
        return false;
    }
    if (!description1.match(textRegex)) {
        alert("Please Enter Description, Starting space not allowed");
        return false;
    }
    if (team1 == "") {
        alert("Please Select Developer");
        return false;
    }
    // if (technology == "") {
    //     alert("Please Select Technology");
    //     return false;
    // }
    if (!startdate1.match(dateRegex)) {
        alert("Please Select Start Date");
        return false;
    }
    if (!enddate1.match(dateRegex)) {
        alert("Please Select End Date");
        return false;
    }
    if (new Date(startdate1) >= new Date(enddate1)) {
        alert("End date must be bigger than start date");
        return false;
    }
    let btnValue = document.getElementById("Add_Task").getAttribute("value");
    console.log(btnValue);
    if (btnValue == "Add") {
        createTaskProject();
    } else if (btnValue == "Update") {
        submitUpdateTask(currUpdateBtn1);
    }
}
// Update a product
function updateProj(i) {
   // debugger;
   currUpdateBtn1 = i;
    TaskName.value = ProjectList1[i].TaskName;
    Description1.value = ProjectList1[i].Description1;
    Team1.value = ProjectList1[i].Team1;
    // Technology.value = ProjectList1[i].Technology;
    Startdate1.value = ProjectList1[i].Startdate1;
    EndDate1.value = ProjectList1[i].EndDate1;
    document.getElementById("Add_Task").setAttribute("value", "Update");
    scroll({
        top: 0,
        behavior: "smooth"
    })
}
function submitUpdateTask(i) {
   // debugger;
    ProjectList1[i].TaskName = TaskName.value;
    ProjectList1[i].Description1 = Description1.value;
    ProjectList1[i].Team1 = Team1.value;
    // ProjectList1[i].Technology = Technology.value;
    ProjectList1[i].Startdate1 = Startdate1.value;
    ProjectList1[i].EndDate1 = EndDate1.value;
    localStorage.task = JSON.stringify(ProjectList1);
    showData();
    document.getElementById("Add_Task").setAttribute("value", "Add");
    ClearForm();
}
function cancelTaskOption(){
    //debugger
    if(document.getElementById("update")){
        return  document.getElementById("Add_Task").setAttribute("value", "Add") || ClearForm();
    }
    
}
showData();
