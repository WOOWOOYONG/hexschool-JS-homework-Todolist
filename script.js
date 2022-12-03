const add_input = document.querySelector(".add_input");
const add_btn = document.querySelector(".add_btn");
const list = document.querySelector(".list");
const tab = document.querySelector(".tab");
const tab_all = document.querySelector(".tab>li:first-of-type");
const tab_undone = document.querySelector(".tab>li:nth-of-type(2)");
const tab_done = document.querySelector(".tab>li:last-of-type");
let tabStatus = "all";

//待辦清單陣列
const todoList = [
  {
    content: "打掃房間",
    status: "undone",
    id: 1,
  },
  {
    content: "洗衣服",
    status: "undone",
    id: 2,
  },
];

//初始化畫面
renderTodo(todoList);

function renderTodo(todos) {
  let str = "";
  todos.forEach((item, index) => {
    str += `<li>
        <label for="" class="checkbox">
          <input type="checkbox" />
          <span>${item.content}</span>
        </label>
        <button class="delete_btn" data-num="${index}">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </li>`;
  });
  list.innerHTML = str;
}

//新增待辦事項
add_btn.addEventListener("click", () => {
  if (add_input.value.trim() == "") {
    alert("請先輸入內容");
    return;
  }
  const item = {
    content: add_input.value,
    status: "undone",
    id: new Date().getTime(),
  };

  todoList.push(item);
  renderTodo();
  add_input.value = "";
});

//刪除待辦事項
list.addEventListener("click", (e) => {
  if (
    e.target.getAttribute("class") !== "delete_btn" &&
    e.target.getAttribute("class") !== "fa-solid fa-xmark"
  ) {
    return;
  }
  const num = e.target.getAttribute("data-num");
  todoList.splice(num, 1);
  renderTodo();
});

//tab頁籤更改顯示狀態

tab.addEventListener("click", (e) => {
  changeTab(e);
});

function changeTab(e) {
  if (e.target.getAttribute("data-state") === "all") {
    tab_all.classList.add("active");
    tab_undone.classList.remove("active");
    tab_done.classList.remove("active");
    tabStatus = "all";
  } else if (e.target.getAttribute("data-state") === "undone") {
    tab_undone.classList.add("active");
    tab_done.classList.remove("active");
    tab_all.classList.remove("active");
    tabStatus = "undone";
  } else if (e.target.getAttribute("data-state") === "done") {
    tab_done.classList.add("active");
    tab_undone.classList.remove("active");
    tab_all.classList.remove("active");
    tabStatus = "done";
  }
  statusHandler(tabStatus);
}

//redner todolist by status
function statusHandler(status) {
  switch (status) {
    case "undone":
      const undoneList = todoList.filter((todo) => todo.status === "undone");
      renderTodo(undoneList);
      break;

    case "done":
      const doneList = todoList.filter((todo) => todo.status === "done");
      renderTodo(doneList);
      break;

    default:
      renderTodo(todoList);
  }
}
