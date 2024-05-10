
const newDivs = document.createElement('div');

function checkIfEnter(event) {
    const inputSection = document.querySelector('.input-data').value;
    const displayGroup = document.getElementById('display-group');

    if (event && event.key === "Enter") {
        if (inputSection !== '' && displayGroup.contains(newDivs)) {
            updateLeftDiv(); 
        } else if (inputSection === '' && displayGroup.contains(newDivs)) {
            return;
        }

        return false;
    }
}

function startPrep() {
    const variableGroup = document.querySelector('.variables-group');
    const elements = variableGroup.querySelectorAll('.var-gr-1');

    if (elements.length > 0) {
        const randomIndex = Math.floor(Math.random() * elements.length);
        const randomElement = elements[randomIndex];
        randomElement.classList.remove('hidden');
        previousElement = randomElement;
    }
}

let previousElement = null;

function checkIfEnterButton(event) {
    const container = document.querySelector('.top-container');
    const variableGroup = document.querySelector('.variables-group');
    const elements = variableGroup.querySelectorAll('.var-gr-1.hidden');
    const displayGroup = document.getElementById('display-group');
    const displayGroupValue = displayGroup.textContent; // Use textContent

    function slideImageToLeft() {
        const allImages = document.querySelectorAll('.square img');
        const lastImage = allImages[allImages.length - 1];
        const lastSquare = lastImage.parentElement;
        const container = document.querySelector('.top-container');
        const firstSquare = container.querySelector('.square:first-child');
        const firstImage = firstSquare.querySelector('img');
    
        // Check if there is a square before the last one
        if (lastSquare.previousElementSibling) {
            const nextSquare = lastSquare.previousElementSibling;
    
            // Apply transform to slide the image to the left
            lastImage.style.transition = 'transform 0.5s ease'; // Apply transition
            lastImage.style.transform = 'translateX(-100%)';
    
            // Listen for the transitionend event
            lastImage.addEventListener('transitionend', function transitionEndHandler() {
                // Move the image to the next square
                nextSquare.appendChild(lastImage);
    
                // Check if the next square is the first square
                if (nextSquare === firstSquare) {
                    // Switch the first image to images/1
                    firstImage.src = '/images/1.png';

                    // Show an alert with a button to refresh the page after a delay
                    setTimeout(function() {
                        alert('Tom has reached Jerry Try Again! Click OK to refresh the page.');
                        location.reload(); // Refresh the page
                    }, 1000); // 1000 milliseconds delay
                }
    
                // Remove transition property after the transition completes
                lastImage.style.transition = '';
                lastImage.style.transform = '';
    
                // Remove the event listener to prevent multiple calls
                lastImage.removeEventListener('transitionend', transitionEndHandler);
            });
        }
    }

    if (event && event.target.classList.contains('enter-button')) {
        // Iterate over each element in varGroupOne to check classes
        variableGroup.querySelectorAll('.var-gr-1').forEach(varGroupOne => {
            if (!varGroupOne.classList.contains('hidden') && varGroupOne.classList.contains('var-1')) {
                if (displayGroupValue.includes('= "Mia"')) {
                    if (elements.length > 0) {
                        // Hide the previously revealed element
                        if (previousElement) {
                            previousElement.classList.add('hidden');
                        }

                        // Randomly select a new element
                        const randomIndex = Math.floor(Math.random() * elements.length);
                        const randomElement = elements[randomIndex];

                        // Reveal the new randomly selected element
                        randomElement.classList.remove('hidden');

                        // Update the previousElement variable
                        previousElement = randomElement;

                        while (displayGroup.firstChild) {
                            displayGroup.removeChild(displayGroup.firstChild);
                        }
                    } 
                } else if (!displayGroupValue.includes('= "Mia"')) {
                    const container = document.querySelector('.container-two');
                    const squares = Array.from(container.querySelectorAll('.squaretwo')).reverse();
                    const lastSquare = squares[0]; // Access the last square from the reversed array
                    const lastImage = lastSquare.querySelector('img')
                    
                    // Find the first square without the image source '/images/3.png' and update it
                    const squareToUpdate = squares.find(square => {
                        const image = square.querySelector('img');
                        return !image.src.endsWith('/images/3.png');
                    });

                    const existingSquare = squares.find(square => {
                        const image = square.querySelector('img');
                        return image.src.endsWith('/images/3.png');
                    });

                    if (squareToUpdate) {
                        if (existingSquare) {
                                slideImageToLeft();
                                setTimeout(() => {
                                const imageToUpdate = squareToUpdate.querySelector('img');
                                imageToUpdate.src = '/images/3.png';
                            }, 500);
                        } else {
                            setTimeout(() => {
                                const imageToUpdate = squareToUpdate.querySelector('img');
                                imageToUpdate.src = '/images/3.png';
                            }, 500);
                        }
                    }
                    while (displayGroup.firstChild) {
                        displayGroup.removeChild(displayGroup.firstChild);
                    }
                }
            }
        });
    }
}

function checkIfAddButton(event) {
    const inputSection = document.querySelector('.input-data').value;
    const displayGroup = document.getElementById('display-group');

    if (event && event.target.classList.contains('add-button')) {
        if (inputSection !== '' && displayGroup.children.length > 0) {
            updateCodeSection(inputSection, displayGroup);
        } else if (inputSection === '' && displayGroup.children.length <= 0) {
            return;
        } else {
            updateCodeSection(inputSection, displayGroup);
        }

        return false;
    }
}

function checkIfResetButton(event) {
    const displayGroup = document.getElementById('display-group');

    if (event && event.target.classList.contains('reset-button')) {
        
        // Remove child elements inside displayGroup
        displayGroup.removeChild(displayGroup.lastChild);

        return false;
    }
}

let divCount = 0;

function updateCodeSection(inputSection, displayGroup) {
    if (inputSection === '') 
        return;

    const currentDivCount = displayGroup.querySelectorAll('.wrapper').length;
    if (currentDivCount >= 5) {
        document.querySelector('.input-data').value = '';
        return;
    }
    
    const addNewDiv = document.createElement('div');
    addNewDiv.classList.add('wrapper');

    const newDiv = document.createElement('div');
    newDiv.innerText = inputSection;

    addNewDiv.appendChild(newDiv);

    displayGroup.appendChild(addNewDiv);

    document.querySelector('.input-data').value = '';
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', checkIfEnterButton);
    document.addEventListener('click', checkIfAddButton);
    document.addEventListener('click', checkIfResetButton);
    startPrep()
});