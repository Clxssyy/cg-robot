import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setY(-5);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 6, 3);
scene.add(light);

// const helper = new THREE.DirectionalLightHelper(light, 5);
// scene.add(helper);

// Robot
const robotMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
const robotEyesMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
});

// Head
const robotHead = new THREE.BoxGeometry(7, 7, 7);
const head = new THREE.Mesh(robotHead, robotMaterial);

// Hat
const robotHat = new THREE.ConeGeometry(3, 5, 10);
const hat = new THREE.Mesh(
  robotHat,
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
hat.position.y = 5;
hat.position.z = 0;

// Eyes
const robotEye = new THREE.SphereGeometry(1, 10, 10);
const eye = new THREE.Mesh(robotEye, robotEyesMaterial);
eye.position.x = 2;
eye.position.y = 1;
eye.position.z = 3.5;

const eye2 = new THREE.Mesh(robotEye, robotEyesMaterial);
eye2.position.x = -2;
eye2.position.y = 1;
eye2.position.z = 3.5;

// Body
const robotBody = new THREE.BoxGeometry(10, 10, 10);
const body = new THREE.Mesh(robotBody, robotMaterial);
body.position.y = -8;

// Backpack
const robotBackpack = new THREE.BoxGeometry(5, 6, 2);
const backpack = new THREE.Mesh(
  robotBackpack,
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
backpack.position.y = -7;
backpack.position.z = -5;

// Arms
const robotArm = new THREE.BoxGeometry(3, 10, 3);
const arm = new THREE.Mesh(robotArm, robotMaterial);
arm.position.x = -7;
arm.position.y = -9;
arm.rotateZ(-0.5);

const arm2 = new THREE.Mesh(robotArm, robotMaterial);
arm2.position.x = 7;
arm2.position.y = -9;
arm2.rotateZ(0.5);

// Legs
const robotLeg = new THREE.BoxGeometry(3, 5, 4);
const leg = new THREE.Mesh(robotLeg, robotMaterial);
leg.position.y = -15;
leg.position.x = 3;

const leg2 = new THREE.Mesh(robotLeg, robotMaterial);
leg2.position.y = -15;
leg2.position.x = -3;

// Feet
const robotFoot = new THREE.BoxGeometry(3, 1, 4);
const foot = new THREE.Mesh(robotFoot, robotMaterial);
foot.position.y = -17;
foot.position.x = 3;
foot.position.z = 1;

const foot2 = new THREE.Mesh(robotFoot, robotMaterial);
foot2.position.y = -17;
foot2.position.x = -3;
foot2.position.z = 1;

// Accessories
const robotAccessory = new THREE.BoxGeometry(0.25, 8, 0.25);
const accessory = new THREE.Mesh(robotAccessory, robotEyesMaterial);
accessory.position.y = -8;
accessory.position.x = 0;
accessory.position.z = 5;

const accessory2 = new THREE.Mesh(robotAccessory, robotEyesMaterial);
accessory2.position.y = -8;
accessory2.position.x = -2;
accessory2.position.z = 5;

const accessory3 = new THREE.Mesh(robotAccessory, robotEyesMaterial);
accessory3.position.x = 2;
accessory3.position.y = -8;
accessory3.position.z = 5;

// Add all parts to the same mesh
const robot = new THREE.Group();
robot.add(head, hat, eye, eye2, body, backpack, arm, arm2, leg, leg2, foot, foot2, accessory, accessory2, accessory3);

scene.add(robot);

let jumping = false;
let spinning = false;
let jumpHeight = 5;

function jump() {
  robot.position.y += 0.5;
  jumpHeight -= 0.5;

  if (jumpHeight < 0) {
    jumping = false;
    while(jumpHeight < 5) {
      robot.position.y -= 0.5;
      jumpHeight += 0.5;
    }
  }
}

function spin() {
  robot.rotation.y += 0.1;
}

// Rendering
function animate() {
  requestAnimationFrame(animate);

  // Rotation around the robot
  camera.position.x = Math.sin(Date.now() * 0.0005) * 30;
  camera.position.z = Math.cos(Date.now() * 0.0005) * 30;

  camera.lookAt(scene.position);

  renderer.render(scene, camera);

  if (jumping) {
    jump();
  }

  if (spinning) {
    spin();
  }
}

animate();

// Handle inputs
document.addEventListener('keypress', (event) => {
  if (event.key === 'c') {
    const color = new THREE.Color(Math.random(), Math.random(), Math.random());
    const green = new THREE.Color(0x00ff00);
    const red = new THREE.Color(0xff1100);
    body.material.color = color;
    head.material.color = color;
    arm.material.color = color;
    arm2.material.color = color;
    leg.material.color = color;
    leg2.material.color = color;
    foot.material.color = color;
    foot2.material.color = color;

    if (eye.material.color.equals(green)) {
      eye.material.color = red;
      eye2.material.color = red;
      accessory.material.color = red;
      accessory2.material.color = red;
      accessory3.material.color = red;
    } else {
      eye.material.color = green;
      eye2.material.color = green;
      accessory.material.color = green;
      accessory2.material.color = green;
      accessory3.material.color = green;
    }
  }

  // Jump
  if (event.key === 'j') {
    jumping = !jumping;
  }

  // Spin
  if (event.key === 's') {
    spinning = !spinning;
  }
});

// Stars
for (let i = 0; i < 200; i++) {
  const star = new THREE.SphereGeometry(0.25, 24, 24);
  const starMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });
  const starMesh = new THREE.Mesh(star, starMaterial);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  starMesh.position.set(x, y, z);
  scene.add(starMesh);
}
