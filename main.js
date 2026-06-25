// public/js/glow.js
// Lys rød glød som følger musen. Kun på enheter med ekte peker (mus),
// og slått av hvis brukeren har bedt om mindre bevegelse. På mobil/touch
// gjør den ingenting, så ytelsen der påvirkes ikke.
(function () {
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!finePointer || reduced) return;

  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let raf = null;

  function render() {
    glow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    raf = null;
  }

  window.addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
    glow.classList.add("is-on");
    if (!raf) raf = requestAnimationFrame(render);
  });

  document.addEventListener("mouseleave", () => glow.classList.remove("is-on"));
})();
