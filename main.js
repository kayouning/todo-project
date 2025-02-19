//유저가 값을 입력
//+누르면 할일을 추가한다
//삭제버튼을 누르면 삭제됨
//체크버튼을 누르면 밑줄이간다
//탭 클릭시 언더바 이동
//전체탭 진행중탭 끝난탭
//끝난 할일은 되돌리기 버튼을 누르면 다시 되돌릴수 있다




let userInput = document.getElementById("user-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let mode = 'all';
let filterList = [];
let underLine = document.getElementById("under-line");


let taskList = [];


userInput.addEventListener("input",function(){
  if(userInput.value.trim()=== ""){
    addButton.disabled = true;
  }else{
   addButton.disabled = false; 
  }
});




addButton.addEventListener("click",addTask)
tabs.forEach(menu=>menu.addEventListener("click",(e)=>indicator(e)))

function indicator(e){
  underLine.style.left = e.currentTarget.offsetLeft + "px";
  underLine.style.width = e.currentTarget.offsetWidth + "px";
  underLine.style.top = e.currentTarget.offsetTop+e.currentTarget.offsetHeight + "px";
}




for(let i=1; i<tabs.length;i++){
  tabs[i].addEventListener("click",function(event){filter(event)})
}
// console.log(tabs)

//keydown -> 한글은 글자가 조합 중인지 조합이 완료된 상태인지 파악하기 어려워 이벤트가 중복 호출됨 
// 한글 입력 중일 때 이벤트 실행 방지하는 event.isComposing메서드 사용
userInput.addEventListener("keydown", function(event){
  if(event.isComposing) return; 
  if(event.key === "Enter") {
    addTask();
    // console.log("엔터키 눌렀다")
  }
  
});


function addTask(){
  if (userInput.value.trim() === "") {
    alert("할 일을 입력해주세요!"); // 경고 메시지 출력
    userInput.placeholder = "할 일을 입력해주세요!"; // 입력창 힌트 변경
    return;
  }


  let task = {
    id:randomIDGenerate(),
    taskContent: userInput.value,
    isComplete: false,
    delete:false
  }
  taskList.push(task);
  console.log(taskList);
  render();
  userInput.value = "";
}

function render(){
  //1. 내가 선택한 탭에 따라서
  let list = []
  if(mode === "all"){
   list = taskList
  }else if(mode === "ongoing" || mode === "done"){
  list = filterList
  }
  //2. 리스트를 달리 보여준다

  let resultHTML = "";
for(let i =0;i<list.length;i++){
if(list[i].isComplete == true){//클릭했을때
  resultHTML += `<div class="task"style="background:rgba(255,255,255,0.06)">
        <div class = "task-done">${list[i].taskContent}</div>
        <div>
          <button onClick="toggleComplete('${list[i].id}') "class="btn btn-dark left-icon">
         <i class="bi bi-arrow-clockwise"></i></button>
          <button onClick="deleteTask('${list[i].id}')" class="btn ">
          <i class="bi bi-trash3"></i></button>
        </div>
      </div>`;
}else{//클릭전
  resultHTML += `<div class="task">
  <div>${list[i].taskContent}</div>
  <div>
    <button onClick="toggleComplete('${list[i].id}')" class="btn left-icon">
    <i class="bi bi-check-lg"></i></button>
    <button onClick="deleteTask('${list[i].id}')" class="btn">
    <i class="bi bi-trash3"></i></button>
  </div>
</div>`;
}
  
}

  document.getElementById("task-board").innerHTML = resultHTML
}//function render


function toggleComplete(id){
  for(let i = 0; i<taskList.length;i++){
    if(taskList[i].id == id){
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList)
}

// function deleteTask(id){
//   for(let i = 0; i<taskList.length;i++){
//     if(taskList[i].id == id){
//       taskList.splice(i,1)
//       break;
//     }
//   }
//   render();
// }



function deleteTask(id) {
  // taskList에서 해당 ID를 가진 아이템 삭제
  taskList = taskList.filter(task => task.id !== id);

  // 현재 mode가 필터링된 목록(진행중 또는 끝남)이라면 filterList도 업데이트
  if (mode !== "all") {
    filterList = filterList.filter(task => task.id !== id);
  }

  render();
}



function filter(event){
  // console.log("filter",event.target.id);
   filterList = []
   mode = event.target.id
  if(mode === "all"){
render()
  }else if(mode === "ongoing"){
    //task.isComplete=false
    for(let i=0;i<taskList.length;i++){
      if(taskList[i].isComplete === false){
        filterList.push(taskList[i]);
      }
    }render();
  }else if(mode === "done"){
    //task.isComplete=true
    for(let i=0;i<taskList.length;i++){
      if(taskList[i].isComplete === true){
        filterList.push(taskList[i]);
      }
    }render();
  }
}



function randomIDGenerate(){
  return Math.random().toString(36).substr(2, 16);;
}
