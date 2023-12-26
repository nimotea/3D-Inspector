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
    FollowCameraPointersInput,
    UniversalCamera,
    AnimationGroup
  } from "@babylonjs/core";
  import { Inspector } from "@babylonjs/inspector";
  import * as GUI from "@babylonjs/gui";
  
  // declare canvas dom
  const canvas = document.getElementById("renderCanvas");
  
  // create babylonjs engine
  const engine = new Engine(canvas);
  
  const scene = new Scene(engine);
  
  const camera = new ArcRotateCamera("Camera1", 10, 0, 50, new Vector3(110, 20, 0), scene)
  // const camera = new UniversalCamera("camera",new Vector3(0,10,0),scene);
  camera.attachControl(true);
  camera.upperBetaLimit = Math.PI / 2 - 0.1;
  camera.lowerBetaLimit = 0;
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

    const danceAnim = scene.getAnimationGroupByName("Dance");
    const walkAnim = scene.getAnimationGroupByName("Walking");
    const idleAnim = scene.getAnimationGroupByName("Idle");
  

    // parse animations
    var animationJson = {"animations":[{"name":"move","property":"position","framePerSecond":60,"dataType":1,"loopBehavior":1,"blendingSpeed":0.01,"keys":[{"frame":0,"values":[80.97,0,-63.76,[0,0,0],[0,0,0.08333333333333333]]},{"frame":207,"values":[80.97,0,-46.51,[0,0,0.08333333333333333],[0,0,1.082109375]]},{"frame":328,"values":[91.06,0,-46.51]},{"frame":1923.9999999999998,"values":[91.06,0,86.53]},{"frame":2574,"values":[145.18,0,86.53]},{"frame":4376.999999999999,"values":[145.18,0,-63.76]},{"frame":5148,"values":[80.97,0,-63.76]},{"frame":5355,"values":[80.97,0,-46.51]},{"frame":5472,"values":[71.19999999999999,0,-46.51]},{"frame":7068.000000000002,"values":[71.2,0,86.53]},{"frame":7705,"values":[18.197,0,86.53]},{"frame":9507.999999999998,"values":[18.197,0,-63.76]},{"frame":10261,"values":[80.97,0,-63.76]}],"ranges":[]},{"name":"rotate","property":"rotation","framePerSecond":60,"dataType":1,"loopBehavior":1,"blendingSpeed":0.01,"keys":[{"frame":0,"values":[0,0,0,[0,0,0],[0,0,0],1]},{"frame":207,"values":[0,1.57,0,[0,-0.000227118921348103,0],[0,-0.0000638651974267944,0],1]},{"frame":328,"values":[0,0,0,[0,-0.00009466859293030458,0],[0,-0.00009466859293030458,0],1]},{"frame":1923.9999999999998,"values":[0,1.57,0,[0,0.000026510360390164003,0],[0,0.000026510360390164003,0],1]},{"frame":2574,"values":[0,3.14,0,[0,-0.00013502301938411374,0],[0,-0.00013502301938411374,0],1]},{"frame":4376.999999999999,"values":[0,4.71,0,[0,-0.0006447759437070144,0],[0,-0.0006447759437070144,0],1]},{"frame":5148,"values":[0,0,0,[0,-0.0004981626886153769,0],[0,-0.0004981626886153769,0],1]},{"frame":5355,"values":[0,-1.57,0,[0,-0.00022032562418950347,0],[0,-0.00022032562418950347,0],1]},{"frame":5472,"values":[0,0,0,[0,-0.005576435545416752,0],[0,-0.005576435545416752,0],1]},{"frame":7068.000000000001,"values":[0,-1.57,0,[0,0.00237955503805527,0],[0,0.00237955503805527,0],1]},{"frame":7703.999999999999,"values":[0,-3.14,0,[0,0.010655203528363442,0],[0,0.010655203528363442,0],1]},{"frame":9507.999999999998,"values":[0,-4.71,0,[0,0.001662630995334949,0],[0,0.001662630995334949,0],1]},{"frame":10261,"values":[0,-6.28,0,[0,0,0],[0,0,0]]}],"ranges":[]}]};
      let animations = [Animation.Parse(animationJson.animations[0]),Animation.Parse(animationJson.animations[1])];
      let robotAnimation = new AnimationGroup("robotRunning");
      robotAnimation.addTargetedAnimation(animations[0],robot);
      robotAnimation.addTargetedAnimation(animations[1],robot);
      robotAnimation.normalize(0,10261)
    

    // GUI

  const button = createButton('CarButton','机器人','-45%','45%');
  const button2 = createButton('stopAnimation','停止','-45%','35%');



  function createButton(name,text,top,left){
    let button = GUI.Button.CreateSimpleButton(name,text);
    button.width = '100px';
    button.height = '40px';
    button.top = top;
    button.left = left;
    button.background = 'rgba(139,134,134,0.43)';
    button.color = 'white';
    button.shadowColor = '#000';
    button.shadowOffsetX = 2;
    button.shadowOffsetY = 2;
    button.cornerRadius = 10;
    button.thickness = 0;

    return button;
  }
  button.onPointerDownObservable.add(function(){
    button.background = 'rgba(139,134,134,1)';
  })

  button.onPointerUpObservable.add(function(){
    button.background = 'rgba(139,134,134,0.43)';
  })
  button2.onPointerDownObservable.add(function(){
    button2.background = 'rgba(139,134,134,1)';
  })

  button2.onPointerUpObservable.add(function(){
    button2.background = 'rgba(139,134,134,0.43)';
  })

  button.onPointerUpObservable.add(function(){
    if(button.textBlock.text === "机器人"){
      button.textBlock.text = "园区";
      camera.detachControl();
      scene.activeCamera = camera2;
      scene.activeCamera.attachControl(true);
      scene.activeCamera.inputs.remove();
      robotAnimation.reset().play();
      walkAnim.reset().play();


    //   robot.visibility = 0;

    }else{
      button.textBlock.text = "机器人";
      camera2.detachControl();
      scene.activeCamera = camera;
      scene.activeCamera.attachControl(true);
    }
  })

  button2.onPointerUpObservable.add(function(){
    if(button2.textBlock.text === "停止"){
      button2.textBlock.text = "开始";
      robotAnimation.pause()
      walkAnim.pause();
      idleAnim.start(true,1.0,idleAnim.from,idleAnim.to,false);
    }else{
      button2.textBlock.text = "停止";
      robotAnimation.play(true)
      walkAnim.play(true);
      idleAnim.stop();

    }
  })

  advancedTexure.addControl(button);
  advancedTexure.addControl(button2);


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


  // stop default dance animation
  danceAnim.stop();
  walkAnim.start(true,2,walkAnim.from,walkAnim.to,false);
  robotAnimation.start(true,1,robotAnimation.from,robotAnimation.to,false);
  
  // scene.beginAnimation(robot,0,8871,true);

  };
  
  // 加载园区
  loadPack();
  loadModelFile();
  
  engine.runRenderLoop(function () {
    scene.render();
  });
  
  // open / disabled inspector
  
  Inspector.Show(scene);
  