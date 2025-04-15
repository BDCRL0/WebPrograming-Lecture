const apiUrl = "http://gamf.nhely.hu/ajax2/";
const code = "ABCDEFxyz123"; // Replace with your Neptun code + suffix

function createRecord() {
    const name = document.getElementById("ajaxName").value.trim();
    const height = document.getElementById("ajaxHeight").value.trim();
    const weight = document.getElementById("ajaxWeight").value.trim();

    if (!name || !height || !weight || name.length > 30) {
        alert("Please fill all fields correctly (Name max 30 chars).")
        return;
    }

    if (isNaN(height) || isNaN(weight)) {
        alert("Height and Weight must be numeric values.");
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
        let sum = 0, max = 0;
        data.list.forEach(entry => {
            output += `ID: ${entry.id}, Name: ${entry.name}, Height: ${entry.height}, Weight: ${entry.weight}\n`;
            const h = parseFloat(entry.height);
            if (!isNaN(h)) {
                sum += h;
                if (h > max) max = h;
            }
        });
        const avg = (sum / data.list.length).toFixed(2);
        output += `\nTotal Records: ${data.list.length}, Sum Height: ${sum}, Avg Height: ${avg}, Max Height: ${max}`;
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

    if (isNaN(height) || isNaN(weight)) {
        alert("Height and Weight must be numeric values.");
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
