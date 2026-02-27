// 3D Globe
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight,0.1,1000);
let renderer = new THREE.WebGLRenderer({alpha:true,antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.getElementById("globeContainer").appendChild(renderer.domElement);

let geometry = new THREE.SphereGeometry(3,64,64);
let material = new THREE.MeshStandardMaterial({color:0x156289,emissive:0x072534,roughness:0.7,metalness:0.3});
let globe = new THREE.Mesh(geometry,material);
scene.add(globe);

let light = new THREE.PointLight(0xffffff,1);
light.position.set(10,10,10);
scene.add(light);

camera.position.z = 8;

function animateGlobe(){
  requestAnimationFrame(animateGlobe);
  globe.rotation.y += 0.002;
  renderer.render(scene,camera);
}
animateGlobe();

window.addEventListener('resize',()=>{
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
});

// AUDIO
document.addEventListener("click",()=>{
  let bgm=document.getElementById("bgm");
  let swoosh=document.getElementById("swoosh");
  bgm.volume=0.5; bgm.play();
  swoosh.play();
});

// INTRO TIMING
setTimeout(()=>{
  document.getElementById("introOverlay").style.opacity=0;
  document.getElementById("introLogo").style.opacity=0;
  setTimeout(()=>document.getElementById("intro").style.display="none",1500);
  
  document.getElementById("mainHero").style.opacity = 1;
  document.querySelectorAll('.section').forEach(sec => sec.style.opacity = 1);
  document.querySelector('footer').style.opacity = 1;
  document.getElementById("bgm").play();
},3000);

// COUNTERS ON SCROLL
function isInViewport(el){
  let rect=el.getBoundingClientRect();
  return rect.top<=window.innerHeight && rect.bottom>=0;
}
function animateCounter(id,target){
  let done=false;
  window.addEventListener('scroll',function(){
    if(done) return;
    if(isInViewport(document.getElementById(id))){
      let count=0,speed=target/200;
      let counter=setInterval(()=>{
        count+=speed;
        if(count>=target){count=target;clearInterval(counter);}
        document.getElementById(id).innerText=Math.floor(count);
      },10);
      done=true;
    }
  });
}
animateCounter("counter1",500);
animateCounter("counter2",1200);
animateCounter("counter3",15);

// TESTIMONIALS
let slides=document.querySelectorAll(".slide"),index=0;
setInterval(()=>{
  slides[index].classList.remove("active");
  index=(index+1)%slides.length;
  slides[index].classList.add("active");
},3000);

// BACK TO TOP & PROGRESS
let topBtn=document.getElementById("topBtn"),progress=document.getElementById("progress");
window.onscroll=()=>{
  let scroll=document.documentElement.scrollTop;
  let height=document.documentElement.scrollHeight-document.documentElement.clientHeight;
  progress.style.width=(scroll/height)*100+"%";
  topBtn.style.display=scroll>300?"block":"none";
};
topBtn.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});