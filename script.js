const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const buttonArea = document.getElementById("buttonArea");

let scale = 1;

/* ---------- KLIK TAK ---------- */

yesButton.addEventListener("click", () => {
    showFinalScreen();
});

/* ---------- POKAZ STRONĘ KOŃCOWĄ ---------- */

function showFinalScreen() {
    document.body.innerHTML = `
        <div style="
            height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            flex-direction:column;
            text-align:center;
            background:linear-gradient(135deg, #ff9a9e, #fad0c4);
            padding:20px;
            box-sizing:border-box;
        ">

            <div style="
                background:#ffd6e0;
                padding:60px 80px;
                border-radius:20px;
                box-shadow:0 10px 25px rgba(0,0,0,0.2);
                margin-bottom:40px;
            ">
                <h1 style="margin:0;font-size:42px;">Wiedziałem Amelko ❤️</h1>
                <h2 style="margin-top:20px;">Teraz jesteś oficjalnie moją walentynką 💕</h2>
            </div>

            <video 
                autoplay 
                loop 
                muted 
                playsinline 
                webkit-playsinline
                style="
                    width:80%;
                    max-width:600px;
                    border-radius:20px;
                    box-shadow:0 10px 25px rgba(0,0,0,0.3);
                "
            >
                <source src="film.mov" type="video/quicktime">
            </video>

        </div>

        <canvas id="fireworks"></canvas>
    `;

    startMultipleFireworks();
}
/* ---------- WIELE WYBUCHÓW ---------- */

function startMultipleFireworks() {

    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "fixed";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.pointerEvents = "none";

    let particles = [];

    function createHeartExplosion(xCenter, yCenter) {

        for (let t = 0; t < Math.PI * 2; t += 0.04) {

            let x = 16 * Math.pow(Math.sin(t), 3);
            let y =
                13 * Math.cos(t) -
                5 * Math.cos(2 * t) -
                2 * Math.cos(3 * t) -
                Math.cos(4 * t);

            particles.push({
                x: xCenter,
                y: yCenter,
                targetX: xCenter + x * 12,
                targetY: yCenter - y * 12,
                size: Math.random() * 4 + 2,
                alpha: 1,
                speed: Math.random() * 0.04 + 0.05
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += (p.targetX - p.x) * p.speed;
            p.y += (p.targetY - p.y) * p.speed;
            p.alpha -= 0.008;

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

    /* 25 wybuchów w różnych miejscach */
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            createHeartExplosion(x, y);
            animate();
        }, i * 200);
    }
}

/* ---------- PRZYCISK NIE ---------- */

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