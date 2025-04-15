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
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const city = document.getElementById("city").value;
  const country = document.getElementById("country").value;

  if (!(name && age && city && country)) {
    alert("Please fill in all fields.");
    return;
  }

  // Duplicate check
  const rows = Array.from(document.querySelectorAll("#dataTable tbody tr"));
  const exists = rows.some(row => {
    const cells = row.querySelectorAll("td");
    return (
      cells[0].textContent === name &&
      cells[1].textContent === age &&
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
  button.parentElement.parentElement.remove();
}

function editRow(button) {
  const row = button.parentElement.parentElement;
  const cells = row.querySelectorAll("td");

  for (let i = 0; i < 4; i++) {
    const input = document.createElement("input");
    input.value = cells[i].textContent;
    cells[i].textContent = "";
    cells[i].appendChild(input);
  }

  button.textContent = "Save";
  button.onclick = () => saveEdit(button);
}

function saveEdit(button) {
  const row = button.parentElement.parentElement;
  const cells = row.querySelectorAll("td");

  for (let i = 0; i < 4; i++) {
    const value = cells[i].querySelector("input").value;
    cells[i].textContent = value;
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