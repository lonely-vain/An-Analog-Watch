const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });  
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



const backgroundTexture = new THREE.TextureLoader().load('textures/bg2.jpg');  
scene.background = backgroundTexture;


const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);  
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xffffff, 1.2, 100);
pointLight1.position.set(20, 30, 30);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 0.8, 100);
pointLight2.position.set(-20, -30, 40);
scene.add(pointLight2);

const spotLight = new THREE.SpotLight(0xffffff, 0.5);
spotLight.position.set(0, 50, 50);
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 0.2;
spotLight.castShadow = true;
scene.add(spotLight);




camera.position.set(0, 0, 50);
camera.lookAt(0, 0, 0);


const bodyTexture = new THREE.TextureLoader().load('textures/body-texture.jpg'); 
const faceTexture = new THREE.TextureLoader().load('textures/ClockFace2.jpg');    
const needleTexture = new THREE.TextureLoader().load('textures/needle-texture.jpg');  


const bodyGeometry = new THREE.CylinderGeometry(10, 10, 2, 64);
const bodyMaterial = new THREE.MeshStandardMaterial({
    map: bodyTexture,
    metalness: 0.7,
    roughness: 0.3
});
const watchBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
watchBody.rotation.x = Math.PI / 2;  
scene.add(watchBody);


const faceGeometry = new THREE.CircleGeometry(9.5, 64);
const faceMaterial = new THREE.MeshStandardMaterial({
    map: faceTexture,
    metalness: 0.5,
    roughness: 0.4
});
const watchFace = new THREE.Mesh(faceGeometry, faceMaterial);
watchFace.position.z = 1.1; 
scene.add(watchFace);


const secondHand = new THREE.Mesh(new THREE.BoxGeometry(0.05, 9, 0.05), new THREE.MeshStandardMaterial({
    map: needleTexture,
    metalness: 1,
    roughness: 0.2
}));
secondHand.position.set(0, 0, 1.2);  
scene.add(secondHand);

const minuteHand = new THREE.Mesh(new THREE.BoxGeometry(0.1, 7, 0.1), new THREE.MeshStandardMaterial({
    map: needleTexture,
    metalness: 1,
    roughness: 0.2
}));
minuteHand.position.set(0, 0, 1.25);  
scene.add(minuteHand);

const hourHand = new THREE.Mesh(new THREE.BoxGeometry(0.2, 5, 0.1), new THREE.MeshStandardMaterial({
    map: needleTexture,
    metalness: 1,
    roughness: 0.2
}));
hourHand.position.set(0, 0, 1.3); 
scene.add(hourHand);


function animate() {
    requestAnimationFrame(animate);
    const date = new Date();

    secondHand.rotation.z = -date.getSeconds() * (Math.PI / 30) - date.getMilliseconds() * (Math.PI / (30 * 1000));

 
    minuteHand.rotation.z = -(date.getMinutes() + date.getSeconds() / 60) * (Math.PI / 30);

    
    hourHand.rotation.z = -(date.getHours() % 12 + date.getMinutes() / 60) * (Math.PI / 6);

    renderer.render(scene, camera);
}


document.addEventListener('keydown', function (event) {
    const cameraSpeed = 0.5;
    switch (event.key) {
        case 'ArrowUp':
            camera.position.z -= cameraSpeed;  
            break;
        case 'ArrowDown':
            camera.position.z += cameraSpeed;  
            break;
        case 'ArrowLeft':
            camera.position.x -= cameraSpeed;  
            break;
        case 'ArrowRight':
            camera.position.x += cameraSpeed;  
            break;
    }
    camera.lookAt(0, 0, 0);  
});

document.addEventListener('mousemove', function (event) {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    pointLight1.position.x = x * 80;  
    pointLight1.position.y = y * 80; 
});


animate();