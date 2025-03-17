let points = 0;
let clickValue = 1;
let upgradeCost = 10;
let upgradeCost2 = 50;
let updateCost = 10;

let upgradeLevel = 0;
let updateLevel = 0;
let passivePoints = 0;

let autoClickerStarted = false; // Changed from `autoClickerActive`
let updateClicked = false;
let firstClick = true;


const pointDisplay = document.getElementById("points");
const clickButton = document.getElementById("clickButton");
const upgradeButton = document.getElementById("upgradeButton");
const upgradeButton2 = document.getElementById("upgradeButton2");
    upgradeButton2.style.display = "none"; // Hide initially
    upgradeButton2.style.position = "absolute";
    upgradeButton2.style.top = "31%";
    upgradeButton2.style.left = "50%";
    upgradeButton2.style.transform = "translate(-50%, -50%)";

const updateButton = document.getElementById("updateButton");

// Animation Variable
const popupMessage = document.getElementById("popupMessage");

// Click Button
clickButton.addEventListener("click", function () {
    points += clickValue;
    pointDisplay.textContent = points;
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
    } else {
        showPopup("Not enough Points!");
    }
    if (updateLevel === 1 && upgradeLevel === 3) {
        upgradeButton2.style.display = "block"; 
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
        upgradeButton.textContent = `Click Upgrade (Cost: ${upgradeCost})`;
        
        clickButton.style.fontSize = "80px";
        recenterButton();
        function recenterButton() {
            clickButton.style.position = "absolute";
            clickButton.style.top = "60%";
            clickButton.style.left = "50%";
            clickButton.style.transform = "translate(-50%, -50%)";
            updateButton.style.display = "none";

            pointDisplay.textContent = points;

            if (!updateClicked) {
                popupMessage.textContent = "You have added something...";
                popupMessage.style.opacity = "1";
    
                setTimeout(() => {
                    popupMessage.style.opacity = "0";
                }, 2500);
    
                updateClicked = true; // Prevents future popups
            }
    } } else {
        showPopup("Not enough Points!");

        pointDisplay.textContent = points;
    }
});


upgradeButton2.addEventListener("click", function () {
    if (points >= upgradeCost2) {
        points -= upgradeCost2;
        passivePoints++; // Increase passive income every time

        upgradeCost2 = Math.round(upgradeCost2 * 1.8);
        upgradeButton2.textContent = `??? Upgrade (Cost: ${upgradeCost2})`;

        if (!autoClickerStarted) {
            autoClickerStarted = true;
    
            setInterval(function () {
                points += passivePoints; // Each upgrade increases passive points per second
                pointDisplay.textContent = points;
            }, 1000);
        }
        if (firstClick) {
            showPopup("You may notice something..");
            firstClick = false;
    } } else {
        showPopup("Not enough Points!");

    
    }
});

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
        setTimeout(() => popup.remove(), 500);
    }, 1500);
}
