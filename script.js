// ---------------- Background Music ----------------
const bgm = document.getElementById("bgm");
bgm.volume = 0.2;
bgm.play().catch(() => {});

// ---------------- Plane Animation Event ----------------
const plane = document.querySelector(".planeAnimation");
plane.addEventListener("animationend", () => {
  const overlay = document.getElementById("transitionOverlay");
  overlay.style.opacity = "0";
  setTimeout(() => overlay.style.display = "none", 1000);
});

// ---------------- Counters ----------------
const counters = [
  { id: "counter1", end: 1200 },
  { id: "counter2", end: 850 },
  { id: "counter3", end: 50 }
];

counters.forEach(counter => {
  let el = document.getElementById(counter.id);
  let count = 0;
  let interval = setInterval(() => {
    count += Math.ceil(counter.end / 100);
    if(count >= counter.end) count = counter.end;
    el.textContent = count;
    if(count == counter.end) clearInterval(interval);
  }, 20);
});

// ---------------- Simple Page Transition ----------------
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const overlay = document.getElementById("transitionOverlay");
    overlay.style.opacity = "1";
    setTimeout(() => window.location = btn.href, 1000);
  });
});

// ---------------- EmailJS Integration ----------------
emailjs.init("YOUR_PUBLIC_KEY");

const form = document.getElementById("contactForm");
if(form){
  form.addEventListener("submit", function(e){
    e.preventDefault();
    emailjs.sendForm("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID", this)
      .then(()=> alert("Message Sent!"))
      .catch(()=> alert("Error sending message"));
    form.reset();
  });
}

// ---------------- 3D Globe ----------------
const globeContainer = document.getElementById("globeContainer");
if(globeContainer){
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
  camera.position.z = 2;

  const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
  renderer.setSize(250,250);
  globeContainer.appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0x1a73e8,
    metalness: 0.7,
    roughness: 0.3
  });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(5,5,5);
  scene.add(light);

  function animate(){
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.002;
    renderer.render(scene, camera);
  }
  animate();
}

// ---------------- Simple Particle Background ----------------
const particlesContainer = document.querySelector(".particles-container");
if(particlesContainer){
  for(let i=0;i<100;i++){
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.position = "absolute";
    particle.style.width = particle.style.height = Math.random()*3+"px";
    particle.style.background = "#fff";
    particle.style.borderRadius = "50%";
    particle.style.top = Math.random()*100+"%";
    particle.style.left = Math.random()*100+"%";
    particle.style.opacity = Math.random();
    particlesContainer.appendChild(particle);
  }
}