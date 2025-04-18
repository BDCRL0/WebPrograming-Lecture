const apiUrl = "http://gamf.nhely.hu/ajax2/";
const code = "BDCRL0asdf234";


function createRecord() {
    const name = document.getElementById("ajaxName").value.trim();
    const height = document.getElementById("ajaxHeight").value.trim();
    const weight = document.getElementById("ajaxWeight").value.trim();

    if (!name || !height || !weight || name.length > 30) {
        alert("Please fill all fields correctly (Name max 30 chars).")
        return;
    }

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `op=create&name=${name}&height=${height}&weight=${weight}&code=${code}`
    })
    .then(res => res.text())
    .then(data => document.getElementById("ajaxOutput").textContent = `Create Response: ${data}`)
    .catch(err => console.error(err));
}

function getRecordByCode() {
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `op=read&code=${code}`
    })
    .then(res => res.json())
    .then(data => {
        let output = "";
        data.list.forEach(entry => {
            output += `ID: ${entry.id}, Name: ${entry.name}, Height: ${entry.height}, Weight: ${entry.weight}\n\n`;
        });
        output += `\nTotal Records: ${data.list.length}`;
        document.getElementById("ajaxOutput").textContent = output;
    })
    .catch(err => console.error(err));
}

function updateRecord() {
    const id = document.getElementById("ajaxID").value.trim();
    const name = document.getElementById("ajaxName").value.trim();
    const height = document.getElementById("ajaxHeight").value.trim();
    const weight = document.getElementById("ajaxWeight").value.trim();

    if (!id || !name || !height || !weight || name.length > 30) {
        alert("All fields required for update (Name max 30 chars).")
        return;
    }

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `op=update&id=${id}&name=${name}&height=${height}&weight=${weight}&code=${code}`
    })
    .then(res => res.text())
    .then(data => document.getElementById("ajaxOutput").textContent = `Update Response: ${data}`)
    .catch(err => console.error(err));
}

function deleteRecord() {
    const id = document.getElementById("ajaxID").value.trim();

    if (!id) {
        alert("ID is required to delete a record.");
        return;
    }

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `op=delete&id=${id}&code=${code}`
    })
    .then(res => res.text())
    .then(data => document.getElementById("ajaxOutput").textContent = `Delete Response: ${data}`)
    .catch(err => console.error(err));
}
