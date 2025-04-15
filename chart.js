document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#numberTable tbody");
    const ctx = document.getElementById("chartCanvas").getContext("2d");
    let chart;
  
    for (let i = 0; i < 5; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 5; j++) {
        const cell = document.createElement("td");
        const value = Math.floor(Math.random() * 100);
        cell.textContent = value;
        row.appendChild(cell);
      }
      row.addEventListener("click", () => drawChart([...row.children].map(td => +td.textContent)));
      tableBody.appendChild(row);
    }
  
    function drawChart(data) {
      if (chart) chart.destroy();
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map((_, i) => `Column ${i + 1}`),
          datasets: [{
            label: 'Selected Row Data',
            data: data,
            borderColor: '#ff9d00',
            backgroundColor: 'rgba(255, 157, 0, 0.2)',
            fill: true,
            tension: 0.3,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#ff9d00'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: { color: '#fff' }
            },
            tooltip: {
              callbacks: {
                label: context => `Value: ${context.parsed.y}`
              }
            }
          },
          scales: {
            x: {
              ticks: { color: '#fff' },
              grid: { color: '#444' }
            },
            y: {
              ticks: { color: '#fff' },
              grid: { color: '#444' },
              beginAtZero: true
            }
          }
        }
      });
    }
  });
  