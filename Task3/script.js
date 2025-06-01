function convertTemp() {
    const temp = parseFloat(document.getElementById("tempInput").value);
    const unit = document.querySelector('input[name="unit"]:checked').value;
    const resultArea = document.getElementById("resultArea");
    if (isNaN(temp)) {
        resultArea.textContent = "Please enter a valid number.";
        return;
    }
    let celsius, fahrenheit, kelvin;
    if (unit === "celsius") {
        fahrenheit = (temp * 9/5) + 32;
        kelvin = temp + 273.15;
        resultArea.textContent = `${temp}°C = ${fahrenheit.toFixed(2)}°F | ${kelvin.toFixed(2)}K`;
    } else if (unit === "fahrenheit") {
        celsius = (temp - 32) * 5/9;
        kelvin = celsius + 273.15;
        resultArea.textContent = `${temp}°F = ${celsius.toFixed(2)}°C | ${kelvin.toFixed(2)}K`;
    } else if (unit === "kelvin") {
        celsius = temp - 273.15;
        fahrenheit = (celsius * 9/5) + 32;
        resultArea.textContent = `${temp}K = ${celsius.toFixed(2)}°C | ${fahrenheit.toFixed(2)}°F`;
    }
}
