const applications = [
  {
    organization: "NASA JPL",
    useCase: "AI-assisted rover navigation and mission planning",
    type: "Government",
    impact: 10,
    risk: 6,
    complexity: 9,
    feasibility: 7,
    cost: 8,
    data: 8
  },
  {
    organization: "Airbus",
    useCase: "Predictive aircraft maintenance with Skywise-style fleet analytics",
    type: "Private Company",
    impact: 9,
    risk: 5,
    complexity: 7,
    feasibility: 9,
    cost: 6,
    data: 9
  },
  {
    organization: "SpaceX",
    useCase: "Autonomous rocket landing and navigation decision support",
    type: "Private Company",
    impact: 10,
    risk: 8,
    complexity: 10,
    feasibility: 8,
    cost: 9,
    data: 7
  },
  {
    organization: "Planet Labs",
    useCase: "Satellite image analysis for agriculture, climate, and supply-chain monitoring",
    type: "Private Company",
    impact: 8,
    risk: 4,
    complexity: 6,
    feasibility: 9,
    cost: 5,
    data: 10
  },
  {
    organization: "Boeing",
    useCase: "Aircraft fault detection and digital engineering support",
    type: "Private Company",
    impact: 9,
    risk: 7,
    complexity: 8,
    feasibility: 7,
    cost: 8,
    data: 8
  },
  {
    organization: "NOAA",
    useCase: "AI-enhanced weather forecasting for aviation operations",
    type: "Government",
    impact: 9,
    risk: 4,
    complexity: 7,
    feasibility: 8,
    cost: 6,
    data: 9
  },
  {
    organization: "DARPA",
    useCase: "Autonomous flight systems and advanced aerospace autonomy research",
    type: "Defense Research",
    impact: 9,
    risk: 8,
    complexity: 10,
    feasibility: 6,
    cost: 9,
    data: 6
  },
  {
    organization: "Maxar",
    useCase: "Geospatial intelligence and satellite imagery analytics",
    type: "Private Company",
    impact: 8,
    risk: 5,
    complexity: 7,
    feasibility: 8,
    cost: 6,
    data: 9
  }
];

const criteria = [
  { key: "impact", label: "Impact", positive: true },
  { key: "risk", label: "Risk", positive: false },
  { key: "complexity", label: "Technical Complexity", positive: false },
  { key: "feasibility", label: "Feasibility", positive: true },
  { key: "cost", label: "Cost", positive: false },
  { key: "data", label: "Data Availability", positive: true }
];

const presets = {
  balanced: { impact: 1, risk: 1, complexity: 1, feasibility: 1, cost: 1, data: 1 },
  research: { impact: 2, risk: 0.8, complexity: 0.7, feasibility: 1, cost: 0.6, data: 1.2 },
  cost: { impact: 1, risk: 1, complexity: 1.2, feasibility: 1.3, cost: 2, data: 1 },
  safety: { impact: 1.2, risk: 2, complexity: 1.3, feasibility: 1.4, cost: 0.8, data: 1.2 }
};

let weights = { ...presets.balanced };
let chart;

const weightsEl = document.getElementById("weights");
const tableBody = document.getElementById("rankingBody");
const typeFilter = document.getElementById("typeFilter");
const resultCount = document.getElementById("resultCount");

function createControls() {
  weightsEl.innerHTML = "";
  criteria.forEach(item => {
    const wrapper = document.createElement("div");
    wrapper.className = "weight-item";
    wrapper.innerHTML = `
      <label for="${item.key}">
        <span>${item.label}</span>
        <span id="${item.key}-value">${weights[item.key].toFixed(1)}</span>
      </label>
      <input id="${item.key}" type="range" min="0" max="3" step="0.1" value="${weights[item.key]}" />
    `;
    weightsEl.appendChild(wrapper);

    wrapper.querySelector("input").addEventListener("input", event => {
      weights[item.key] = Number(event.target.value);
      document.getElementById(`${item.key}-value`).textContent = weights[item.key].toFixed(1);
      document.querySelectorAll(".preset").forEach(btn => btn.classList.remove("active"));
      updateDashboard();
    });
  });
}

function scoreApplication(app) {
  return criteria.reduce((total, item) => {
    const direction = item.positive ? 1 : -1;
    return total + direction * app[item.key] * weights[item.key];
  }, 0);
}

function getRankedApps() {
  const filter = typeFilter.value;
  return applications
    .filter(app => filter === "All" || app.type === filter)
    .map(app => ({ ...app, score: scoreApplication(app) }))
    .sort((a, b) => b.score - a.score);
}

function updateTable(ranked) {
  tableBody.innerHTML = ranked.map((app, index) => `
    <tr>
      <td>${index + 1}</td>
      <td><strong>${app.organization}</strong></td>
      <td>${app.useCase}</td>
      <td>${app.type}</td>
      <td>${app.impact}</td>
      <td>${app.risk}</td>
      <td>${app.complexity}</td>
      <td>${app.feasibility}</td>
      <td>${app.cost}</td>
      <td>${app.data}</td>
      <td class="score">${app.score.toFixed(1)}</td>
    </tr>
  `).join("");
  resultCount.textContent = `${ranked.length} initiatives`;
}

function updateChart(ranked) {
  const labels = ranked.map(app => `${app.organization}: ${app.useCase.split(" ").slice(0, 3).join(" ")}...`);
  const data = ranked.map(app => Number(app.score.toFixed(1)));

  if (chart) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
    return;
  }

  const ctx = document.getElementById("scoreChart");
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Final Score",
        data,
        borderWidth: 1,
        borderRadius: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: "#f8fafc" } },
        tooltip: {
          callbacks: {
            afterLabel(context) {
              const app = ranked[context.dataIndex];
              return `${app.type} · ${app.useCase}`;
            }
          }
        }
      },
      scales: {
        x: { ticks: { color: "#a7b4c8" }, grid: { color: "rgba(255,255,255,.08)" } },
        y: { ticks: { color: "#a7b4c8" }, grid: { color: "rgba(255,255,255,.08)" } }
      }
    }
  });
}

function updateDashboard() {
  const ranked = getRankedApps();
  updateTable(ranked);
  updateChart(ranked);
}

document.querySelectorAll(".preset").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".preset").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    weights = { ...presets[button.dataset.preset] };
    createControls();
    updateDashboard();
  });
});

typeFilter.addEventListener("change", updateDashboard);

createControls();
updateDashboard();
