import {
    Animation,
    Vector3,
    Scene,
    Engine,
    MeshBuilder,
    SceneLoader,
    CreateGround,
    ArcRotateCamera,
    HemisphericLight,
    FollowCamera,
    FollowCameraPointersInput
  } from "@babylonjs/core";
  import { Inspector } from "@babylonjs/inspector";
  import * as GUI from "@babylonjs/gui";
  
  // declare canvas dom
  const canvas = document.getElementById("renderCanvas");
  
  // create babylonjs engine
  const engine = new Engine(canvas);
  
  const scene = new Scene(engine);
  
  const camera = new ArcRotateCamera("Camera1", 10, 0, 50, new Vector3(0, 0, 0), scene)
  camera.attachControl(true);
  
  const light = new HemisphericLight(
    "hemisphereLight",
    new Vector3(0, 20, 0),
    scene
  );

  const advancedTexure = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
  
  const loadModelFile = async () => {
    const models = await SceneLoader.ImportMeshAsync(
      null,
      "./",
      "park.glb",
      scene
    );
    const park = models.meshes[0];
  };
  const loadPack = async () => {
    const models = await SceneLoader.ImportMeshAsync(
      null,
      "./",
      "RobotExpressive.glb",
      scene
    );
    const robot = models.meshes[0];
    robot.position = new Vector3(15,0,0);
    robot.scaling.setAll(0.5);

    // parse animations
    var animationJson = {"animations":[{"name":"move","property":"position","framePerSecond":60,"dataType":1,"loopBehavior":1,"blendingSpeed":0.01,"keys":[{"frame":0,"values":[15,0,0,[0,0,0],[0,0,-0.11111111111111113],0]},{"frame":566.9999999999999,"values":[15,0,-63,[0,0,-0.11111111111111113],[0,0,0],0]},{"frame":1062,"values":[70,0,-63]},{"frame":2403,"values":[70,0,86]},{"frame":3078,"values":[145,0,86]},{"frame":4419,"values":[145,0,-63]},{"frame":4707,"values":[177,0,-63]},{"frame":4859.999999999999,"values":[188,0,-50]},{"frame":6047.999999999999,"values":[188,0,82]},{"frame":6345,"values":[155,0,82]},{"frame":6624,"values":[155,0,113]},{"frame":7830,"values":[21,0,113]},{"frame":7906.5,"values":[15,0,107]},{"frame":8871,"values":[15,0,0]}],"ranges":[]},{"name":"rotate","property":"rotation","framePerSecond":60,"dataType":1,"loopBehavior":1,"blendingSpeed":0.01,"keys":[{"frame":0,"values":[0,3.14,0,[0,0,0],[0,0,0],1]},{"frame":566.9999999999999,"values":[0,1.57,0,[0,-0.000227118921348103,0],[0,-0.0000638651974267944,0],1]},{"frame":1062,"values":[0,0,0,[0,-0.00009466859293030458,0],[0,-0.00009466859293030458,0],1]},{"frame":2403.0000000000005,"values":[0,1.57,0,[0,0.000026510360390164003,0],[0,0.000026510360390164003,0],1]},{"frame":3078.000000000001,"values":[0,3.14,0,[0,-0.00013502301938411374,0],[0,-0.00013502301938411374,0],1]},{"frame":4419,"values":[0,1.57,0,[0,-0.0006447759437070144,0],[0,-0.0006447759437070144,0],1]},{"frame":4707,"values":[0,0.78,0,[0,-0.0004981626886153769,0],[0,-0.0004981626886153769,0],1]},{"frame":4860.000000000001,"values":[0,0,0,[0,-0.00022032562418950347,0],[0,-0.00022032562418950347,0],1]},{"frame":6048.000000000001,"values":[0,-1.57,0,[0,0.00036225497414331636,0],[0,0.00036225497414331636,0],1]},{"frame":6345,"values":[0,0,0,[0,0.0017284131292265997,0],[0,0.0017284131292265997,0],1]},{"frame":6624,"values":[0,4.71,0,[0,-0.005576435545416752,0],[0,-0.005576435545416752,0],1]},{"frame":7830,"values":[0,3.6,0,[0,0.00237955503805527,0],[0,0.00237955503805527,0],1]},{"frame":7906.5,"values":[0,3.14,0,[0,0.010655203528363442,0],[0,0.010655203528363442,0],1]},{"frame":8871,"values":[0,3.14,0,[0,0,0],[0,0,0]]}],"ranges":[]}]};
      let animations = [Animation.Parse(animationJson.animations[0]),Animation.Parse(animationJson.animations[1])];
      robot.animations = animations;
    

    // GUI

  const button = GUI.Button.CreateSimpleButton('CarButton','机器人');
  button.width = '100px';
  button.height = '40px';
  button.top = '-45%';
  button.left = '45%';
  button.background = 'rgba(139,134,134,0.43)';
  button.color = 'white';
  button.shadowColor = '#000';
  button.shadowOffsetX = 2;
  button.shadowOffsetY = 2;
  button.cornerRadius = 10;
  button.thickness = 0;
  button.onPointerDownObservable.add(function(){
    button.background = 'rgba(139,134,134,1)';
  })

  button.onPointerUpObservable.add(function(){
    button.background = 'rgba(139,134,134,0.43)';
  })

  button.onPointerUpObservable.add(function(){
    if(button.textBlock.text === "机器人"){
      button.textBlock.text = "园区";
      camera.detachControl();
      scene.activeCamera = camera2;
      scene.activeCamera.attachControl(true);
      scene.activeCamera.inputs.remove()


    //   robot.visibility = 0;

    }else{
      button.textBlock.text = "机器人";
      camera2.detachControl();
      scene.activeCamera = camera;
      scene.activeCamera.attachControl(true);
    }
  })

  advancedTexure.addControl(button);

  const camera2 = new FollowCamera("followCam",new Vector3(0,0,0),scene,robot);
  camera2.radius = -20;
  camera2.heightOffset = 3;
  camera2.rotationOffset = 0;
  camera2.cameraAcceleration = 0.05;

  camera2.lowerHeightOffsetLimit = 3;

  camera2.maxCameraSpeed = 10;
  // fix radiu
  camera2.lowerRadiusLimit = -20;
  camera2.upperRadiusLimit = -20;
  camera2.attachControl(true);

  const danceAnim = scene.getAnimationGroupByName("Dance");
  const walkAnim = scene.getAnimationGroupByName("Walking");

  // stop default dance animation
  danceAnim.stop();
  walkAnim.start(true,2,walkAnim.from,walkAnim.to,false);
  scene.beginAnimation(robot,0,8871,true);

  };
  
  // 加载园区
  loadPack();
  loadModelFile();
  
  engine.runRenderLoop(function () {
    scene.render();
  });
  
  // open / disabled inspector
  
  Inspector.Show(scene);
  