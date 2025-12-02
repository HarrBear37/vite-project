import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.128.0-RUwHhyqazSQDSNE4T73c/mode=imports/optimized/three.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


// create a new renderer by instating the canvas element in our HTML // file
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.render(scene, camera);

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(-3);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, -10, 10);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(25, -15, -400);

scene.add(pointLight);
scene.add(ambientLight);

const geometry = new THREE.BoxGeometry(10, 10, 10);

//set the color of the basic material in the object parameters `{}`

const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );

const cube = new THREE.Mesh( geometry, material );

scene.add( cube );

cube.position.z = -15;
cube.position.x = -15;
cube.rotation.x = 2;
cube.rotation.y = .5;

const ico = new THREE.IcosahedronGeometry(10);
const icoMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const icoMesh = new THREE.Mesh(ico, icoMaterial);

scene.add(icoMesh);

icoMesh.position.z= -15;
icoMesh.position.x= 15;

//texture

const normalTexture = new THREE.TextureLoader().load('images/normals/textureNormal.png');

// Normal Texture Map

const torusGeo = new THREE.TorusKnotGeometry( 5, 1, 250, 5, 9, 15 );
const torusMaterial = new THREE.MeshStandardMaterial( {
    normalMap: normalTexture,
    roughness: 0,
    metalness: .8
} );

const torusKnot = new THREE.Mesh( torusGeo, torusMaterial );

scene.add( torusKnot );
torusKnot.position.y = 20

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight);

scene.add(lightHelper)

const gridHelper = new THREE.GridHelper(200,50);

scene.add(gridHelper)

// Orbit Control

const controls = new OrbitControls(camera, renderer.domElement)

// Background

const spaceTexture = new THREE.TextureLoader().load('images/night_sky.jpg')

scene.background = spaceTexture;

// Object texture mapping

const smileTexture = new THREE.TextureLoader().load('images/smile.jpg')

const sphereGeometry = new THREE.SphereGeometry( 10, 22, 10 );

const smileMaterial = new THREE.MeshStandardMaterial({map: smileTexture})

const smileMesh = new THREE.Mesh(sphereGeometry, smileMaterial);

scene.add(smileMesh);

smileMesh.position.y = 10;
smileMesh.rotation.y = Math.PI / -2;

//body

const bod = new THREE.BoxGeometry(10, 20, 10);

const bodMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

const prismMesh = new THREE.Mesh(bod, bodMaterial);

scene.add(prismMesh);

prismMesh.position.y = -10;

//Right arm

const armR = new THREE.BoxGeometry(2.5, 15, 2.5);

const armRMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

const armRMesh = new THREE.Mesh(armR, armRMaterial);

scene.add(armRMesh);

armRMesh.position.x = 9;
armRMesh.position.y = -7;
armRMesh.rotation.z = Math.PI / 1.35;

//left arm

const armL = new THREE.BoxGeometry(2.5, 15, 2.5);

const armLMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

const armLMesh = new THREE.Mesh(armL, armLMaterial);

scene.add(armLMesh);

armLMesh.position.x = -9;
armLMesh.position.y = -7;
armLMesh.rotation.z = Math.PI / -1.35;

//right leg

const legR = new THREE.BoxGeometry(2.5, 15, 2.5);

const legRMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });

const legRMesh = new THREE.Mesh(legR, legRMaterial);

scene.add(legRMesh);

legRMesh.position.x = 2;
legRMesh.position.y = -25;

//left leg

const legL = new THREE.BoxGeometry(2.5, 15, 2.5);

const legLMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });

const legLMesh = new THREE.Mesh(legL, legLMaterial);

scene.add(legLMesh);

legLMesh.position.x = -2;
legLMesh.position.y = -25;

function animate() {
    requestAnimationFrame( animate );
    // slowly rotate the cube:
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // rotate the icosahedron a little faster in the opposite direction:
    icoMesh.rotation.z += -0.03;
    icoMesh.rotation.y += -0.03;

    //smileMesh.rotation.y += -0.05;
    controls.update();


    renderer.render( scene, camera );
}
animate();