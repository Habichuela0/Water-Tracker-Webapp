//Results Form
// Retrieve data from local storage
const storedData = JSON.parse(localStorage.getItem('userData'));

// Display personalized greeting if data exists
if (storedData) {
    const greeting = document.getElementById('greeting');
    greeting.textContent = `Hi ${storedData.name}!`;

    // Display other user details
    const resultsDiv = document.getElementById('results');
    for (const key in storedData) {
        if (key !== 'name') { // Skip the name in the details section
            const value = storedData[key];
            if (key === 'height') {
                resultsDiv.innerHTML += `<div class="detail-item"><strong>Height:</strong> ${value}</div>`;
            } else {
                const detailDiv = document.createElement('div');
                detailDiv.classList.add('detail-item');
                detailDiv.innerHTML = `<strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}`;
                resultsDiv.appendChild(detailDiv);
            }
        }
    }

    // Calculate and display water intake
    const weightLbs = parseFloat(storedData.weight); // Use weight directly as it's in pounds
    const waterIntakeOunces = weightLbs * 0.50; // Base ounces of water
    const waterIntakeLiters = (waterIntakeOunces / 33.814).toFixed(2); // Convert ounces to liters
    
    // Calculate extra water intake based on activity level
    let extraWaterOunces = 0;
    switch (storedData.activity) {
        case "Sedentary":
            extraWaterOunces = 0;
            break;
        case "Lightly active":
            extraWaterOunces = 12; // Add 12 ounces for light activity
            break;
        case "Moderately active":
            extraWaterOunces = 24; // Add 24 ounces for moderate activity
            break;
        case "Very active":
            extraWaterOunces = 36; // Add 36 ounces for vigorous activity
            break;
    }

    // Total water intake calculation
    const totalWaterOunces = waterIntakeOunces + extraWaterOunces;
    const totalWaterLiters = (totalWaterOunces / 33.814).toFixed(2); // Convert total ounces to liters
    
    // Calculate number of 8oz cups
    const cupsOfWater = Math.ceil(totalWaterOunces / 8); // Round up to the nearest cup

    const waterIntakeDiv = document.getElementById('water-intake');
    waterIntakeDiv.innerHTML = `
        <strong>Daily Water Intake Recommendation:</strong>
        <p>${totalWaterOunces.toFixed(2)} oz (approx. ${totalWaterLiters} L)</p>
        <p>This is approximately ${cupsOfWater} cups (8 oz each).</p>
        <p>Based on your activity level, add an additional ${extraWaterOunces} oz of water.</p>
    `;
} else {
    const message = document.createElement('p');
    message.textContent = 'No user data found.';
    document.getElementById('results').appendChild(message);
};

//Tracker
    // Button selectors
    const addButton = document.querySelector(".add"),
        removeButton = document.querySelector(".remove");

    // Elements for update
    const currentCupsEl = document.querySelector(".current-cups"),
        currentLitersEl = document.querySelector(".current-liters"),
        currentPercentageEl = document.querySelector(".current-percentage"),
        progressArea = document.querySelector(".progress");

    const MAX_CUPS = 10,
        MIN_CUPS = 0;

    let cups = 0,
        liters = 0,
        percentage = 0;

    function addCup() {
        if (cups < MAX_CUPS) {
            cups++;
            liters += 250;
            percentage = (cups / MAX_CUPS) * 100;
            
            updateLayout();  // Update layout after changing cups
        }

        // Disable buttons based on cups
        addButton.disabled = cups === MAX_CUPS;
        removeButton.disabled = cups === MIN_CUPS;
    }

    function removeCup() {
        if (cups > MIN_CUPS) {
            cups--;
            liters -= 250;
            percentage = (cups / MAX_CUPS) * 100;

            updateLayout();  // Update layout after changing cups
        }

        // Disable buttons based on cups
        addButton.disabled = cups === MAX_CUPS;
        removeButton.disabled = cups === MIN_CUPS;
    }

    function updateLayout() {
        currentCupsEl.textContent = `${cups}/10`;
        currentLitersEl.textContent = `${liters / 1000}l/2.5l`;
        currentPercentageEl.textContent = `${percentage}%`;
        progressArea.style.height = `${percentage}%`;
    }

    // Event listeners
    addButton.addEventListener("click", addCup);
    removeButton.addEventListener("click", removeCup);

//FAQ
const faqItems = Array.from(document.querySelectorAll('.cs-faq-item'));
for (const item of faqItems) {
    const onClick = () => {
    item.classList.toggle('active')
}
item.addEventListener('click', onClick)
}
