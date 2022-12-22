const add_input = document.querySelector(".add_input");
const add_btn = document.querySelector(".add_btn");
const listArea = document.querySelector(".list");
const tab = document.querySelector(".tab");
const todoTabs = document.querySelectorAll(".tabState");
const clear_btn = document.querySelector(".clear_btn");
const remainingArea = document.querySelector(".remaining");
let tabStatus = "all";

//待辦清單陣列
let todoList = [
  {
    content: "打掃房間",
    done: true,
    id: 1,
  },
  {
    content: "洗衣服",
    done: false,
    id: 2,
  },
  {
    content: "保養皮鞋",
    done: false,
    id: 3,
  },
];

//初始化畫面
renderTodo(todoList);

function renderTodo(todos) {
  let str = "";
  todos.forEach((item, index) => {
    str += `<li>
        <label for="" class="checkbox">
          <input type="checkbox" data-id="${item.id}" 
          ${item.done ? "checked" : ""}/>
          <span>${item.content}</span>
        </label>
        <button class="delete_btn" data-num="${index}">
          <i class="fa-solid fa-xmark" data-num="${index}"></i>
        </button>
      </li>`;
  });
  listArea.innerHTML = str;
  countUndone();
}

//redner todolist by status
function setTodobyStatus(status) {
  switch (status) {
    case "undone":
      const undoneList = todoList.filter((todo) => todo.done === false);
      renderTodo(undoneList);
      break;

    case "done":
      const doneList = todoList.filter((todo) => todo.done === true);
      renderTodo(doneList);
      break;

    default:
      renderTodo(todoList);
  }
}

//新增待辦事項
add_btn.addEventListener("click", () => {
  if (add_input.value.trim() == "") {
    alert("請先輸入內容");
    return;
  }
  const item = {
    content: add_input.value,
    done: false,
    id: new Date().getTime(),
  };

  todoList.push(item);
  renderTodo(todoList);
  add_input.value = "";
  //新增後回到'全部'頁籤
  todoTabs.forEach((tab) => {
    tab.classList.remove("active");
  });
  todoTabs[0].classList.add("active");
  tabStatus = "all";
});

//更改狀態＆刪除待辦事項
listArea.addEventListener("click", (e) => {
  if (
    e.target.getAttribute("class") !== "delete_btn" &&
    e.target.getAttribute("class") !== "fa-solid fa-xmark"
  ) {
    //把data-id(string)轉型為number
    const selectId = parseInt(e.target.getAttribute("data-id"));
    todoList.forEach((item) => {
      if (item.id !== selectId) {
        return;
      }
      item.done = !item.done;
    });
    setTodobyStatus(tabStatus);
  } else {
    const num = e.target.getAttribute("data-num");
    todoList.splice(num, 1);
    setTodobyStatus(tabStatus);
  }
});

//依照選取頁籤變更當前todolist狀態
tab.addEventListener("click", (e) => {
  if (e.target.nodeName === "UL") {
    return;
  }
  changeTab(e);
});

function changeTab(e) {
  let selectedTab = e.target.dataset.state;
  todoTabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  e.target.classList.add("active");
  tabStatus = selectedTab;
  setTodobyStatus(tabStatus);
}

//計算剩餘未完成事項
function countUndone() {
  const undoneNum = todoList.filter((todo) => {
    return todo.done === false;
  }).length;
  if (undoneNum == 0) {
    remainingArea.textContent = `沒事多喝水`;
    return;
  }
  remainingArea.textContent = `${undoneNum} 個待完成`;
}

//清除已完成事項
clear_btn.addEventListener("click", () => {
  clearDoneItem();
});
function clearDoneItem() {
  todoList = todoList.filter((todo) => {
    return todo.done === false;
  });
  //清除後回到'全部‘頁籤
  todoTabs.forEach((tab) => {
    tab.classList.remove("active");
  });
  todoTabs[0].classList.add("active");
  tabStatus = "all";

  setTodobyStatus(tabStatus);
}
