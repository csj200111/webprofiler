// ✅ chartHandler.js - 최종 통합 버전
console.log("✅ chartHandler.js loaded");

let chart;

async function loadCoreStats(table, core) {
  const res = await fetch(`/api/statistics/core/${table}/${core}`);
  const data = await res.json();
  if (!data || data.length === 0) {
    alert("데이터가 존재하지 않습니다.");
    return;
  }
  drawChart(data.map(d => d.task), data);
}

async function loadTaskStats(table, task) {
  const res = await fetch(`/api/statistics/task/${table}/${task}`);
  const data = await res.json();
  if (!data || data.length === 0) {
    alert("데이터가 존재하지 않습니다.");
    return;
  }
  drawChart(data.map(d => d.core), data);
}

function drawChart(labels, data) {
  if (chart) chart.destroy();
  const ctx = document.getElementById('chart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Min',
          data: data.map(d => d.min_usaged),
          backgroundColor: 'rgba(0, 0, 255, 0.6)',
        },
        {
          label: 'Max',
          data: data.map(d => d.max_usaged),
          backgroundColor: 'rgba(255, 0, 0, 0.6)',
        },
        {
          label: 'Avg',
          data: data.map(d => d.avg_usaged),
          backgroundColor: 'rgba(0, 255, 0, 0.6)',
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Core/Task 사용량 통계'
        }
      }
    }
  });
}

async function loadCoreTaskButtons() {
  const table = document.getElementById('tableName').value;
  const res = await fetch(`/api/statistics/info/${table}`);
  const data = await res.json();

  const coreContainer = document.getElementById('core-buttons');
  const taskContainer = document.getElementById('task-buttons');
  coreContainer.innerHTML = '';
  taskContainer.innerHTML = '';

  data.cores.forEach(core => {
    const btn = document.createElement('button');
    btn.textContent = core;
    btn.className = "btn btn-outline-primary m-1";
    btn.onclick = () => loadCoreStats(table, core);
    coreContainer.appendChild(btn);
  });

  data.tasks.forEach(task => {
    const btn = document.createElement('button');
    btn.textContent = task;
    btn.className = "btn btn-outline-success m-1";
    btn.onclick = () => loadTaskStats(table, task);
    taskContainer.appendChild(btn);
  });
}

window.loadCoreTaskButtons = loadCoreTaskButtons;
