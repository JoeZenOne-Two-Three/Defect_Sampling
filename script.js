document.getElementById("languageToggle").addEventListener("click", () => {
  const langs = document.querySelectorAll(".lang-en, .lang-es");
  langs.forEach(el => el.classList.toggle("hidden"));
});

function calculateRate() {
  const defects = parseInt(document.getElementById("defects").value);
  const sampleSize = parseInt(document.getElementById("sampleSizeDefect").value);
  const model = document.getElementById("calculationModel").value;

  const defectsError = document.getElementById("defectsError");
  const sampleSizeError = document.getElementById("sampleSizeDefectError");
  defectsError.classList.add("hidden");
  sampleSizeError.classList.add("hidden");

  if (isNaN(defects) || defects < 0) {
    defectsError.textContent = "Please enter a valid number of defects.";
    defectsError.classList.remove("hidden");
    return;
  }
  if (isNaN(sampleSize) || sampleSize <= 0) {
    sampleSizeError.textContent = "Please enter a valid sample size.";
    sampleSizeError.classList.remove("hidden");
    return;
  }

  let defectRate = defects / sampleSize;
  if (model === "poisson") {
    defectRate = defects / sampleSize;
  }

  const detectionProb = 1 - Math.pow(1 - defectRate, sampleSize);
  showResults(null, detectionProb);
}

function calculateSample() {
  const rate = parseFloat(document.getElementById("defectRate").value) / 100;
  const confidence = parseFloat(document.getElementById("confidence").value) / 100;

  const defectRateError = document.getElementById("defectRateError");
  const confidenceError = document.getElementById("confidenceError");
  defectRateError.classList.add("hidden");
  confidenceError.classList.add("hidden");

  if (isNaN(rate) || rate <= 0 || rate >= 1) {
    defectRateError.textContent = "Please enter a valid defect rate (0-100).";
    defectRateError.classList.remove("hidden");
    return;
  }
  if (isNaN(confidence) || confidence <= 0 || confidence >= 1) {
    confidenceError.textContent = "Please enter a valid confidence level (0-100).";
    confidenceError.classList.remove("hidden");
    return;
  }

  const requiredSampleSize = Math.ceil(Math.log(1 - confidence) / Math.log(1 - rate));
  const detectionProb = 1 - Math.pow(1 - rate, requiredSampleSize);

  showResults(requiredSampleSize, detectionProb);
}

function showResults(sampleSize, detectionProb) {
  document.getElementById("defectResults").classList.remove("hidden");

  if (sampleSize !== null) {
    document.getElementById("requiredSampleSize").textContent = sampleSize;
  } else {
    document.getElementById("requiredSampleSize").textContent = "N/A";
  }

  document.getElementById("detectionProb").textContent = (detectionProb * 100).toFixed(2) + "%";

  const ctx = document.getElementById("rateChart").getContext("2d");
  if (window.chartInstance) {
    window.chartInstance.destroy();
  }
  window.chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Detection Probability"],
      datasets: [{
        label: "%",
        data: [detectionProb * 100],
        backgroundColor: ["rgba(75, 192, 192, 0.6)"]
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
}
