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
