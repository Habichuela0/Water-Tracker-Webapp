//Home Form
const form = document.querySelector('#userForm .form-box');

if (form) { 
    form.onsubmit = function(event) {
    event.preventDefault();

    //Collect the from data
    const name = document.getElementById('name').value;
    const weight = document.getElementById('weight').value;
    const heightFeet = document.getElementById('heightFeet').value;
    const heightInches = document.getElementById('heightInches').value;
    const activity = document.getElementById('activity').value;

    // Create a formatted height string for display
    const height = `${heightFeet} Ft. ${heightInches} In.`;
    
    //Creates an object to store the user data
    const userData = {
        name,
        weight,
        height,
        activity,
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    // Redirect to results page
    window.location.href = 'index.html';
};
}