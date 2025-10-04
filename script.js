let health = 80;
let finance = 5000;
let age = 30;
let mind = 50;
let progress = 0; // Procent linii życia

function updateStats() {
    document.getElementById('health').textContent = `${health}/100`;
    document.querySelectorAll('.fill')[0].style.width = `${health}%`;

    document.getElementById('finance').textContent = `${finance} zł`;
    document.querySelectorAll('.fill')[1].style.width = `${finance / 100}%`; // Zakładamy max 10000 zł

    document.getElementById('age').textContent = `${age} lat`;
    document.querySelectorAll('.fill')[2].style.width = `${age}%`; // Max 100 lat

    document.getElementById('mind').textContent = `${mind}/100`;
    document.querySelectorAll('.fill')[3].style.width = `${mind}%`;
}

function moveAvatar() {
    progress += 5;
    if (progress > 100) progress = 100;
    document.getElementById('avatar').style.left = `${progress}%`;
    if (progress === 100) alert('Koniec życia! Gra skończona.');
}

function chooseAction(choice) {
    if (choice === 1) { // Karta lewa: Praca
        finance += 200;
        health -= 5;
    } else { // Karta prawa: Urlop
        health += 10;
        finance -= 100;
    }
    age += 1; // Upływ czasu
    mind += Math.random() > 0.5 ? 5 : -5; // Losowa zmiana umysłu

    // Limity
    if (health < 0) health = 0;
    if (health > 100) health = 100;
    if (finance < 0) finance = 0;
    if (mind < 0) mind = 0;
    if (mind > 100) mind = 100;

    updateStats();
    moveAvatar();

    if (health === 0) alert('Zdrowie na zero! Gra skończona.');
}

// Inicjalizacja
updateStats();
