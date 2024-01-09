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
  
  const camera = new ArcRotateCamera("Camera1", 10, 0, 50, new Vector3(0, 20, 0), scene)
  // const camera = new UniversalCamera("camera",new Vector3(0,10,0),scene);
  camera.attachControl(true);
  camera.upperBetaLimit = Math.PI / 2 - 0.1;
  camera.lowerBetaLimit = 0;
  const light = new HemisphericLight(
    "hemisphereLight",
    new Vector3(0, 20, 0),
    scene
  );

  // const advancedTexure = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
  
  const loadModelFile = async () => {
    const models = await SceneLoader.ImportMeshAsync(
      null,
      "./",
      "1车间模型.glb",
      scene
    );
    const workshop = models.meshes[0];

  }

  const loadCar = async () => {
    const models = await SceneLoader.ImportMeshAsync(
      null,
      "./",
      "Truck.glb",
      scene
    );
  /*   const robot = models.meshes[0];
    robot.position = new Vector3(15,0,0);
    robot.scaling.setAll(0.5); */
    const car = models.meshes[0];
    car.scaling.setAll(0.5);
    car.position = new Vector3(5.686,0,-29.118);
    car.rotation.setAll(0);

    var animationJson = {"animations":[{"name":"AOI检测仪-position","property":"position","framePerSecond":60,"dataType":1,"loopBehavior":1,"blendingSpeed":0.01,"keys":[{"frame":0,"values":[5.686,0,-29.118,[0,0,0],[0,0,0.137325],0]},{"frame":240,"values":[5.69,0,3.84,[0,0,0.137325],[0,0,-0.13368818599010515],0]},{"frame":290,"values":[3.69,0,3.84]},{"frame":319.99999999999994,"values":[3.69,0,3.84]}],"ranges":[]},{"name":"AOI检测仪-rotation","property":"rotation","framePerSecond":60,"dataType":1,"loopBehavior":1,"blendingSpeed":0.01,"keys":[{"frame":0,"values":[0,0,0,[0,0,0],[0,0.3,0],1]},{"frame":239.99999999999997,"values":[0,-1.57,0,[0,0.3,0],[0,0.0031052361544687246,0],1]},{"frame":290,"values":[0,-3.14,0,null,null,1]},{"frame":319.99999999999994,"values":[0,-3.14,0,null,null,1]}],"ranges":[]}]}
    let animations = [Animation.Parse(animationJson.animations[0]),Animation.Parse(animationJson.animations[1])];
    let robotAnimation = new AnimationGroup("action");
      robotAnimation.addTargetedAnimation(animations[0],car);
      robotAnimation.addTargetedAnimation(animations[1],car);
      robotAnimation.start(false,1,robotAnimation.from,robotAnimation.to,false)
  

    // parse animations
  /*   var animationJson = {"animations":[{"name":"move","property":"position","framePerSecond":60,"dataType":1,"loopBehavior":1,"blendingSpeed":0.01,"keys":[{"frame":0,"values":[80.97,0,-63.76,[0,0,0],[0,0,0.08333333333333333]]},{"frame":207,"values":[80.97,0,-46.51,[0,0,0.08333333333333333],[0,0,1.082109375]]},{"frame":328,"values":[91.06,0,-46.51]},{"frame":1923.9999999999998,"values":[91.06,0,86.53]},{"frame":2574,"values":[145.18,0,86.53]},{"frame":4376.999999999999,"values":[145.18,0,-63.76]},{"frame":5148,"values":[80.97,0,-63.76]},{"frame":5355,"values":[80.97,0,-46.51]},{"frame":5472,"values":[71.19999999999999,0,-46.51]},{"frame":7068.000000000002,"values":[71.2,0,86.53]},{"frame":7705,"values":[18.197,0,86.53]},{"frame":9507.999999999998,"values":[18.197,0,-63.76]},{"frame":10261,"values":[80.97,0,-63.76]}],"ranges":[]},{"name":"rotate","property":"rotation","framePerSecond":60,"dataType":1,"loopBehavior":1,"blendingSpeed":0.01,"keys":[{"frame":0,"values":[0,0,0,[0,0,0],[0,0,0],1]},{"frame":207,"values":[0,1.57,0,[0,-0.000227118921348103,0],[0,-0.0000638651974267944,0],1]},{"frame":328,"values":[0,0,0,[0,-0.00009466859293030458,0],[0,-0.00009466859293030458,0],1]},{"frame":1923.9999999999998,"values":[0,1.57,0,[0,0.000026510360390164003,0],[0,0.000026510360390164003,0],1]},{"frame":2574,"values":[0,3.14,0,[0,-0.00013502301938411374,0],[0,-0.00013502301938411374,0],1]},{"frame":4376.999999999999,"values":[0,4.71,0,[0,-0.0006447759437070144,0],[0,-0.0006447759437070144,0],1]},{"frame":5148,"values":[0,0,0,[0,-0.0004981626886153769,0],[0,-0.0004981626886153769,0],1]},{"frame":5355,"values":[0,-1.57,0,[0,-0.00022032562418950347,0],[0,-0.00022032562418950347,0],1]},{"frame":5472,"values":[0,0,0,[0,-0.005576435545416752,0],[0,-0.005576435545416752,0],1]},{"frame":7068.000000000001,"values":[0,-1.57,0,[0,0.00237955503805527,0],[0,0.00237955503805527,0],1]},{"frame":7703.999999999999,"values":[0,-3.14,0,[0,0.010655203528363442,0],[0,0.010655203528363442,0],1]},{"frame":9507.999999999998,"values":[0,-4.71,0,[0,0.001662630995334949,0],[0,0.001662630995334949,0],1]},{"frame":10261,"values":[0,-6.28,0,[0,0,0],[0,0,0]]}],"ranges":[]}]};
      let animations = [Animation.Parse(animationJson.animations[0]),Animation.Parse(animationJson.animations[1])];
      let robotAnimation = new AnimationGroup("robotRunning");
      robotAnimation.addTargetedAnimation(animations[0],robot);
      robotAnimation.addTargetedAnimation(animations[1],robot);
      robotAnimation.normalize(0,10261) */
    

    // GUI





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
  

  // advancedTexure.addControl(button);
  // advancedTexure.addControl(button2);



  // stop default dance animation
  

  };
  
  // 加载园区
  loadCar();
  loadModelFile();

  
  engine.runRenderLoop(function () {
    scene.render();
  });
  
  // open / disabled inspector
  
  Inspector.Show(scene);
  