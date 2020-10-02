const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
//크기를 지정해서 실제 픽셀 사이즈를 지정하지 않으면 선이 정상적으로 그려지지 않는다.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//Canvas 배경 초기화
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  //console.log(x, y);
  if (!painting) {
    //console.log("Creating path in ", x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    //console.log("Creating line in ", x, y);
    ctx.lineTo(x, y);
    //Line을 그린 다음에 stroke를 호출하여 선을 채워줘야한다.
    ctx.stroke();
  }
}

function handleColorClick(event) {
  //console.log(event.target.style);
  const color = event.target.style.backgroundColor;
  //console.log(color);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  //console.log(event.target.value);
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

//마우스 우클릭시 나오는 메뉴 차단
function handleCM(event) {
  //console.log(event);
  event.preventDefault();
}

function handleSaveClick() {
  //Canvas를 이미지 데이터로 변경
  const image = canvas.toDataURL(); // Default is PNG. ("image/jpeg");

  //a태그를 생성하여 데이터를 넣어주고 클릭을 실행 시켜 파일을 다운로드 시킨다.
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[Export]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

//console.log(colors);
//console.log(Array.from(colors)); //Array.from object로부터 Array로 만든다.
//colorors는 class에서 가져오는 배열이라 비어있을수 있어서 if (colors) 체크가 필요없다.
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
