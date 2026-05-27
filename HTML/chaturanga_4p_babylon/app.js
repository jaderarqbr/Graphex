// ====== CONFIG ======
const BOARD_SIZE = 14; // grid size.
const TILE_SIZE = 1.0;
const PLAYER_COLORS = [
  {name:'Vermelho', hex:'#c0392b', hue:0},
  {name:'Verde', hex:'#16a34a', hue:1},
  {name:'Azul', hex:'#2563eb', hue:2},
  {name:'Amarelo', hex:'#f59e0b', hue:3}
];
const PIECE_TYPES = ['king','general','elephant','horse','chariot','pawn'];

// ====== BABYLON SCENE SETUP ======
const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer:true, stencil:true});
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(0.04,0.06,0.12,1);

// Camera
const camera = new BABYLON.ArcRotateCamera('cam', -Math.PI/2, Math.PI/3.6, 30, new BABYLON.Vector3((BOARD_SIZE/2-0.5)*TILE_SIZE,0, (BOARD_SIZE/2-0.5)*TILE_SIZE), scene);
camera.attachControl(canvas, true);
camera.lowerRadiusLimit = 8;
camera.upperRadiusLimit = 120;

// Light
new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(0.5,1,0.5), scene);
const dir = new BABYLON.DirectionalLight('dir', new BABYLON.Vector3(-0.5,-1,-0.5), scene);
dir.position = new BABYLON.Vector3(20,40,20);

// Ground/platform
const platform = BABYLON.MeshBuilder.CreateGround('plat', {width: BOARD_SIZE*TILE_SIZE + 4, height: BOARD_SIZE*TILE_SIZE + 4}, scene);
const platMat = new BABYLON.StandardMaterial('platMat', scene);
platMat.diffuseColor = new BABYLON.Color3(0.06,0.08,0.12);
platform.material = platMat;
platform.position.y = -0.01;

// Create tile materials for four colors + alt shade
function makeMat(hex, slightlyDarker=false){
  const m = new BABYLON.StandardMaterial('m'+hex+(slightlyDarker?1:0), scene);
  const c = BABYLON.Color3.FromHexString(hex);
  if(slightlyDarker) c.scaleInPlace(0.82);
  m.diffuseColor = c;
  m.specularColor = new BABYLON.Color3(0.03,0.03,0.03);
  return m;
}
const materials = PLAYER_COLORS.map(p => ({base: makeMat(p.hex), alt: makeMat(p.hex,true)}));
const neutralMat = makeMat('#8b8f98',false);

// Board container
const boardParent = new BABYLON.TransformNode('boardRoot', scene);

// Helper: convert grid coords to world
function gridToWorld(i,j){
  return new BABYLON.Vector3(i*TILE_SIZE, 0, j*TILE_SIZE);
}

// Create tiles
const tileMeshes = [];
for(let i=0;i<BOARD_SIZE;i++){
  tileMeshes[i]=[];
  for(let j=0;j<BOARD_SIZE;j++){
    const box = BABYLON.MeshBuilder.CreateBox(`t_${i}_${j}`, {width:TILE_SIZE*0.98, depth:TILE_SIZE*0.98, height:0.2}, scene);
    box.position = gridToWorld(i,j);
    box.position.y = 0;
    box.parent = boardParent;
    const cx = (i - (BOARD_SIZE-1)/2);
    const cz = (j - (BOARD_SIZE-1)/2);
    const angle = Math.atan2(cz, cx);
    let quadrant = 0;
    if(angle >= -Math.PI/4 && angle < Math.PI/4) quadrant = 2;
    else if(angle >= Math.PI/4 && angle < 3*Math.PI/4) quadrant = 1;
    else if(angle >= -3*Math.PI/4 && angle < -Math.PI/4) quadrant = 3;
    else quadrant = 0;
    const alt = ((i+j) % 2 === 0);
    box.material = alt ? materials[quadrant].base : materials[quadrant].alt;
    box.metadata = {i,j,quadrant};
    tileMeshes[i][j] = box;
  }
}

// Piece factory
function createPiece(type, playerIndex){
  const root = new BABYLON.TransformNode(`${type}_${playerIndex}_${Math.random().toString(36).slice(2,7)}`, scene);
  const color = BABYLON.Color3.FromHexString(PLAYER_COLORS[playerIndex].hex);
  const mat = new BABYLON.StandardMaterial('pMat'+playerIndex, scene);
  mat.diffuseColor = color;
  mat.specularColor = new BABYLON.Color3(0.2,0.2,0.2);

  const body = BABYLON.MeshBuilder.CreateCylinder('cyl',{diameter:0.6* TILE_SIZE, height:0.6}, scene);
  body.material = mat;
  body.parent = root;
  body.position.y = 0.35;

  if(type==='king'){
    const sp = BABYLON.MeshBuilder.CreateTorus('tor',{thickness:0.12, diameter:0.6}, scene);
    sp.parent = root; sp.position.y = 0.9; sp.rotation.x = Math.PI/2; sp.material = mat;
  } else if(type==='general'){
    const cone = BABYLON.MeshBuilder.CreateCylinder('cone',{diameterTop:0, diameterBottom:0.5, height:0.8}, scene);
    cone.parent=root; cone.position.y=0.95; cone.material=mat;
  } else if(type==='elephant'){
    const box = BABYLON.MeshBuilder.CreateBox('box',{size:0.5}, scene); box.parent=root; box.position.y=0.9; box.material=mat;
  } else if(type==='horse'){
    const tor = BABYLON.MeshBuilder.CreateTorus('horse',{thickness:0.08, diameter:0.45},scene); tor.parent=root; tor.position.y=0.95; tor.rotation.x = Math.PI/2; tor.material=mat;
  } else if(type==='chariot'){
    const r = BABYLON.MeshBuilder.CreateDisc('disc',{radius:0.28, tessellation:32},scene); r.parent=root; r.position.y=0.9; r.rotation.x=Math.PI/2; r.material=mat;
  } else {
    const s = BABYLON.MeshBuilder.CreateSphere('sph',{diameter:0.45}, scene); s.parent=root; s.position.y=0.9; s.material=mat;
  }
  root.getChildren().forEach(m=> m.isPickable = true);
  root.metadata = {type,playerIndex};
  return root;
}

// Board state
const boardState = Array.from({length:BOARD_SIZE}, ()=> Array(BOARD_SIZE).fill(null));

function placePieceAt(pieceNode, i, j){
  const target = gridToWorld(i,j);
  pieceNode.position = target.clone();
  pieceNode.position.y = 0.1;
  boardState[i][j] = pieceNode;
  pieceNode.metadata.pos = {i,j};
}

// Initial setup
function setupInitialPositions(){
  for(let x=0;x<BOARD_SIZE;x++) for(let y=0;y<BOARD_SIZE;y++){
    const p = boardState[x][y]; if(p){ p.dispose(); boardState[x][y]=null; }
  }
  for(let col=3; col<BOARD_SIZE-3; col++){
    const pawn = createPiece('pawn',1); placePieceAt(pawn, col, BOARD_SIZE-2);
  }
  const k1 = createPiece('king',1); placePieceAt(k1, Math.floor(BOARD_SIZE/2), BOARD_SIZE-1);

  for(let row=3; row<BOARD_SIZE-3; row++){
    const pawn = createPiece('pawn',2); placePieceAt(pawn, BOARD_SIZE-2, row);
  }
  const k2 = createPiece('king',2); placePieceAt(k2, BOARD_SIZE-1, Math.floor(BOARD_SIZE/2));

  for(let col=3; col<BOARD_SIZE-3; col++){
    const pawn = createPiece('pawn',3); placePieceAt(pawn, col, 1);
  }
  const k3 = createPiece('king',3); placePieceAt(k3, Math.floor(BOARD_SIZE/2), 0);

  for(let row=3; row<BOARD_SIZE-3; row++){
    const pawn = createPiece('pawn',0); placePieceAt(pawn, 1, row);
  }
  const k0 = createPiece('king',0); placePieceAt(k0, 0, Math.floor(BOARD_SIZE/2));
}

// Selection and movement
let selectedPiece = null;
scene.onPointerObservable.add((evt)=>{
  if(evt.pickInfo.hit){
    const picked = evt.pickInfo.pickedMesh;
    if(!picked) return;
    if(picked.name && picked.name.startsWith('t_')){
      const md = picked.metadata;
      if(selectedPiece){
        const i = md.i, j = md.j;
        const currentPos = selectedPiece.metadata.pos;
        const dest = boardState[i][j];
        if(dest && dest.metadata && dest.metadata.playerIndex === selectedPiece.metadata.playerIndex){
          addLog('Movimento inválido: ocupaçao própria');
          return;
        }
        boardState[currentPos.i][currentPos.j] = null;
        if(dest){ dest.dispose(); }
        placePieceAt(selectedPiece, i, j);
        selectedPiece.rotation = BABYLON.Vector3.Zero();
        addLog(`${PLAYER_COLORS[selectedPiece.metadata.playerIndex].name} moveu ${selectedPiece.metadata.type} para ${i},${j}`);
        selectedPiece = null;
        updateTurn();
      }
    } else {
      const parent = picked.parent || picked;
      const root = (parent instanceof BABYLON.TransformNode) ? parent : parent.parent;
      if(root && root.metadata && typeof root.metadata.playerIndex !== 'undefined'){
        selectedPiece = root;
        addLog(`Selecionado: ${root.metadata.type} (${PLAYER_COLORS[root.metadata.playerIndex].name})`);
      }
    }
  }
}, BABYLON.PointerEventTypes.POINTERUP);

// Turn management
let currentPlayer = 0;
const movesEl = document.getElementById('moves');
const currentPlayerNameEl = document.getElementById('currentPlayerName');
function updateUI(){ currentPlayerNameEl.textContent = PLAYER_COLORS[currentPlayer].name; }
function addLog(text){
  const d = document.createElement('div'); d.textContent = text; movesEl.appendChild(d); movesEl.scrollTop = movesEl.scrollHeight;
}
function updateTurn(){
  currentPlayer = (currentPlayer + 1) % PLAYER_COLORS.length;
  updateUI();
  rotateBoardToPlayer(currentPlayer);
}

// rotate board to player
function rotateBoardToPlayer(playerIndex){
  const center = new BABYLON.Vector3((BOARD_SIZE/2-0.5)*TILE_SIZE,0,(BOARD_SIZE/2-0.5)*TILE_SIZE);
  let alpha = -Math.PI/2;
  if(playerIndex===0) alpha = Math.PI;
  if(playerIndex===1) alpha = -Math.PI/2;
  if(playerIndex===2) alpha = 0;
  if(playerIndex===3) alpha = Math.PI/2;
  BABYLON.Animation.CreateAndStartAnimation('camrot', camera, 'alpha', 60, 30, camera.alpha, alpha, 0, null);
}

// Controls
document.getElementById('rotateBoard').addEventListener('click', ()=>{ rotateBoardToPlayer((currentPlayer+1)%PLAYER_COLORS.length); currentPlayer = (currentPlayer+1)%PLAYER_COLORS.length; updateUI(); addLog('Vez trocada manualmente.'); });
document.getElementById('resetBtn').addEventListener('click', ()=>{ setupInitialPositions(); addLog('Tabuleiro resetado'); });

// initial
setupInitialPositions(); updateUI(); rotateBoardToPlayer(0);

// Render loop
engine.runRenderLoop(()=> scene.render());
window.addEventListener('resize', ()=> engine.resize());

// developer helpers
window._chess = {scene, engine, boardState, tileMeshes, createPiece, placePieceAt, PLAYER_COLORS, PIECE_TYPES};
