let points = 0;
let clickValue = 1;
let upgradeCost = 10;
let upgradeCost2 = 50;
let upgradeCost3 = 500;
let updateCost = 500;
let updateCost2 = 10000;

let upgradeLevel = 0;
let updateLevel = 0;
let passivePoints = 0;
let pointsPerSecond = 0;

let autoClickerStarted = false;
let updateClicked = false;
let updateClicked2 = false;
let firstClick = true;

let totalPPS = 0;
let lastClickTime = Date.now(); // Store the time of the last click
let clickCount = 0;

let updateButton2Unlocked = false;

// DOM Elements
const pointDisplay = document.getElementById("points");
const clickButton = document.getElementById("clickButton");
const upgradeButton = document.getElementById("upgradeButton");
const upgradeButton2 = document.getElementById("upgradeButton2");
const upgradeButton3 = document.getElementById("upgradeButton3");
const updateButton = document.getElementById("updateButton");
const updateButton2 = document.getElementById("updateButton2");

const ppsDisplay = document.getElementById("ppsDisplay");

// Load game on startup
function loadGame() {
    const savedData = localStorage.getItem("idleClickerGame");
    if (savedData) {
        const gameData = JSON.parse(savedData);
        
        points = gameData.points;
        clickValue = gameData.clickValue;
        upgradeCost = gameData.upgradeCost;
        upgradeCost2 = gameData.upgradeCost2;
        upgradeCost3 = gameData.upgradeCost3;
        updateCost = gameData.updateCost;
        updateCost2 = gameData.updateCost2;
        upgradeLevel = gameData.upgradeLevel;
        updateLevel = gameData.updateLevel;
        passivePoints = gameData.passivePoints;
        pointsPerSecond = gameData.pointsPerSecond;
        autoClickerStarted = gameData.autoClickerStarted;
        totalPPS = gameData.totalPPS;

        // Update the UI
        pointDisplay.textContent = points;
        upgradeButton.textContent = `Click Upgrade (Cost: ${upgradeCost})`;
        upgradeButton2.textContent = `Finger Upgrade (Cost: ${upgradeCost2})`;
        upgradeButton3.textContent = `Hand Upgrade (Cost: ${upgradeCost3})`;
        updatePPSDisplay();

        // Restart passive income
        if (autoClickerStarted) {
            setInterval(function () {
                points += passivePoints;
                pointDisplay.textContent = points;
                updatePPSDisplay();
            }, 1000);
        }
    }
}

// Save game progress
function saveGame() {
    const gameData = {
        points,
        clickValue,
        upgradeCost,
        upgradeCost2,
        upgradeCost3,
        updateCost,
        updateCost2,
        upgradeLevel,
        updateLevel,
        passivePoints,
        pointsPerSecond,
        autoClickerStarted,
        totalPPS
    };
    localStorage.setItem("idleClickerGame", JSON.stringify(gameData));
}

// Auto-save every 5 seconds
setInterval(saveGame, 5000);






// Hide initially
upgradeButton2.style.display = "none"; 
upgradeButton3.style.display = "none";
updateButton2.style.display = "none";
ppsDisplay.style.display = "none";

upgradeButton2.addEventListener("mouseenter", function () {
    if (updateLevel < 2) {
        tooltip2.style.display = "none";
        tooltip3.style.display = "none";
    }
});

// Function to update PPS display
function updatePPSDisplay() {
    if (updateLevel >= 2) {
        ppsDisplay.style.display = "inline";
    }
    ppsDisplay.textContent = `(${pointsPerSecond}/s)`;
}

// Function to check PPS visibility
function checkPPSVisibility() {
    if (updateLevel >= 2) {
        ppsDisplay.style.display = "inline"; // Make it visible forever
    }
}





// Function to check if updateButton2 should appear 
function checkUpdateButton2() {
    if (points >= 7500 && !updateButton2Unlocked) {
        updateButton2.style.display = "block";
        updateButton2Unlocked = true;
    }
}






// Click Button
clickButton.addEventListener("click", function () {
  
    points += clickValue;
    clickCount++;
    pointDisplay.textContent = points;
    saveGame();

});

// Upgrade Button (Click Upgrade)
upgradeButton.addEventListener("click", function () {
    if (points >= upgradeCost) {
        points -= upgradeCost;
        clickValue++;
        upgradeCost = Math.round(upgradeCost * 1.8);
        upgradeButton.textContent = `Click Upgrade (Cost: ${upgradeCost})`;
        upgradeLevel++;
        pointDisplay.textContent = points;
        saveGame();
    } else {
        showPopup("Not enough Points!");
    }

    if (updateLevel === 1 && upgradeLevel === 3) {
        upgradeButton2.style.display = "block";
    }
});

// Upgrade Button 2 (Passive Points)
upgradeButton2.addEventListener("click", function () {
    if (points >= upgradeCost2) {
        points -= upgradeCost2;
        passivePoints++; // Increase passive points
        pointsPerSecond = passivePoints; // Update PPS immediately

        upgradeCost2 = Math.round(upgradeCost2 * 1.8);
        upgradeButton2.textContent = `Finger Upgrade (Cost: ${upgradeCost2})`;

        points += passivePoints;
        pointDisplay.textContent = points;
        saveGame();

        if (!autoClickerStarted) {
            autoClickerStarted = true;

            setInterval(function () {
                points += passivePoints;
                pointDisplay.textContent = points;
                pointsPerSecond = passivePoints; // Ensure PPS updates correctly
                updatePPSDisplay();
            }, 1000);
        }

        updatePPSDisplay(); // Update PPS display immediately
        checkPPSVisibility();

        if (firstClick) {
            showPopup("You may notice something...");
            firstClick = false;
        }
    } else {
        showPopup("Not enough Points!");
    }
});

//Upgrade3
upgradeButton3.addEventListener("click", function () {
    if (points >= upgradeCost3) {
        points -= upgradeCost3;
        passivePoints+=2; // Increase passive points
        pointsPerSecond = passivePoints; // Update PPS immediately

        upgradeCost3 = Math.round(upgradeCost3 * 1.8);
        upgradeButton3.textContent = `Hand Upgrade (Cost: ${upgradeCost3})`;

        points += passivePoints;
        pointDisplay.textContent = points;
        saveGame();

        if (!autoClickerStarted) {
            autoClickerStarted = true;

            setInterval(function () {
                points += passivePoints;
                pointDisplay.textContent = points;
                pointsPerSecond = passivePoints; // Ensure PPS updates correctly
                updatePPSDisplay();
            }, 1000);
        }
    
        updatePPSDisplay(); // Update PPS display immediately
        checkPPSVisibility();
        if (firstClick) {
            showPopup("You may notice something...");
            firstClick = false;
        }
    } else {
        showPopup("Not enough Points!");
    }
});

    

// Update Button (Resets + Unlocks UpgradeButton2)
updateButton.addEventListener("click", function () {
    if (points >= updateCost) {
        points = 0;
        upgradeLevel = 0;
        updateLevel++;
        clickValue = 1;
        upgradeCost = 10;
        pointsPerSecond = 0; // Reset PPS on update!

        upgradeButton.textContent = `Click Upgrade (Cost: ${upgradeCost})`;

        clickButton.style.fontSize = "80px";
        clickButton.style.position = "fixed";
        clickButton.style.top = "60%";
        clickButton.style.left = "50%";
        clickButton.style.transform = "translate(-50%, -50%)";
        updateButton.style.display = "none";

        pointDisplay.textContent = points;
        saveGame();
        updatePPSDisplay(); // Ensure PPS resets

        if (!updateClicked) {
            showPopup("You have added something...");
            updateClicked = true;
        }
    } else {
        showPopup("Not enough Points!");
    }
});

// Update Button 2 (Unlock UpgradeButton3 and Move Buttons)
updateButton2.addEventListener("click", function () {
    if (points >= updateCost2) {
        points = 0;
        upgradeLevel = 0;
        updateLevel++;
        clickValue = 1;
        upgradeCost = 10;
        upgradeCost2 = 50;
        passivePoints = 0;
        pointsPerSecond = 0; // Reset PPS on update!

        upgradeButton.textContent = `Click Upgrade (Cost: ${upgradeCost})`;
        upgradeButton2.textContent = `Finger Upgrade (Cost: ${upgradeCost2})`;
        upgradeButton3.textContent = `Hand Upgrade (Cost: ${upgradeCost3})`;

        updatePPSDisplay(); // Ensure PPS resets
        checkPPSVisibility();

        upgradeButton3.style.display = "block";
        upgradeButton2.style.display = "block";
        upgradeButton.style.position = "fixed";

        upgradeButton.style.left = "4%"; // Move Click Upgrade left
        upgradeButton.style.top = "7%";
        upgradeButton2.style.position = "fixed";
        upgradeButton2.style.left = "80%"; // Move Finger Upgrade right
        upgradeButton2.style.top = "7%";
        upgradeButton3.style.position = "fixed";
        upgradeButton3.style.left = "80%";
        upgradeButton3.style.top = "15%";

        pointDisplay.textContent = points;
        updateButton2.style.display = "none";
        if (!updateClicked2) {
            showPopup("You just update the game?");
            updateClicked2 = true;
        }
        saveGame();
    } else {
        showPopup("Not enough Points!");
    }
});
// PPS Update (Runs every 1 second)
setInterval(function () {
   
    let clickPPS = clickCount * clickValue;
    clickCount = 0; // Reset click count for next second

    totalPPS = pointsPerSecond + clickPPS;

    points += pointsPerSecond;
    pointDisplay.textContent = points;
    
    updatePPSDisplay();
}, 1000);

// Function to update PPS display
function updatePPSDisplay() {
    ppsDisplay.textContent = `(${totalPPS}/s)`;
    if (updateLevel >= 2) {
        ppsDisplay.style.display = "inline"; // Show PPS permanently
    }
}

// Popup Function
function showPopup(message) {
    const popup = document.createElement("div");
    popup.textContent = message;
    popup.style.position = "absolute";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.background = "rgba(0, 0, 0, 0.8)";
    popup.style.color = "white";
    popup.style.padding = "10px 20px";
    popup.style.borderRadius = "5px";
    popup.style.fontSize = "18px";
    popup.style.opacity = "1";
    popup.style.transition = "opacity 0.5s ease-out";
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => popup.remove(), 1500);
    }, 1500);
}

// Initialize PPS Visibility
checkPPSVisibility();
updatePPSDisplay();
setInterval(checkUpdateButton2, 100);

loadGame();
