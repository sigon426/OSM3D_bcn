(function() {

  var viewport = document.querySelector('.viewport');

  var scene, camera, renderer, loader, light, controls;
  
  // set the scene size
  var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;

  // set some camera attributes
  var VIEW_ANGLE = 45,
      ASPECT = WIDTH / HEIGHT,
      NEAR = 1,
      FAR = 10000;

  //create a scene
  scene = new THREE.Scene();
  
  // create a WebGL renderer, camera
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;
  renderer.shadowMapType = THREE.PCFShadowMap;
  renderer.shadowMapAutoUpdate = true;

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  
  // the camera starts at x y z
  camera.position.y = 1200;
  camera.position.x = 1000;
  camera.position.z = 1800;

  // add the camera to the scene
  scene.add(camera);

  controls = new THREE.OrbitControls(camera);

  //How far you can orbit vertically, upper and lower limits.
  controls.maxPolarAngle = Math.PI/2.1; 
  
  // start the renderer
  renderer.setSize(WIDTH, HEIGHT);
  
  // attach the render-supplied DOM element 
  //$container.append(renderer.domElement);
  viewport.appendChild(renderer.domElement);

  loader = new THREE.JSONLoader();

  loader.load('./obj/mapas/map.js', function (geometry, materials) {
    
    var mesh, material;

    // initialize color variable
    // var color = new THREE.Color( "#4E4E4E" );
    // var hex = color.getHex();
    // material = new THREE.MeshFaceMaterial( { color: hex } );

    material = new THREE.MeshFaceMaterial(materials);

    mesh = new THREE.Mesh(geometry, material);

    mesh.scale.set(1, 1, 1);
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    
    

    scene.add(mesh);

  });

  //lights
  light = new THREE.DirectionalLight(0xffffff);
  light.shadowCameraTop = -1000;
  light.shadowCameraLeft = -1000;
  light.shadowCameraRight = 1000;
  light.shadowCameraBottom = 1000;
  light.shadowCameraNear = 20;
  light.shadowCameraFar = 10000;
  light.shadowBias = -.0001;
  light.shadowMapHeight = light.shadowMapWidth = 4096;
  light.shadowDarkness = .5;
  light.castShadow = true;
  light.position.set(0, 1000, -400);


  //stats 
/*  var stats = new Stats();
  stats.setMode(1); // 0: fps, 1: ms

  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  stats.domElement.style.zIndex = 100;
  
  document.body.appendChild( stats.domElement );

  setInterval( function () {

      stats.begin();

      // your code goes here

      stats.end();

  }, 1000 / 60 );*/


  scene.add(light);

  animate();

  function animate() {
    // draw!
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);

    //stats.update();

  }

})();
