function calculate() {
    const ratio = document.getElementById('ratio').value;
    const containerHeight = parseFloat(document.getElementById('containerHeight').value);
    const dilutionPercentage = parseFloat(document.getElementById('dilutionPercentage').value);

    const [base, hardener] = ratio.split(':').map(Number);
    const totalParts = base + hardener;
    const baseFraction = base / totalParts;
    const hardenerFraction = hardener / totalParts;

    const combinedHeight = containerHeight / (1 + dilutionPercentage / 100);
    const baseHeight = combinedHeight * baseFraction;
    const hardenerHeight = combinedHeight * hardenerFraction;
    const diluentHeight = containerHeight - combinedHeight;

    document.getElementById('combinedHeight').textContent = combinedHeight.toFixed(2);
    document.getElementById('baseHeight').textContent = baseHeight.toFixed(2);
    document.getElementById('hardenerHeight').textContent = hardenerHeight.toFixed(2);
    document.getElementById('diluentHeight').textContent = diluentHeight.toFixed(2);

    drawContainer(containerHeight, baseHeight, hardenerHeight, diluentHeight);
}

function drawContainer(containerHeight, baseHeight, hardenerHeight, diluentHeight) {
    const svg = document.getElementById('container');
    svg.innerHTML = '';

    const width = 200;
    const height = 400;
    const scale = height / containerHeight;

    // Draw container
    const container = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    container.setAttribute('x', '0');
    container.setAttribute('y', '0');
    container.setAttribute('width', width);
    container.setAttribute('height', height);
    container.setAttribute('fill', 'none');
    container.setAttribute('stroke', 'black');
    svg.appendChild(container);

    // Draw diluent
    const diluent = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    diluent.setAttribute('x', '0');
    diluent.setAttribute('y', height - diluentHeight * scale);
    diluent.setAttribute('width', width);
    diluent.setAttribute('height', diluentHeight * scale);
    diluent.setAttribute('fill', 'lightblue');
    svg.appendChild(diluent);

    // Draw hardener
    const hardener = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    hardener.setAttribute('x', '0');
    hardener.setAttribute('y', height - (diluentHeight + hardenerHeight) * scale);
    hardener.setAttribute('width', width);
    hardener.setAttribute('height', hardenerHeight * scale);
    hardener.setAttribute('fill', 'yellow');
    svg.appendChild(hardener);

    // Draw base
    const base = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    base.setAttribute('x', '0');
    base.setAttribute('y', height - (diluentHeight + hardenerHeight + baseHeight) * scale);
    base.setAttribute('width', width);
    base.setAttribute('height', baseHeight * scale);
    base.setAttribute('fill', 'red');
    svg.appendChild(base);

    // Draw lines and labels
    const lines = [
        { y: height, label: '0' },
        { y: height - diluentHeight * scale, label: diluentHeight.toFixed(2) },
        { y: height - (diluentHeight + hardenerHeight) * scale, label: (diluentHeight + hardenerHeight).toFixed(2) },
        { y: height - (diluentHeight + hardenerHeight + baseHeight) * scale, label: containerHeight.toFixed(2) }
    ];

    lines.forEach(line => {
        const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        l.setAttribute('x1', '0');
        l.setAttribute('y1', line.y);
        l.setAttribute('x2', width);
        l.setAttribute('y2', line.y);
        l.setAttribute('stroke', 'black');
        l.setAttribute('stroke-dasharray', '5,5');
        svg.appendChild(l);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', width + 5);
        text.setAttribute('y', line.y);
        text.setAttribute('fill', 'black');
        text.setAttribute('font-size', '12');
        text.setAttribute('text-anchor', 'start');
        text.textContent = line.label;
        svg.appendChild(text);
    });
}

// Login functionality
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage');

    if (username === 'test' && password === 'test') {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'index.html';
    } else {
        loginMessage.textContent = 'שם משתמש או סיסמה שגויים';
    }
}

// Check login status
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }
}

// Logout functionality
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}

// Check login status when the page loads
if (document.body.classList.contains('calculator')) {
    checkLoginStatus();
}