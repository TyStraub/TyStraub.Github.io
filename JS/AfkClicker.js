let score = 0;
let upgradeCost = 10;
let upgradeLevel = 0;
let clickValue = 1;

const scoreElement = document.getElementById('score');
const clickButton = document.getElementById('clickButton');
const upgradeButton = document.getElementById('upgradeButton');
const upgradeStatus = document.getElementById('upgradeStatus');

clickButton.addEventListener('click', () => {
    score += clickValue;
    scoreElement.textContent = `Score: ${score}`;
});

upgradeButton.addEventListener('click', () => {
    if (score >= upgradeCost) {
        score -= upgradeCost;
        upgradeLevel += 1;
        clickValue += 1;
        upgradeCost = Math.floor(upgradeCost * 1.5); // Increase the cost for the next upgrade
        scoreElement.textContent = `Score: ${score}`;
        upgradeStatus.textContent = `Upgrades: ${upgradeLevel} | Next Upgrade Cost: ${upgradeCost}`;
        updateUpgradeButton();
    }
});

function updateUpgradeButton() {
    if (score >= upgradeCost) {
        upgradeButton.disabled = false;
    } else {
        upgradeButton.disabled = true;
    }
}

// Initialize the button state
updateUpgradeButton();