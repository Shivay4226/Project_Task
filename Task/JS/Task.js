// All input Variables
let ProjectId = document.getElementById("projectId");
let TaskName = document.getElementById("task_name");
let Description1 = document.getElementById("desc");
let Team1 = document.getElementById("team_group");
// let Technology = document.getElementById("technology")
let Startdate1 = document.getElementById("start_date");
let EndDate1 = document.getElementById("end_date");
let currUpdateBtn1 = document.getElementById("addtask_btn1");
let tbody1 = document.getElementById("tbody1");

//find rowIndex
let teamData = [];
function findRow(rowIndex) {
  ProjectList = displayedData;
  let rowId = displayedData[rowIndex];
  ProjectId.value = rowId.id;
  console.log("ProjectID------>>>", ProjectId.value);
  if (rowId.hasOwnProperty("Team")) {
    Team1.value = rowId.Team;
    // Add the 'Team' property value to the 'teamData' array
    teamData.push(rowId.Team);
  } else {
    Team1.value = "";
  }
  console.log("Teamdata------>>>", teamData);

  Startdate1 = document.getElementById("start_date");
  Startdate1.value = rowId.StartDate;
  let StartTaskDate = Startdate1.value;
  console.log("StartDate----->>", StartTaskDate);
  EndDate1 = document.getElementById("end_date");
  EndDate1.value = rowId.EndDate;
  let EndTaskDate = EndDate1.value;
  console.log("EndDate----->>", EndTaskDate);
  //set the date
  localStorage.setItem("StartTaskDate", StartTaskDate);
  localStorage.setItem("EndTaskDate", EndTaskDate);
  //get the date
  let prevStartdate = localStorage.getItem("StartTaskDate");
  let prevEnddate = localStorage.getItem("EndTaskDate");
  Startdate1.min = prevStartdate;
  Startdate1.max = prevEnddate;
  EndDate1.min = prevStartdate;
  EndDate1.max = prevEnddate;

  // to fetch Team data in ProjectList Array and show in dropdown
  var select = document.getElementById("team_group");
  var options = select.options;
  var selectLength = options.length;
  // Remove existing options
  for (var i = 0; i < selectLength;) {
    options.remove(i);
    selectLength = options.length;
  }
  // Split teamData into an array of team names and add options for each one
  teamData = teamData.join().split(",");
  for (var i = 0; i < teamData.length; i++) {
    var team = teamData[i].trim();
    var newOption = new Option(team, team);
    select.add(newOption);
  }
}
// Check for Task List
let TaskList = [];
if (localStorage.getItem("task")) {
  TaskList = JSON.parse(localStorage.getItem("task"));
  console.log("found local storage");
} else {
  console.log("no local storage found");
}
//generate Id
let taskId = TaskList.length;
let maximumId = localStorage.getItem("taskId") || taskId;
function generateTaskId() {
  const newTaskId = ++maximumId;
  localStorage.setItem("taskId", newTaskId);
  return newTaskId;
}

// ProjectName dropdown list
// var select = document.getElementById('ProjectName').options.length;
// for (var i = 0; i < ProjectList.length; i++) {
//   var newSelect = document.createElement('option');
//   selectHTML = "<option value='" + ProjectList[i].ProjectName + "'>" + ProjectList[i].ProjectName + "</option>"
//   findRow(i)
//   newSelect.innerHTML = selectHTML;
//   document.getElementById('ProjectName').add(newSelect);
// }
// Generate ID
// let currentId1 = 0;
// let highestId1 = 0;
// function generateId() {
//   if (highestId1 === currentId1) {
//     currentId1++;
//     highestId1 = currentId1;
//   } else {
//     currentId1 = highestId1 + 1;
//     highestId1 = currentId1;
//   }
//   return currentId1;
// }
// Create Product
function createTaskProject() {
  debugger;
  let thisProd = {
    TaskId: generateTaskId(),
    id: parseFloat(ProjectId.value),
    TaskName: TaskName.value,
    Description1: Description1.value,
    Team1: Team1.value,
    // Technology: Technology.value,
    Startdate1: Startdate1.value,
    EndDate1: EndDate1.value,
  };
  TaskList.push(thisProd);
  saveTask();
  document.getElementById("myInput").value = "";
  showData();
  ClearForm();
  document.getElementById("Add_Task").setAttribute("data-dismiss", "modal");
}

// Save Data in LocalStorage
function saveTask() {
  localStorage.setItem("task", JSON.stringify(TaskList));
  console.log("done!");
}

// Clear Inputs after creating a product like in delete function
function ClearForm() {
  TaskName.value = "";
  Description1.value = "";
  Team1.value = "";
  // Technology.value = "";
  Startdate1.value = "";
  EndDate1.value = "";
  document.getElementById("team_group").innerHTML = "";
  teamData = [];
}

// Delete a product
function deleteTask(i) {
  debugger;
  if (confirm("Do you want to delte you Project Row?")) {
    TaskList.splice(i, 1);
    localStorage.task = JSON.stringify(TaskList);
    showData();
  }
}

// Submit button ( Create Or Update)
function submitTask() {
  let taskname = TaskName.value;
  let description1 = Description1.value;
  let team1 = Team1.value;
  let startdate = Startdate1.value;
  let enddate = EndDate1.value;

  let textRegex = /^(?![\s-])[\w\s-]+$/;
  let dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!taskname.match(textRegex)) {
    document.getElementById("taskError").innerText = "Please enter a valid Task name";
    return false;
  }else{
    document.getElementById("taskError").innerText = "";
  }
  if (!description1.match(textRegex)) {
    document.getElementById("taskdesc").innerText = "Please enter a valid Task description";
    return false;
  }else{
    document.getElementById("taskdesc").innerText = "";
  }
  if (team1 == "") {
    document.getElementById("taskteam").innerHTML = "Please select a team";
    return false;
  }
  if (!startdate.match(dateRegex)) {
    document.getElementById("taskStartdate").innerHTML = "Please select a valid start date";
    return false;
  }else{
    document.getElementById("taskStartdate").innerHTML = "";
  }
  if (!enddate.match(dateRegex)) {
    document.getElementById("taskEnddate").innerHTML = "Please select a valid start date";
    return false;
  }else{
    document.getElementById("taskEnddate").innerHTML = "";
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
function updateTask(i) {
  let teamValue = [];
  let task = TaskList[i];
  document.getElementById("team_group").innerHTML = "";
  currUpdateBtn1 = i;
  let project = orginalArray.find(project => project.id === task.id);
  ProjectId.value = TaskList[i].id;
  TaskName.value = TaskList[i].TaskName;
  Description1.value = TaskList[i].Description1;
  Startdate1.value = TaskList[i].Startdate1;
  EndDate1.value = TaskList[i].EndDate1;
  var select = document.getElementById("team_group");
  let teamData = project.Team;
  teamValue.push(teamData);
  var options = select.options;
  var selectLength = options.length;
  for (var i = 0; i < selectLength;) {
    options.remove(i);
    selectLength = options.length;
  }
  teamValue = teamValue.join().split(",");
  for (var i = 0; i < teamValue.length; i++) {
    var team = teamValue[i].trim();
    var newOption = new Option(team, team);
    select.add(newOption);
  }
  document.getElementById("Add_Task").setAttribute("value", "Update");
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// submit the update data
function submitUpdateTask(i) {
  TaskList[i].TaskName = TaskName.value;
  TaskList[i].ProjectId = ProjectId.value;
  TaskList[i].Description1 = Description1.value;
  TaskList[i].Team1 = Team1.value;
  TaskList[i].Startdate1 = Startdate1.value;
  TaskList[i].EndDate1 = EndDate1.value;
  localStorage.task = JSON.stringify(TaskList);
  showData();
  document.getElementById("Add_Task").setAttribute("value", "Add");
  ClearForm();
  document.getElementById("Add_Task").setAttribute("data-dismiss", "modal");
}

//cancel button function
function cancelTaskOption() {
  if ((document.getElementById("myInput").value = "")) {
    return showData();
  } else if (document.getElementById("update")) {
    return (
      document.getElementById("Add_Task").setAttribute("value", "Add") ||
      ClearForm()
    );
  }
}
// show the data into the table
showData();
