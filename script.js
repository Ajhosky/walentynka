const yesButton = document.getElementById("yes");
const noButton = document.getElementById("no");
const buttonArea = document.getElementById("buttonArea");

const startScreen = document.getElementById("startScreen");
const finalScreen = document.getElementById("finalScreen");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let scale = 1;

/* =======================
   KLIK TAK
======================= */

yesButton.addEventListener("click", () => {

    // Ukryj pierwszy ekran
    startScreen.style.display = "none";

    // Pokaż drugi ekran
    finalScreen.style.display = "flex";

    // Uruchom fajerwerki PO pokazaniu ekranu
    setTimeout(() => {
        startMultipleFireworks();
    }, 100);
});

/* =======================
   FAJERWERKI
======================= */

function startMultipleFireworks() {

    let particles = [];

    function createHeartExplosion(xCenter, yCenter) {

        for (let t = 0; t < Math.PI * 2; t += 0.02) { // WIĘCEJ ELEMENTÓW

            let x = 16 * Math.pow(Math.sin(t), 3);
            let y =
                13 * Math.cos(t) -
                5 * Math.cos(2 * t) -
                2 * Math.cos(3 * t) -
                Math.cos(4 * t);

            particles.push({
                x: xCenter,
                y: yCenter,
                targetX: xCenter + x * 14, // większe serce
                targetY: yCenter - y * 14,
                size: Math.random() * 5 + 3, // większe cząstki
                alpha: 1,
                speed: 0.02 + Math.random() * 0.02 // WOLNIEJSZE
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += (p.targetX - p.x) * p.speed;
            p.y += (p.targetY - p.y) * p.speed;
            p.alpha -= 0.004; // wolniejsze znikanie

            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = "#ff4d6d";
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        particles = particles.filter(p => p.alpha > 0);

        if (particles.length > 0) {
            requestAnimationFrame(animate);
        }
    }

    // RZADSZE WYBUCHY
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            createHeartExplosion(x, y);
            animate();
        }, i * 300); // było 150
    }
}

/* =======================
   PRZYCISK NIE
======================= */

function moveButton(e) {
    e.preventDefault();

    scale -= 0.08;
    if (scale < 0.5) scale = 0.5;

    noButton.style.transform = "scale(" + scale + ")";

    const areaRect = buttonArea.getBoundingClientRect();
    const btnRect = noButton.getBoundingClientRect();

    const maxX = areaRect.width - btnRect.width;
    const maxY = areaRect.height - btnRect.height;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noButton.style.left = randomX + "px";
    noButton.style.top = randomY + "px";
    noButton.style.right = "auto";
}

/* =======================
   SPADAJĄCE SERCA (TŁO)
======================= */

function createFallingHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
    heart.style.fontSize = (Math.random() * 20 + 15) + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

setInterval(createFallingHeart, 300);

noButton.addEventListener("mouseover", moveButton);
noButton.addEventListener("touchstart", moveButton);
noButton.addEventListener("click", moveButton);