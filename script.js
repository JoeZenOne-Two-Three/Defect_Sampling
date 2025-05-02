function calculate() {
  const sampleSize = parseInt(document.getElementById("sampleSize").value);
  const totalDefects = parseInt(document.getElementById("totalDefects").value);
  const aql = parseFloat(document.getElementById("aql").value);

  if (isNaN(sampleSize) || isNaN(totalDefects) || sampleSize <= 0 || totalDefects < 0) {
    alert("Please enter valid numbers.");
    return;
  }

  const defectRate = (totalDefects / sampleSize) * 100;
  document.getElementById("defectRate").value = defectRate.toFixed(2);

  const resultText = defectRate > aql
    ? "Defect rate is above the AQL. Lot is rejected."
    : "Defect rate is within the AQL. Lot is accepted.";

  document.getElementById("resultText").textContent = resultText;
}
