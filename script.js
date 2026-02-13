const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const buttonArea = document.getElementById("buttonArea");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let scale = 1;

/* ---------- TAK ---------- */

yesButton.addEventListener("click", () => {
    startHeartFirework();

    setTimeout(() => {
        document.body.innerHTML = `
            <div style="margin-top:30vh;text-align:center;">
                <div style="background:#ffd6e0;padding:40px 60px;border-radius:20px;display:inline-block;">
                    <h1>Wiedziałem Amelko ❤️</h1>
                    <h2>Teraz jesteś oficjalnie moją walentynką 💕</h2>
                </div>
            </div>
        `;
    }, 3500);
});

/* ---------- NIE ---------- */

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

noButton.addEventListener("mouseover", moveButton);
noButton.addEventListener("touchstart", moveButton);
noButton.addEventListener("click", moveButton);

/* ---------- SERDUSZKA TŁO ---------- */

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 3 + 2) + "s";
    heart.style.fontSize = (Math.random() * 20 + 15) + "px";
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);

/* ---------- FAJERWERKI SERCE ---------- */

function startHeartFirework() {

    let particles = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let t = 0; t < Math.PI * 2; t += 0.05) {

        let x = 16 * Math.pow(Math.sin(t), 3);
        let y =
            13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t);

        particles.push({
            x: centerX,
            y: centerY,
            targetX: centerX + x * 15,
            targetY: centerY - y * 15,
            size: Math.random() * 4 + 2,
            alpha: 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += (p.targetX - p.x) * 0.08;
            p.y += (p.targetY - p.y) * 0.08;
            p.alpha -= 0.01;

            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = "#ff4d6d";
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        if (particles[0].alpha > 0) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}