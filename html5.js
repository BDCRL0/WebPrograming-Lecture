document.addEventListener("DOMContentLoaded", function () {
    loadFromLocalStorage();
    //initGeolocation();
    setupDragDrop();
    drawCanvas();
    drawSVG();
    setupWorker();
  });
  
  function saveToLocalStorage() {
    const input = document.getElementById("storageInput").value;
    localStorage.setItem("savedText", input);
    document.getElementById("storageOutput").textContent = `Saved: ${input}`;
  }
  
  function loadFromLocalStorage() {
    const savedText = localStorage.getItem("savedText");
    if (savedText) {
      document.getElementById("storageOutput").textContent = `Saved: ${savedText}`;
    }
  }
  
  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
  
  function drawSVG() {
    const svgContainer = document.getElementById("svgContainer");
    svgContainer.innerHTML = `
      <svg width="120" height="120">
        <circle cx="60" cy="60" r="50" stroke="#ff9d00" stroke-width="4" fill="#0077ff" />
      </svg>
    `;
  }
  //Canvas
  var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      ctx.fillStyle = "yellow";
      ctx.fillRect(0, 0, 250, 100)
      ctx.transform(1, 0.5, -0.5, 1, 30, 10);
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, 250, 100);
      ctx.transform(1, 0.5, -0.5, 1, 30, 10);
      ctx.fillStyle = "blue";
      ctx.fillRect(0, 0, 250, 100);
  
  function setupWorker() {
    const workerBtn = document.getElementById("workerBtn");
    const output = document.getElementById("workerOutput");
  
    if (window.Worker) {
      const worker = new Worker(URL.createObjectURL(new Blob([`
        onmessage = function () {
          let sum = 0;
          for (let i = 0; i < 1e7; i++) sum += i;
          postMessage(sum);
        }
      `], { type: 'application/javascript' })));
  
      workerBtn.addEventListener("click", () => {
        output.textContent = "Calculating...";
        worker.postMessage("go");
      });
  
      worker.onmessage = function (e) {
        output.textContent = `Sum result from worker: ${e.data}`;
      };
    } else {
      output.textContent = "Web Workers are not supported in this browser.";
    }
  }
  