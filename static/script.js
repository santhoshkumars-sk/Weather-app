document.addEventListener("DOMContentLoaded", function() {
    if (pollutionData) {
        var pollutionCtx = document.getElementById("pollutionChart").getContext("2d");
        new Chart(pollutionCtx, {
            type: "bar",
            data: {
                labels: ["CO", "NO", "NO2", "O3", "SO2", "PM2.5", "PM10"],
                datasets: [{
                    data: [
                        pollutionData.list[0].components.co,
                        pollutionData.list[0].components.no,
                        pollutionData.list[0].components.no2,
                        pollutionData.list[0].components.o3,
                        pollutionData.list[0].components.so2,
                        pollutionData.list[0].components.pm2_5,
                        pollutionData.list[0].components.pm10
                    ],
                    backgroundColor: "rgba(225, 230, 241, 0.8)"
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Ensures chart fits inside the box
                layout: { padding: { top: 10, right: 10, bottom: 5, left: 10 } }, // Adjusts internal padding
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        title: { display: true, text: "Concentration (µg/m³)", color: "#ffffff" },
                        grid: { color: "rgba(194, 183, 183, 0.8)" },
                        ticks: { color: "rgba(194, 183, 183, 0.8)" },
                        beginAtZero: true
                    },
                    x: {
                        title: { display: true, text: "Pollutants", color: "#ffffff" },
                        grid: { display: false },
                        ticks: { 
                            color: "rgba(205, 195, 195, 0.8)",
                            padding: 5,  // Moves labels up
                            minRotation: 0, 
                            maxRotation: 0 
                        }
                    }
                }
            }
        });
    }

    if (temperatureForecast) {
        var ctx2 = document.getElementById('temperatureChart').getContext('2d');
        var hours = Array.from({length: temperatureForecast.length}, (_, i) => `${i}:00`);

        new Chart(ctx2, {
            type: 'line',
            data: {
                labels: hours,
                datasets: [{
                    data: temperatureForecast,
                    borderColor: 'black',
                    backgroundColor: 'rgba(225, 230, 241, 0.4)',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Ensures chart fits inside the box
                layout: { padding: { top: 10, right: 10, bottom: 5, left: 10 } }, // Adjusts internal padding
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        title: { display: true, text: "Temperature (°C)", color: "#ffffff" },
                        grid: { color: "rgba(194, 183, 183, 0.8)" },
                        ticks: { color: "rgba(194, 183, 183, 0.8)" },
                        beginAtZero: true
                    },
                    x: {
                        title: { display: true, text: "Hour", color: "#ffffff" },
                        grid: { display: false },
                        ticks: { 
                            color: "rgba(194, 183, 183, 0.8)",
                            padding: 5,  // Moves labels up
                            minRotation: 0, 
                            maxRotation: 0 
                        }
                    }
                }
            }
        });
    }
});
