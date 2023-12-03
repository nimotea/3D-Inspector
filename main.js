import {
  Vector3,
  Scene,
  Engine,
  MeshBuilder,
  SceneLoader,
  CreateGround,
  ArcRotateCamera,
  HemisphericLight,
} from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import * as GUI from "@babylonjs/gui";

// declare canvas dom
const canvas = document.getElementById("renderCanvas");

// create babylonjs engine
const engine = new Engine(canvas);

const scene = new Scene(engine);

const camera = new ArcRotateCamera(
  "arcRotateCamer",
  0,
  0,
  10,
  new Vector3(0, 0, 0),
  scene
);
camera.attachControl(true);

const light = new HemisphericLight(
  "hemisphereLight",
  new Vector3(0, 20, 0),
  scene
);

const loadModelFile = async () => {
  const models = await SceneLoader.ImportMeshAsync(
    null,
    "./",
    "RobotExpressive.glb",
    scene
  );
  const robot = models.meshes[0];
};

const ground = CreateGround("ground",{width:50,height:50});
loadModelFile();

engine.runRenderLoop(function () {
  scene.render();
});

// open / disabled inspector

Inspector.Show(scene);
