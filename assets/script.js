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

    // Displays water intake
    const weightLbs = parseFloat(storedData.weight); // Weight in Pounds
    const waterIntakeOunces = weightLbs * 0.50; // Base ounces of water - calculate as 50% of users body weight
    const waterIntakeLiters = (waterIntakeOunces / 33.814).toFixed(2); // Gives approx. liters
    
    // Adds activity level to water intake
    let extraWaterOunces = 0;
    switch (storedData.activity) {
        case "Sedentary":
            extraWaterOunces = 0;
            break;
        case "Light":
            extraWaterOunces = 12; // Add 12 ounces for light activity
            break;
        case "Moderate":
            extraWaterOunces = 24; // Add 24 ounces for moderate activity
            break;
        case "Very Active":
            extraWaterOunces = 36; // Add 36 ounces for vigorous activity
            break;
    }

    // Total water intake calculation
    const totalWaterOunces = Math.round (waterIntakeOunces + extraWaterOunces);
    const totalWaterLiters = (totalWaterOunces / 33.814).toFixed(2); // Gives users approximate liters
    
    // Calculate number of 8oz cups
    const cupsOfWater = Math.ceil(totalWaterOunces / 8); // Calculates the number cups of water needed

    // Store recomendation in local storage
    localStorage.setItem('recommendedWaterOunces', totalWaterOunces);
    localStorage.setItem('recommendedCups', cupsOfWater);


    const waterIntakeDiv = document.getElementById('water-intake');
    waterIntakeDiv.innerHTML = `
        <p>Based on your activity level, we added ${extraWaterOunces} oz to your goal.</p>
        <strong><p>Daily Goal:</p></strong>
        <p>💧${totalWaterOunces.toFixed(0)} oz (approx. ${totalWaterLiters} L)</p>
        <p>Strive for ≈ ${cupsOfWater} (8oz) cups of water to meet your goal.</p>
    `;
} else {

    // Hide the water intake div 
    const waterIntakeDiv = document.getElementById('water-intake');
    waterIntakeDiv.style.display = 'none';

    // Hide the paragraph with the recommendation message
    const recommendationMessage = document.querySelector(".recommendation-message"); // Adjust the selector if needed
    if (recommendationMessage) {
        recommendationMessage.style.display = 'none'; // Hide the paragraph
    }

    const message = document.createElement('h1');
    message.textContent = 'No user data found.';
    document.getElementById('results').appendChild(message);

    // Back to Home Page
    const backButton = document.createElement('button');
    backButton.textContent = 'Resubmit Form';
    backButton.classList.add('back-button');

    // Event listener to navigate back to the home page
    backButton.addEventListener('click', () => {
    window.location.href = 'home.html'; 
});

    // Append the button to the results container
    document.getElementById('results').appendChild(backButton);
};

// Tracker
// Button selectors
const addButton = document.querySelector(".add"),
    removeButton = document.querySelector(".remove");

// Tracker elements that update
const currentCupsEl = document.querySelector(".current-cups"),
    currentOuncesEl = document.querySelector(".current-ounces"),
    currentPercentageEl = document.querySelector(".current-percentage"),
    progressArea = document.querySelector(".progress");

// Constants for cups
const MAX_CUPS = parseInt(localStorage.getItem('recommendedCups')) || 12,
      MIN_CUPS = 0;

// Constants for ounces
const MAX_OUNCES = parseFloat(localStorage.getItem('recommendedWaterOunces')) || 96, 
      MIN_OUNCES = 0;

// Variables in tracker
let cups = 0,
    ounces = 0,
    percentage = 0;

// Functions for adding and removing cups
function addCup() {
    if (cups < MAX_CUPS && ounces < MAX_OUNCES) {
        cups++;
        ounces += 8; // Based on 8 ounce standard

    if (ounces > MAX_OUNCES) {
        ounces = MAX_OUNCES; // Limit to max ounces
    }
        percentage = (ounces / MAX_OUNCES) * 100;  
        updateLayout();
    }

    // Disable buttons based on cups
    addButton.disabled = cups === MAX_CUPS || ounces >= MAX_OUNCES;
    removeButton.disabled = cups === MIN_CUPS;
}

function removeCup() {
    if (cups > MIN_CUPS && ounces > MIN_OUNCES) {
        cups--;
        ounces -= 8; // Based on 8 ounce standard
    if (ounces < MIN_OUNCES) {
        ounces = MIN_OUNCES; // Limit to min ounces
    }
        percentage = (ounces / MAX_OUNCES) * 100;
        updateLayout();
    }

    // Disable buttons based on cups
    addButton.disabled = cups === MAX_CUPS || ounces >= MAX_OUNCES;
    removeButton.disabled = cups === MIN_CUPS || ounces === MIN_OUNCES;
}

// Update the layout to reflect current values
function updateLayout() {
    currentCupsEl.textContent = `${cups}/${MAX_CUPS} cups`; // Cups display
    currentOuncesEl.textContent = `${ounces}/${MAX_OUNCES.toFixed(0)} oz`; // Ounce display
    currentPercentageEl.textContent = `${percentage.toFixed(0)}%`; // Percentage display
    progressArea.style.height = `${percentage}%`; // Progress bar display

    // Save current cups and ounces to local storage
    localStorage.setItem('currentCups', cups);
    localStorage.setItem('currentOunces', ounces);

}

// Initialize layout with initial values
updateLayout();

// Event listeners
addButton.addEventListener("click", addCup);
removeButton.addEventListener("click", removeCup);

// Modal Elements
const modal = document.createElement('div');
modal.classList.add('modal');
modal.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
        <h1>Get Hyped!</h1>
        <p>🎉 Congratulations, You've reached your water intake goal!</p>
        <button id="resetBtn">Reset Tracker</button>
    </div>
`;
document.body.appendChild(modal);

const closeModal = modal.querySelector('.close');
const resetBtn = modal.querySelector('#resetBtn');

// Check if the tracker is full
function checkTrackerGoal() {
    if (percentage >= 100) {
        openModal();
    }
}

// Function to open the modal
function openModal() {
    modal.style.display = 'block';
}

// Function to close the modal
function closeModalFunc() {
    modal.style.display = 'none';
}

// Reset Tracker Function
function resetTracker() {
    cups = 0;
    ounces = 0;
    percentage = 0;
    localStorage.removeItem('currentCups');
    localStorage.removeItem('currentOunces');
    updateLayout();
    closeModalFunc();

    removeButton.disabled = true;
    addButton.disabled = false;
}

// Update layout function (modified to check tracker goal)
function updateLayout() {
    currentCupsEl.textContent = `${cups}/${MAX_CUPS} cups`;
    currentOuncesEl.textContent = `${ounces}/${MAX_OUNCES.toFixed(0)} oz`;
    currentPercentageEl.textContent = `${percentage.toFixed(0)}%`;
    progressArea.style.height = `${percentage}%`;
    localStorage.setItem('currentCups', cups);
    localStorage.setItem('currentOunces', ounces);
    checkTrackerGoal(); // Check goal after updating layout
}

// Event listeners for modal close and reset
closeModal.addEventListener('click', closeModalFunc);
resetBtn.addEventListener('click', resetTracker);


//FAQ
const faqItems = Array.from(document.querySelectorAll('.cs-faq-item'));
for (const item of faqItems) {
    const onClick = () => {
    item.classList.toggle('active')
}
item.addEventListener('click', onClick)
}


//
//    The Dark Mode System
//

// helper functions to toggle dark mode
function enableDarkMode() {
	document.body.classList.add('dark-mode');
	localStorage.setItem('theme', 'dark');
}
function disableDarkMode() {
	document.body.classList.remove('dark-mode');
	localStorage.setItem('theme', 'light');
}

// determines a new users dark mode preferences
function detectColorScheme() {
	// default to the light theme
	let theme = 'light';

	// check localStorage for a saved 'theme' variable. if it's there, the user has visited before, so apply the necessary theme choices
	if (localStorage.getItem('theme')) {
		theme = localStorage.getItem('theme');
	}
	// if it's not there, check to see if the user has applied dark mode preferences themselves in the browser
	else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		theme = 'dark';
	}

	// if there is no preference set, the default of light will be used. apply accordingly
	theme === 'dark' ? enableDarkMode() : disableDarkMode();
}

// run on page load
detectColorScheme();

// add event listener to the dark mode button toggle
document.getElementById('dark-mode-toggle').addEventListener('click', () => {
	// on click, check localStorage for the dark mode value, use to apply the opposite of what's saved
	localStorage.getItem('theme') === 'light' ? enableDarkMode() : disableDarkMode();
});
                                
