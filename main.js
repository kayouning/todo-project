//유저가 값을 입력
//+누르면 할일을 추가한다
//삭제버튼을 누르면 삭제됨
//체크버튼을 누르면 밑줄이간다
//탭 클릭시 언더바 이동
//전체탭 진행중탭 끝난탭
//끝난 할일은 되돌리기 버튼을 누르면 다시 되돌릴수 있다


let userInput = document.getElementById("user-input");
let addButton = document.getElementById("add-button");


let taskList = []


addButton.addEventListener("click",addTask)


function addTask(){
  let task = {
    id:randomIDGenerate(),
    taskContent: userInput.value,
    isComplete: false,
    delete:false
  }
  taskList.push(task);
  console.log(taskList);
  render();
}

function render(){
  let resultHTML = "";
for(let i =0;i<taskList.length;i++){
if(taskList[i].isComplete == true){
  resultHTML += `<div class="task">
        <div class = "task-done">${taskList[i].taskContent}</div>
        <div>
          <button onClick="toggleComplete('${taskList[i].id}')">체크</button>
          <button onClick="deleteTask('${taskList[i].id}')">삭제</button>
        </div>
      </div>`;
}else{
  resultHTML += `<div class="task">
  <div>${taskList[i].taskContent}</div>
  <div>
    <button onClick="toggleComplete('${taskList[i].id}')">체크</button>
    <button onClick="deleteTask('${taskList[i].id}')">삭제</button>
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

function deleteTask(id){
  for(let i = 0; i<taskList.length;i++){
    if(taskList[i].id == id){
      taskList.splice(i,1)
      break;
    }
  }
  render();
}


function randomIDGenerate(){
  return Math.random().toString(36).substr(2, 16);;
}
