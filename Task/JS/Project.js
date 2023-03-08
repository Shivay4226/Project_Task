// All input Variables
let ProjectName = document.getElementById("projectname");
let Description = document.getElementById("description");
let Team = document.getElementById("team");
let Technology = document.getElementById("technology");
let Startdate = document.getElementById("startdate");
let EndDate = document.getElementById("enddate");
let currUpdateBtn = document.getElementById("addtask_btn");
let tbody = document.getElementById("tbody");

// Check for Product List in Local Storage
let ProjectList = [];
if (localStorage.getItem("projects")) {
  ProjectList = JSON.parse(localStorage.getItem("projects"));
  console.log("found local storage");
} else {
  console.log("no local storage found");
}

//generate id can we add condition if projectList is has no data them start 1 other start heighest
let currentId1 = ProjectList.length;
let highestId1 = localStorage.getItem("highestId") || currentId1;
function generateId() {
  const newId = ++highestId1;
  localStorage.setItem("highestId", newId);
  return newId;
}

// Create Product
function createProject() {
  let thisProd = {
    id: generateId(),
    ProjectName: ProjectName.value,
    Description: Description.value,
    Technology: Technology.value,
    Team: Team.value,
    StartDate: Startdate.value,
    EndDate: EndDate.value,
  };
  orginalArray.unshift(thisProd);
  saveProject();
  document.getElementById("myInput").value = "";
  showData();
  clearInput();
  document.getElementById("create").setAttribute("data-dismiss", "modal")
}

// Save Data in LocalStorage
function saveProject() {
  localStorage.setItem("projects", JSON.stringify(orginalArray));
  console.log("done!");
}
// Clear Inputs after creating a product
function clearInput() {
  ProjectName.value = "";
  Description.value = "";
  Team.value = "";
  Technology.value = "";
  Startdate.value = "";
  EndDate.value = "";
  document
    .querySelectorAll('input[type="checkbox"]')
    .forEach(function (checkbox) {
      checkbox.checked = false;
    });
}

   //search function
   let filterArray = [];
   let search;
   function Search() {
     var filterValue = document.getElementById("myInput").value;
     // Check if input is empty
     search = filterValue;
     console.log(search);
     var table = document.getElementById("table");
     //Here
     var headerRow = table.rows[0];
     let filteredData = orginalArray.filter(
       (x) =>
       x.ProjectName.toLowerCase().includes(filterValue.toLowerCase()) ||
       x.Description.toLowerCase().includes(filterValue.toLowerCase()) ||
       x.Team.toLowerCase().includes(filterValue.toLowerCase()) ||
       x.Technology.toLowerCase().includes(filterValue.toLowerCase()) ||
       x.StartDate === parseInt(filterValue) ||
       x.EndDate.includes(filterValue)
     );
     filterArray = filteredData;
     console.log("FilterArray----->>", filterArray);
     showData();
     table.prepend(headerRow);
     if (search == "" || document.getElementById == "") {
       return showData();
     }
   }
//sort function
let sortDirection = "asc";
let data;
const table1 = document.getElementById("table");
const headers = table1.querySelectorAll("th");
headers.forEach((header, headerIndex) => {
 header.addEventListener("click", () => {
   sortData(headerIndex);
 });
});
function sortData(headerIndex) {
 if (document.getElementById("myInput").value.toUpperCase() != "") {
   orginalArray = filterArray;
 }
 else{
   totalData = orginalArray;
 }
 if (headerIndex === 0) {
   return;
 }
 sortDirection = sortDirection === "asc" ? "desc" : "asc";
 const multiplier = sortDirection === "asc" ? 1 : -1;
 data = orginalArray.sort((project1, project2) => {
  const value1 = project1[Object.keys(project1)[headerIndex]].toLowerCase();
  const value2 = project2[Object.keys(project2)[headerIndex]].toLowerCase();
  if (headerIndex === 2 || headerIndex === 3) { // Team or Technology column
    const arr1 = value1.split(',')
    const arr2 = value2.split(',')
    for (let i = 0; i < Math.min(arr1.length, arr2.length); i++) {
      if (arr1[i] < arr2[i]) return -1 * multiplier;
      else if (arr1[i] > arr2[i]) return 1 * multiplier;
    }
    return arr1.length - arr2.length; // If arrays have the same elements up to a point, sort the shorter array first
  } else {
    if (value1 > value2) return 1 * multiplier;
    else if (value1 < value2) return -1 * multiplier;
    else return 0;
  }
});
 console.log("sortdata---->>>>",data)
 // Render the rows in sorted order
showData();
 changeIcon(sortDirection, headerIndex);
}
function changeIcon(sortDirection, headerIndex) {
 const headers = table.querySelectorAll("th");
 for (let i = 0; i < headers.length; i++) {
   const icon = headers[i].firstElementChild;
   if (icon) {
     icon.className = "fa-solid";
   }
 }
 const clickedHeaderIcon = headers[headerIndex].firstElementChild;
 if (clickedHeaderIcon) {
   clickedHeaderIcon.className +=
     sortDirection === "asc"
       ? " fa-solid fa-caret-down active"
       : " fa-solid fa-caret-up active";
 }
}
//toggle function
let showTasksForProject = {};
function toggleTasks(id) {
  showTasksForProject[id] = !showTasksForProject[id];
  showData();
}

// for dropdown call
const dropdown = document.getElementById("maxRows");
const nextButton = document.getElementById("next");
const numberButton = document.getElementById("number")
const prevButton = document.getElementById("prev");
// Set initial page and rows per page
let currentPage = 1;
let rowsPerPage = parseFloat(dropdown.options[dropdown.selectedIndex].value);
// Add event listeners to dropdown and next button
dropdown.addEventListener("change", updateTable);
nextButton.addEventListener("click", goToNextPage);
prevButton.addEventListener("click", goToPrevPage);

// Function to update table
function updateTable() {
  rowsPerPage = parseFloat(dropdown.options[dropdown.selectedIndex].value);
  currentPage = 1; // Reset to first page
  showData();
}
// Function to go to the next page 
function goToNextPage() {
  const totalRows = orginalArray.length;
  const lastPage = Math.ceil(totalRows / rowsPerPage);
  currentPage = currentPage < lastPage ? currentPage + 1 : currentPage;
  showData();
}
//go previous page
function goToPrevPage() {
    currentPage = currentPage > 1 ? currentPage - 1 : currentPage;
    showData();
}
function goToPage(page) {
  currentPage = page;
  showData();
}

let displayedData;
let orginalArray = ProjectList; 
let totalData = orginalArray;
let totalPages = Math.ceil(orginalArray.length / rowsPerPage);
function showData() {
  let table = ``;
  if(document.getElementById("myInput").value == ""){
    orginalArray = totalData
  }
  //this lines of code start filter
  let filterBy = rowsPerPage;
  let startIndex = (currentPage - 1) * rowsPerPage;
  let endIndex = startIndex + rowsPerPage;
  // Slice original array based on current page and dropdown value write css for this pagination
  displayedData = orginalArray.slice(startIndex, endIndex);
  if (document.getElementById("myInput").value.toUpperCase() != "") {
    ProjectList = filterArray;
    displayedData = ProjectList;
  } 
  else if (document.getElementById("maxRows").value != "") {
    ProjectList = orginalArray.slice(0, filterBy);
    console.log(ProjectList,"ProjectList----->>>")
  }
  else if(goToNextPage){
    displayedData = ProjectList.slice(startIndex, endIndex);
  }
  else {
    ProjectList = orginalArray;
  }
  
  // this line of code to add number of rows in current page in pagination 
  const totalRows = orginalArray.length;
  const lastPage = Math.ceil(totalRows / rowsPerPage);
  let pagination = "";
  // Generate pagination buttons for current range of pages
  if (startIndex > 1) {
    pagination += `<button class="page btn btn-outline-secondary" onclick="goToPage(1)">1</button>`;
    if (startIndex > 2) {
      pagination += `<span class="page-separator">...</span>`;
    }
  }
  const maxPagesToShow = 3;
  let startRange = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endRange = Math.min(lastPage, startRange + maxPagesToShow - 1);
  startRange = Math.max(1, endRange - maxPagesToShow + 1);
  for (let i = startRange; i <= endRange; i++) {
    const activeClass = i === currentPage ? "active1" : "";
    pagination += `<button id="page_${i}" class="page btn btn-outline-secondary ${activeClass}" onclick="goToPage(${i})">${i}</button>`;
  }
  if (endIndex < lastPage-1) {
    if (endIndex < lastPage - 1) {
      pagination += `<span class="page-separator">...</span>`;
    }
    pagination += `<button class="page btn btn-outline-secondary" onclick="goToPage(${lastPage})">${lastPage}</button>`;
  }
  document.getElementById("number").innerHTML = pagination;
  // Loop through displayed data to generate table
 for (let i = 0; i < displayedData.length; i++) {
  let project = displayedData[i];
  let id = project.id;
  let showTasks = showTasksForProject[id];
  let hasTasks = TaskList.some((task) => task.id === id);

  // check if the project has any tasks
  let toggleButton = "";
  if (hasTasks) {
    toggleButton = `<input onclick="toggleTasks(${id})" id="toggleButton" style=" background-color: ${hasTasks && showTasks ? "red" : "#1ABD31" }; color: white; border-radius: 50%; width:26px" type="button" value="${hasTasks && showTasks ? "-" : "+"}" />`
  }

  table += `  
    <tr>
      <td>${toggleButton}</td>
      <td>${project.ProjectName}</td>
      <td>${project.Description}</td>
      <td>${project.Team}</td> 
      <td>${project.Technology}</td>
      <td>${project.StartDate}</td>
      <td>${project.EndDate}</td>
      <td><input id="update" data-toggle="modal" data-target="#myModal" style="color: white;background-color: green;border-radius: 7px;" onclick="updateProject(${i})" type="button" value="Update"></td>
      <td><input id="delete${i}" style="color: white;background-color: red;border-radius: 7px;" onclick="deleteProject(${i})" type="button" value="Delete"></td>
      <td><input onclick="findRow(${i})" data-id="id${i}" data-toggle="modal" data-target="#myModal1"data-dismiss="modal" id="addtask_btn" style="color: white;background-color: grey;border-radius: 7px;" type="button" value="Add Task"></td>
    </tr>`;
      //for if project has no task then not show task Header
      if (showTasks && hasTasks) {
        let hasTasks = false;
        // check if the project has any tasks also
        for (let j = 0; j < TaskList.length; j++) {
          let task = TaskList[j];
          if (task.id === id) {
            hasTasks = true;
            break;
          }
        }
//Task header
    if (hasTasks) {
      table += `
        <tr>
        <th></th>
          <th id = "th";>Task Name</th>
          <th id = "th";>Description</th>
          <th id = "th";>Developer</th> 
          <th id = "th";>Start date</th>
          <th id = "th";>End Date</th>
          <th id = "th";>Update</th>
          <th id = "th";>Delete</th>
        </tr>`;
    }
    // let filteredTasks = TaskList.filter(task => task.id === id);
    // console.log("-------filterTask----->.>",filteredTasks)
      for (let j = 0; j < TaskList.length; j++) {
        let task = TaskList[j];
        console.log("---taskId----->>", task.id);
        if (task.id === id) {
          table += `
            <tr> 
            <td></td>        
              <td id = "td";>${task.TaskName}</td>
              <td id = "td";>${task.Description1}</td>
              <td id = "td";>${task.Team1}</td>
              <td id = "td";>${task.Startdate1}</td>
              <td id = "td";>${task.EndDate1}</td>
              <td id = "td";><input data-toggle="modal" data-target="#myModal1" style="color: white;background-color: #4CAF50;border-radius: 10px 0 10px 0;" onclick="updateTask(${j})" type="button" value="Update"></td>
              <td id = "td";><input id="deleteTask(${j})"  style="color: white;background-color:#f44336;border-radius: 10px 0 10px 0;"" onclick="deleteTask(${j})" type="button" value="Delete"></td>
            </tr>`;
        }
      }
    }
  }
  tbody.innerHTML = table;
}

// Delete a product
function deleteProject(i, k) {
  let task = TaskList;
  if (confirm("Do you want to delete your Project Row?")) {
    ProjectList = displayedData;
    const projectId = displayedData[i].id;
    const originalIndex = orginalArray.findIndex(project => project.id === projectId);
    const projectTasks = task.filter(task => task.id === projectId);
    orginalArray.splice(originalIndex, 1);
    task = task.filter(task => task.id !== projectId); // remove tasks associated with the project
    displayedData = orginalArray.filter(project => project.id !== projectId);
    document.getElementById("myInput").value = "";
    showData();
    localStorage.projects = JSON.stringify(orginalArray);
    localStorage.task = JSON.stringify(task); // update localStorage.task
  }
}

// Submit button ( Create Or Update) 
function submit() {
  document.querySelector("#projectError").innerHTML = "";
  document.querySelector("#descError").innerHTML = "";
  document.querySelector("#teamError").innerHTML = "";
  document.querySelector("#techError").innerHTML = "";
  document.querySelector("#projectStartdate").innerHTML = "";
  document.querySelector("#projectEnddate").innerHTML = "";
  let projectName = ProjectName.value;
  let description = Description.value;
  let team = Team.value;
  let technology = Technology.value;
  let startDate = Startdate.value;
  let endDate = EndDate.value;

  let textRegex = /^(?![\s-])[\w\s-]+$/;
  let dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!projectName.match(textRegex)) {
    document.getElementById("projectError").innerText = "Please enter a valid project name";
    return false;
  }else{
    document.getElementById("projectError").innerText = "";
  }
  if (!description.match(textRegex)) {
  document.getElementById("descError").innerText = "Please enter a valid project description";
    return false;
  }else{
    document.querySelector("#teamError").innerHTML = "";
  }
  if (team == "") {
    document.querySelector("#teamError").innerHTML = "Please select a team";
    return false;
  }
  if (technology == "") {
    document.querySelector("#techError").innerHTML = "Please select a technology";
    return false;
  }else{
    document.querySelector("#projectStartdate").innerHTML = "";
  }
  if (!startDate.match(dateRegex)) {
    document.querySelector("#projectStartdate").innerHTML = "Please select a valid start date";
    return false;
  }else{
    document.querySelector("#projectStartdate").innerHTML = "";
  }
  if (!endDate.match(dateRegex)) {
    document.querySelector("#projectEnddate").innerHTML = "Please select a valid end date";
    return false;
  }else{
    document.querySelector("#projectEnddate").innerHTML = "";
  }
    // Add datepicker validation for end date
    const selectedStartDate = new Date(startDate);
    const selectedEndDate = new Date(endDate);
    if (selectedEndDate < selectedStartDate) {
      document.querySelector("#projectEnddate").innerHTML = "End date cannot be less than start date";
      return false;
    }else{
      document.querySelector("#projectEnddate").innerHTML = "";
    }

  let btnValue = document.getElementById("create").getAttribute("value");
  console.log(btnValue);
  if (btnValue == "Create") {
    createProject();
  } else if (btnValue == "Update") {
    submitUpdate(currUpdateBtn);
  }
}

// Update a product 
function updateProject(i) {
  debugger;
  ProjectList = displayedData;
  currUpdateBtn = i;
  ProjectName.value = displayedData[i].ProjectName;
  Description.value = displayedData[i].Description;
  Team.value = displayedData[i].Team;
  Technology.value = displayedData[i].Technology;
  Startdate.value = displayedData[i].StartDate;
  EndDate.value = displayedData[i].EndDate;
  // Check Team field
  const teamCheckboxes = document.querySelectorAll('#team input[type="checkbox"]');
  teamCheckboxes.forEach(function (checkbox) {
    if (ProjectList[i].Team.includes(checkbox.parentNode.textContent.trim())) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });
  //technology
  const techCheckboxes = document.querySelectorAll('#technology input[type="checkbox"]');
  techCheckboxes.forEach(function (checkbox) {
    if (ProjectList[i].Technology.includes(checkbox.parentNode.textContent.trim())) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });
  document.getElementById("create").setAttribute("value", "Update");
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//submit update data
function submitUpdate(i) {
  ProjectList[i].ProjectName = ProjectName.value;
  ProjectList[i].Description = Description.value;
  ProjectList[i].Team = Team.value;
  ProjectList[i].Technology = Technology.value;
  ProjectList[i].StartDate = Startdate.value;
  ProjectList[i].EndDate = EndDate.value;
  document.getElementById("myInput").value = "";
  document.getElementById("create").setAttribute("value", "Create");
  localStorage.projects = JSON.stringify(orginalArray);
  showData();
  clearInput();
  document.getElementById("create").setAttribute("data-dismiss", "modal")
}

//cancel option function 
function cancelOption() {
  if(ProjectList.length === 0){
    ProjectName.value = "";
    Description.value = "";
    Team.value = "";
    Startdate.value = "";
    EndDate.value = "";
    document
    .querySelectorAll('input[type="checkbox"]')
    .forEach(function (checkbox) {
      checkbox.checked = false;
    });
    document.getElementById("myInput").value = "";
  }
  else if (
    document.getElementById("update") &&
    document.getElementById("technology") &&
    document.getElementById("team") &&
    document.getElementById("myInput") || search
    
  ) {
    return (
      document.getElementById("create").setAttribute("value", "Create") ||
      clearInput()
    );
  }
}
//dropdown function 
const checkboxLists = document.querySelectorAll(".list, .list1");
function toggleList(list) {
  list.classList.toggle("show");
}
function handleCheckboxChange(inputField, selectField, checkboxes) {
  const checkedBoxes = [...checkboxes].filter((checkbox) => checkbox.checked);
  const selectedTasksText = checkedBoxes
    .map((checkbox) => checkbox.parentNode.textContent.trim())
    .join(", ");
  inputField.value = selectedTasksText;
  // selectField.classList.toggle('selected', checkedBoxes.length > 0);
}

function initializeMultiSelector(selector) {
  const inputField = selector.querySelector(".input-selector");
  const selectField = selector.querySelector(".select-field, .select-field1");
  const checkboxes = selector.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      handleCheckboxChange(inputField, selectField, checkboxes);
    });
  });
  inputField.addEventListener("click", () => {
    toggleList(selector.querySelector(".list, .list1"));
  });
}
checkboxLists.forEach((list) => {
  initializeMultiSelector(list.parentNode);
});
// display the the project  
showData();
