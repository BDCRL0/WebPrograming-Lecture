document.addEventListener("DOMContentLoaded", () => loadSampleData());

function loadSampleData() {
  const sampleData = [
    ["John Doe", 25, "New York", "USA"],
    ["Jane Smith", 30, "London", "UK"],
    ["Carlos Garcia", 27, "Madrid", "Spain"],
    ["Aiko Tanaka", 22, "Tokyo", "Japan"]
  ];
  sampleData.forEach(data => addRowToTable(data));
}

function addRow() {
  const name = document.getElementById("name").value.trim();
  const age = parseInt(document.getElementById("age").value);
  const city = document.getElementById("city").value.trim();
  const country = document.getElementById("country").value.trim();

  if (!(name && age && city && country)) {
    alert("Please fill in all fields.");
    return;
  }

  // Length and range validation
  if (
    name.length < 2 || name.length > 30 ||
    isNaN(age) || age < 1 || age > 120 ||
    city.length < 2 || city.length > 50 ||
    country.length < 2 || country.length > 50
  ) {
    alert("Invalid input: Please check the field lengths and age range.");
    return;
  }

  // Duplicate check
  const rows = Array.from(document.querySelectorAll("#dataTable tbody tr"));
  const exists = rows.some(row => {
    const cells = row.querySelectorAll("td");
    return (
      cells[0].textContent === name &&
      cells[1].textContent === String(age) &&
      cells[2].textContent === city &&
      cells[3].textContent === country
    );
  });

  if (exists && !confirm("This row already exists. Add anyway?")) return;

  addRowToTable([name, age, city, country]);
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("city").value = "";
  document.getElementById("country").value = "";
}

function addRowToTable(data) {
  const table = document.querySelector("#dataTable tbody");
  const row = document.createElement("tr");

  data.forEach(item => {
    const td = document.createElement("td");
    td.textContent = item;
    row.appendChild(td);
  });

  const actions = document.createElement("td");
  actions.innerHTML = `
    <button onclick="editRow(this)">Modify</button>
    <button onclick="deleteRow(this)">Delete</button>
  `;
  row.appendChild(actions);

  table.appendChild(row);
}

function deleteRow(button) {
  const confirmed = confirm("Are you sure you want to delete this row?");
  if (confirmed) {
    button.parentElement.parentElement.remove();
  }
}

function editRow(button) {
  const row = button.parentElement.parentElement;
  const cells = row.querySelectorAll("td");

  for (let i = 0; i < 4; i++) {
    const input = document.createElement("input");
    input.value = cells[i].textContent;
    input.required = true;
    if (i === 1) { 
      input.type = "number";
      input.min = "1";
      input.max = "120";
    } else {
      input.type = "text";
      input.minLength = 2;
      input.maxLength = (i === 0 ? 30 : 50); 
    }
    cells[i].textContent = "";
    cells[i].appendChild(input);
  }

  button.textContent = "Save";
  button.onclick = () => saveEdit(button);
}

function saveEdit(button) {
  const row = button.parentElement.parentElement;
  const cells = row.querySelectorAll("td");

  const values = [];
  for (let i = 0; i < 4; i++) {
    const input = cells[i].querySelector("input");
    const value = input.value.trim();

    if (!value) {
      alert("All fields are required.");
      return;
    }

    if (i === 1) { 
      const age = parseInt(value);
      if (isNaN(age) || age < 1 || age > 120) {
        alert("Age must be a number between 1 and 120.");
        return;
      }
      values.push(age);
    } else {
      if (
        value.length < 2 ||
        (i === 0 && value.length > 30) || 
        ((i === 2 || i === 3) && value.length > 50) 
      ) {
        alert("Invalid input length.");
        return;
      }
      values.push(value);
    }
  }

  for (let i = 0; i < 4; i++) {
    cells[i].textContent = values[i];
  }

  button.textContent = "Modify";
  button.onclick = () => editRow(button);
}

function sortTable(index) {
  const table = document.getElementById("dataTable");
  const rows = Array.from(table.rows).slice(1);
  rows.sort((a, b) => a.cells[index].textContent.localeCompare(b.cells[index].textContent));
  table.tBodies[0].append(...rows);
}

function searchTable() {
  const filter = document.getElementById("search").value.toLowerCase();
  document.querySelectorAll("#dataTable tbody tr").forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(filter) ? "" : "none";
  });
}
