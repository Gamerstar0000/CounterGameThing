let state = {
    score: 0,
    clicks: 0,
    highScore: localStorage.getItem('highScore') || 0,
    pointsPerClick: 1
};

const elements = {
    scoreDisplay: document.getElementById('scoreDisplay'),
    clickButton: document.getElementById('clickButton'),
    highScore: document.getElementById('highScore'),
    clickCount: document.getElementById('clickCount'),
    pointsSlider: document.getElementById('pointsSlider'),
    sliderValue: document.getElementById('sliderValue')
};

function updateDisplay() {
    elements.scoreDisplay.textContent = state.score;
    elements.highScore.textContent = state.highScore;
    elements.clickCount.textContent = state.clicks;
    elements.sliderValue.textContent = state.pointsPerClick;
}

function handleClick() {
    state.score += state.pointsPerClick;
    state.clicks++;
    
    if(state.score > state.highScore) {
        state.highScore = state.score;
        localStorage.setItem('highScore', state.highScore);
    }
    
    createClickEffect(event, `+${state.pointsPerClick}`);
    updateDisplay();
}

function createClickEffect(e, text) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.textContent = text;
    effect.style.left = `${e.clientX - 20}px`;
    effect.style.top = `${e.clientY - 20}px`;
    document.body.appendChild(effect);
    setTimeout(() => effect.remove(), 800);
}

// Slider event listener
elements.pointsSlider.addEventListener('input', (e) => {
    state.pointsPerClick = parseInt(e.target.value);
    updateDisplay();
});

// Reset mechanism (Shift + Right Click)
elements.clickButton.addEventListener('contextmenu', (e) => {
    if(e.shiftKey) {
        e.preventDefault();
        state.score = 0;
        state.clicks = 0;
        state.pointsPerClick = 1;
        elements.pointsSlider.value = 1;
        updateDisplay();
    }
});

// Initialize
updateDisplay();
elements.clickButton.addEventListener('click', handleClick);
