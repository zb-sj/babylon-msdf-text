import "./style.css";
import * as BABYLON from "@babylonjs/core";
import { createTextMesh } from "babylon-msdf-text";
import fnt from "./fontAssets/roboto-regular.json";
import png from "./fontAssets/roboto-regular.png";
import { Pane } from "tweakpane";

const PARAMS = {
  text: "Hello Babylon",
  lineHeight: 1,
  letterSpacing: 0,
  width: 2500,
  align: "left",
  color: { r: 1, g: 0, b: 1 },
  opacity: 1,
};

const initCamera = (scene) => {
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    0,
    0,
    10,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );

  camera.attachControl(true);
  camera.setPosition(new BABYLON.Vector3(0, 0, -800));
  return camera;
};

const canvas = document.getElementById("renderCanvas");

const engine = new BABYLON.Engine(canvas);

const createScene = function (engine) {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(1, 1, 1);
  //CAMERA
  initCamera(scene);

  return scene;
};

const scene = createScene(engine);

let textGeo = createTextMesh({
  text: `Hello`,
  font: fnt,
  scene,
  atlas: png,
  engine,
  color: new BABYLON.Color3(1, 0, 0),
  ...PARAMS,
});

textGeo.position.x = -textGeo.getBoundingInfo().boundingBox.center.x / 2;
textGeo.position.y = textGeo.getBoundingInfo().boundingBox.center.y / 2;

engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});

//GUI PANEL
const pane = new Pane();

const lineHeightInput = pane.addBinding(PARAMS, "lineHeight", {
  min: 1,
  max: 10,
  step: 0.1,
});

const textInput = pane.addBinding(PARAMS, "text");

const letterSpacingInput = pane.addBinding(PARAMS, "letterSpacing", {
  min: 0,
  max: 100,
  step: 0.1,
});

const widthInput = pane.addBinding(PARAMS, "width", {
  min: 100,
  max: 5000,
  step: 10,
});

const alignInput = pane.addBinding(PARAMS, "align", {
  options: { Left: "left", Center: "center", Right: "right" },
});

const colorInput = pane.addBinding(PARAMS, "color", {
  color: { type: "float" },
});
const opacityInput = pane.addBinding(PARAMS, "opacity", {
  min: 0,
  max: 1,
  step: 0.1,
});

const updateMesh = () => {
  textGeo.dispose();
  textGeo = createTextMesh({
    text: `hello`,
    font: fnt,
    scene,
    atlas: png,
    engine,
    color: new BABYLON.Color3(1, 0, 0),
    width: 2500,
    ...PARAMS,
  });

  textGeo.position.x = -textGeo.getBoundingInfo().boundingBox.center.x / 2;
  textGeo.position.y = textGeo.getBoundingInfo().boundingBox.center.y / 2;
};

lineHeightInput.on("change", (e) => {
  updateMesh();
});

textInput.on("change", (e) => {
  updateMesh();
});

widthInput.on("change", (e) => {
  updateMesh();
});

letterSpacingInput.on("change", (e) => {
  updateMesh();
});

alignInput.on("change", (e) => {
  updateMesh();
});

colorInput.on("change", (e) => {
  updateMesh();
});

opacityInput.on("change", (e) => {
  updateMesh();
});
