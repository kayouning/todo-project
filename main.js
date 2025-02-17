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
  let userContent = userInput.value
  taskList.push(userContent);
  console.log(taskList);
  render();
}

function render(){
  let resultHTML = "";
for(let i =0;i<taskList.length;i++){
  resultHTML += `<div class="task">
        <div>${taskList[i]}</div>
        <div>
          <button id="check-button">체크</button>
          <button id="delete-button">삭제</button>
        </div>
      </div>`;
}


  document.getElementById("task-board").innerHTML = resultHTML
}
