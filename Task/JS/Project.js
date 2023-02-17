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
if (localStorage.getItem("products")) {
  ProjectList = JSON.parse(localStorage.getItem("products"));
  console.log("found local storage");
} else {
  console.log("no local storage found");
}
//generate id
let currentId = 0;
function generateId() {
  currentId++;
  return currentId;
}
// Create Product
function createProject() {
  debugger;
  let thisProd = {
    id: generateId(),
    ProjectName: ProjectName.value,
    Description: Description.value,
    Technology: Technology.value,
    Team: Team.value,
    StartDate: Startdate.value,
    EndDate: EndDate.value
  };
  ProjectList.push(thisProd);
  saveProject();
  showData();
  clearInput();
}
// Save Data in LocalStorage
function saveProject() {
  localStorage.setItem("products", JSON.stringify(ProjectList));
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
  document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
				checkbox.checked = false;
			});
  }



// Read and Show Data In Table (output)
function showData() {
  let table = ``;
  for (let i = 0; i < ProjectList.length; i++) {
    table +=  `  
                    <tr rows${i}>
                        <td>${ProjectList[i].ProjectName}</td>
                        <td>${ProjectList[i].Description}</td>
                        <td>${ProjectList[i].Team}</td> 
                        <td>${ProjectList[i].Technology}</td>
                        <td>${ProjectList[i].StartDate}</td>
                        <td>${ProjectList[i].EndDate}</td>
                    <td><input id ="update" data-toggle="modal" data-target="#myModal" style="color: white;background-color: green;border-radius: 7px;"  onclick="updateProject(${i})" type="button" value="Update"></td>
                        <td><input id = "delete(${i})"  style="color: white;background-color: red;border-radius: 7px;" onclick="deleteProject(${i})" type="button" value="Delete"></td>
                        <td><input   data-toggle="modal"data-target="#myModal1" id="addtask_btn1(${i})"  style="color: white;background-color: grey;border-radius: 7px;"type="button" value="Add Task"></td>
                    </tr>`;
  }
  tbody.innerHTML = table;
}
// Delete a product
function deleteProject(i) {
  debugger;
  if (confirm("Do you want to delte you records?")) {
    ProjectList.splice(i, 1);
    localStorage.products = JSON.stringify(ProjectList);
    showData();
  }
}
// Submit button ( Create Or Update)
function submit() {
    let projectName = ProjectName.value;
    let description = Description.value;
    let team = Team.value;
    let technology = Technology.value;
    let startDate = Startdate.value;
    let endDate = EndDate.value;
  
    let textRegex = /^[^\s].+[^\s]$/;
    let dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    var regex = /\s/g;
  
    if (!projectName.match(textRegex)) {
      alert("Please Enter Project Name, Starting space not allowed");
      return false;
    }
    if (!description.match(textRegex)) {
      alert("Please Enter Discripton, Starting space not allowed");
      return false;
    }
    if (team == "") {
      alert("Please Select Developer");
      return false;
    }
    if (technology == "") {
      alert("Please Select Technology");
      return false;
    }
    if (!startDate.match(dateRegex)) {
      alert("Please Select Start Date");
      return false;
    }
    if (!endDate.match(dateRegex)) {
      alert("Please Select End Date");
      return false;
    }
    
    // Add datepicker validation for end date
    const startDateField = document.getElementById("startdate");
    const endDateField = document.getElementById("endDate");
  
    startDateField.addEventListener("change", function () {
      endDateField.min = startDateField.value;
    });
  
    // Add validation for end date
    const selectedStartDate = new Date(startDate);
    const selectedEndDate = new Date(endDate);
    if (selectedEndDate < selectedStartDate) {
      alert('End date cannot be less than start date');
      return false;
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
  currUpdateBtn = i;
  ProjectName.value = ProjectList[i].ProjectName;
  Description.value = ProjectList[i].Description;
  Team.value = ProjectList[i].Team;
  Technology.value = ProjectList[i].Technology;
  Startdate.value = ProjectList[i].StartDate;
  EndDate.value = ProjectList[i].EndDate;
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
  localStorage.products = JSON.stringify(ProjectList);
  showData();
  document.getElementById("create").setAttribute("value", "Create");
  clearInput();
}
//cancel option function
function cancelOption() {
  if (document.getElementById("update") && document.getElementById("technology") && document.getElementById("team")) {
    return (
      document.getElementById("create").setAttribute("value", "Create") ||
      clearInput()
    );
  }
}
//dropdown function
 const checkboxLists = document.querySelectorAll('.list, .list1');

        function toggleList(list) {
            list.classList.toggle('show');
        }

        function handleCheckboxChange(inputField, selectField, checkboxes) {
            const checkedBoxes = [...checkboxes].filter(checkbox => checkbox.checked);
            const selectedTasksText = checkedBoxes.map(checkbox => checkbox.parentNode.textContent.trim()).join(', ');
            inputField.value = selectedTasksText;
            selectField.classList.toggle('selected', checkedBoxes.length > 0);
        }

        function initializeMultiSelector(selector) {
            const inputField = selector.querySelector('.input-selector');
            const selectField = selector.querySelector('.select-field, .select-field1');
            const checkboxes = selector.querySelectorAll('input[type="checkbox"]');

            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    handleCheckboxChange(inputField, selectField, checkboxes);
                });
            });

            inputField.addEventListener('click', () => {
                toggleList(selector.querySelector('.list, .list1'));
            });
        }

        checkboxLists.forEach(list => {
            initializeMultiSelector(list.parentNode);
        });
showData();
