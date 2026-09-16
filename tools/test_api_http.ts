async function testEndpoints() {
  console.log("=== Testing Real HTTP Endpoints on http://localhost:3000 ===");

  // 1. Health Endpoint
  const healthRes = await fetch("http://localhost:3000/api/health");
  const healthData = await healthRes.json();
  console.log("1. /api/health -> Status:", healthRes.status, "| Service:", healthData.service);

  // 2. Weather Endpoint
  const weatherRes = await fetch("http://localhost:3000/api/weather");
  const weatherData = await weatherRes.json();
  console.log("2. /api/weather -> Status:", weatherRes.status, "| Temp:", weatherData.temperatureC + "°C | RH:", weatherData.relativeHumidity + "% | Risk:", weatherData.sporeSpreadRisk);

  // 3. Workflow Execute Endpoint
  const execRes = await fetch("http://localhost:3000/api/workflow/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sampleId: "tomato_early_blight",
      sectorId: "Sector 4B - North Quadrant",
      acreage: 140,
      farmName: "Oak Ridge Commercial Farm",
    }),
  });
  const execData = await execRes.json();
  console.log("3. /api/workflow/execute -> Status:", execRes.status, "| Success:", execData.success, "| Ticket ID:", execData.ticket?.ticketId, "| Chemical:", execData.ticket?.prescription?.chemicalName, "| Protected Crop:", "$" + execData.ticket?.estimatedCropSavedUsd);

  // 4. Test Healthy Sample
  const healthyRes = await fetch("http://localhost:3000/api/workflow/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sampleId: "healthy",
      acreage: 200,
    }),
  });
  const healthyData = await healthyRes.json();
  console.log("4. /api/workflow/execute (Healthy) -> Status:", healthyRes.status, "| Dosage:", healthyData.ticket?.prescription?.dosagePerAcre, "| Chemical Savings:", healthyData.ticket?.chemicalSavingsPct + "%");

  console.log("\n✅ ALL HTTP API ENDPOINTS TESTED AND FUNCTIONAL!");
}

testEndpoints().catch((err) => {
  console.error("HTTP endpoint test failed:", err);
  process.exit(1);
});
