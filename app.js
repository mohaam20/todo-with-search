const todoinput = document.querySelector(".todo-input");
const todobutton = document.querySelector(".todo-button");
const todolist = document.querySelector(".todo-list");
const allertms = document.querySelector(".alert");
const droped = document.querySelector("select");
const allField = document.querySelector("input");
const lense = document.querySelector("label");
const searchArea = document.querySelector("#search-bar");
const clearBtn = document.querySelector(".clear-all");
const activee = document.activeElement;
const main = document.querySelector(".container");
const regs = document.querySelector(".regCont");
const loginBtn = document.querySelector(".reg");
// const sentReg = document.querySelector(".subUser");

loginBtn.addEventListener("pointerup", () => {
  if (loginBtn.innerHTML.includes(`fa-x`)) {
    loginBtn.innerHTML = `<h1 class="login">login</h1>
    <br />
    <h2>_</h2>
    <h1 class="signup">signup</h1>`;
  } else {
    loginBtn.innerHTML = `<h1><i class="fa-solid fa-x"></i></h1>`;
  }
  regs.classList.toggle("hidden");
  main.classList.toggle("hidden");
});

const kid = todobutton.parentNode;

window.addEventListener("DOMContentLoaded", readLocal);
clearBtn.addEventListener("click", clearTodo);
searchArea.addEventListener("input", startSearch);
todobutton.addEventListener("click", addTodo);
todolist.addEventListener("click", women, true);
droped.addEventListener("change", filtter);
window.addEventListener("click", filtter);
allField.addEventListener("keyup", enterSubmit);
document.addEventListener("click", unFoucs);

function women(event) {
  event.preventDefault();
  let btnnn = event.target;
  let panel = btnnn.closest("li");
  if (btnnn.nodeName == "BUTTON") {
    console.log("update me");
  }

  if (btnnn.className == "checkLogo" && panel.className == "solid") {
    console.log("arrived");
    panel.classList.remove("solid");
    panel.classList.add("glass");
    // dellLocal(panel.innerText);
    moveDone(panel.innerText.toLowerCase());
    closeField(panel);
    lower(panel);
  } else if (panel.nodeName == "LI" && panel.className == "glass") {
    panel.classList.remove("glass");
    panel.classList.add("solid");
    saveLocal(panel.innerText);
    delDone(panel.innerText.toLowerCase());
    closeField(panel);
    comeBack(panel);
  } else if (btnnn.className === "dellLogo") {
    dellLocal(panel.innerText);
    function bob(gestt) {
      gestt.remove();
    }
    panel.classList.add("falll");
    panel.style.position = "absolute";
    setTimeout(bob, 1000, panel);
  } else if (btnnn.className == "checkLogo" && panel.className == "glass") {
    panel.classList.remove("glass");
    panel.classList.add("solid");
    console.log("through");
    saveLocal(panel.innerText);
    closeField(panel);
  } else if (btnnn.className == "editor") {
    editTask(panel);
    console.log(btnnn.innerHTML);
    if (btnnn.innerHTML == '<i class="fa-solid fa-pen"></i>') {
      btnnn.innerHTML = '<i class="fas fa-archive"></i>';
    } else {
      btnnn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    }
  }
}

function mate(frshed) {
  frshed.style.backgroundColor = "rgb(71, 181, 255)";
}

function addTodo(event) {
  event.preventDefault();
  const tsContainer = document.createElement("li");
  const task = document.createElement("p");
  const check = document.createElement("button");
  const field = todoinput.value;
  const edit = document.createElement("button");
  const editField = document.createElement("input");
  const kids = kid.children.length;
  const dell = document.createElement("button");
  setTimeout(mate, 200, tsContainer);

  if (field !== "") {
    task.innerHTML = field;
    editField.value = field;
    editField.style.position = "absolute";
    check.innerHTML = '<i class="fa-solid fa-check"></i>';
    dell.innerHTML = '<i class="fa-solid fa-trash"></i>';
    edit.innerHTML = '<i class="fa-solid fa-pen"></i>';
    check.classList.add("checkLogo");
    dell.classList.add("dellLogo");
    edit.classList.add("editor");
    editField.classList.add("edit-field");
    tsContainer.append(editField);
    editField.style.display = "none";
    tsContainer.classList.add("solid");
    tsContainer.appendChild(task);
    saveLocal(field);
    tsContainer.append(edit);
    tsContainer.append(dell);
    tsContainer.append(check);
    todolist.appendChild(tsContainer);
    filtter();

    if (kids >= 3) {
      allertms.style.left = "50%";
    }
  } else {
    allertms.style.left = "98%";
  }
  todoinput.value = "";
}

function sleep() {}

function saveLocal(todo) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  console.log(todos);
  todos.push(todo.toLowerCase());

  localStorage.setItem("todos", JSON.stringify(todos));
}

function readLocal() {
  let sleeping = JSON.parse(localStorage.getItem("todos"));
  let half = JSON.parse(localStorage.getItem("checked"));
  // console.log(sleeping[1]);
  sleeping.forEach((recd) => {
    readKid(recd, "solid");
  });
  half.forEach((recd) => {
    readKid(recd, "glass");
  });

  function readKid(elong, state) {
    const tsContainer = document.createElement("li");
    const task = document.createElement("p");
    const check = document.createElement("button");
    const field = elong;
    const edit = document.createElement("button");
    const editField = document.createElement("input");
    const dell = document.createElement("button");

    setTimeout(mate, 200, tsContainer);
    editField.value = field;
    editField.style.position = "absolute";
    task.innerHTML = field;
    check.innerHTML = '<i class="fa-solid fa-check"></i>';
    dell.innerHTML = '<i class="fa-solid fa-trash"></i>';
    edit.innerHTML = '<i class="fa-solid fa-pen"></i>';

    check.classList.add("checkLogo");
    edit.classList.add("editor");
    editField.classList.add("edit-field");
    tsContainer.append(editField);
    editField.style.display = "none";
    dell.classList.add("dellLogo");
    tsContainer.classList.add(state);
    tsContainer.appendChild(task);
    tsContainer.append(edit);
    tsContainer.append(dell);
    tsContainer.append(check);
    todolist.appendChild(tsContainer);
  }
}

function dellLocal(todo) {
  let todo1 = JSON.parse(localStorage.getItem("todos"));
  let spot = todo1.indexOf(todo);
  console.log("place is " + spot);
  todo1.splice(spot, 1);
  localStorage.setItem("todos", JSON.stringify(todo1));
}

function filtter() {
  let due = droped.value;
  let kido = todolist.children;

  for (let kid of kido) {
    // console.log(due);
    // console.log(kid.className);
    // console.log(due == kid.className);

    if (due == kid.className) {
      console.log("glasoo");
      kid.style.display = "flex";
    } else {
      kid.style.display = "none";
    }
    if (due == "all") {
      kid.style.display = "flex";
    }
  }
}

function editTask(father) {
  console.log("should edit");
  let tod = JSON.parse(localStorage.getItem("todos"));
  let nest;
  let old;
  let newTask;
  for (let x of father.children) {
    if (x.nodeName == "P") {
      old = x.innerText.toLowerCase();
      nest = tod.indexOf(old);
      console.log(nest);

      newTask = x;
      console.log(old);
    }
  }
  for (let x of father.children) {
    if (x.nodeName == "INPUT" && x.style.display == "none") {
      x.value = old;
      x.style.display = "flex";
      x.focus();
      console.log("hiphop");
      x.addEventListener("keyup", enterSubmit);
    } else if (x.nodeName == "INPUT" && x.style.display !== "none") {
      newTask.innerText = x.value;
      tod.splice(nest, 1, x.value);

      if (x.value == "") {
        father.remove();
      } else {
        localStorage.setItem("todos", JSON.stringify(tod));
      }
      x.style.display = "none";
    }
  }
}

function closeField(father) {
  for (let x of father.children) {
    if (x.nodeName == "INPUT" && x.style.display !== "none") {
      x.style.display = "none";
      if (x.value == "") {
        father.remove();
      }
    }
    if (x.className == "editor") {
      x.innerHTML = '<i class="fa-solid fa-pen"></i>';
    }
  }
}

function enterSubmit(event) {
  let relatives = event.composedPath();

  if (event.key == "Enter") {
    for (let i of relatives) {
      if (i.nodeName == "LI") {
        let i2 = i.children;
        for (let i3 of i2) {
          if (i3.className == "editor") {
            i3.click();
          }
        }
      }
    }
  }
}

function unFoucs(event) {
  let opend = document.querySelectorAll(".edit-field");
  let boxes = document.querySelectorAll(".editor");
  if (
    event.target.nodeName == "BODY" ||
    event.target.nodeName == "UL" ||
    event.target.nodeName == "LI"
  ) {
    console.log(event.target.nodeName);
    for (let t of boxes) {
      t.innerHTML = '<i class="fa-solid fa-pen"></i>';
    }
  }
  if (
    event.target.className !== "edit-field" &&
    event.target.className !== "editor"
  ) {
    for (let i of opend) {
      i.style.display = "none";
    }
  }
}

function lower(tail) {
  let panelG = document.querySelector("ul");
  let place = tail;
  tail.remove();
  panelG.append(place);
  console.log(panelG);
  console.log(tail);
}

function comeBack(taill) {
  let panelG = document.querySelector("ul");
  let placee = taill;
  taill.remove();
  panelG.insertBefore(placee, panelG.children[0]);
}

function startSearch(e) {
  let piss = e.target.value.toLowerCase().trim();
  console.log(piss);
  let fiss = document.querySelectorAll("p");
  fiss.forEach((user) => {
    if (user.className !== "alert" && piss.length !== 0) {
      user.parentNode.style.position = "absolute";
      user.parentNode.style.bottom = "200%";
      user.parentNode.style.zIndex = "-1";
      user.parentNode.style.opacity = "0";
    }
    if (
      user.innerText.toLowerCase().trim().includes(piss) &&
      piss.length !== 0 &&
      user.className !== "alert"
    ) {
      user.parentNode.style.position = null;
      user.parentNode.style.top = null;
      user.parentNode.style.zIndex = null;
      user.parentNode.style.opacity = null;
    }
    if (piss.length == 0) {
      user.parentNode.style.position = null;
      user.parentNode.style.top = null;
      user.parentNode.style.zIndex = null;
      user.parentNode.style.opacity = null;
    }
  });
}

function clearTodo() {
  let currentList = todolist.children;
  console.log(currentList);
  console.log(Array.from(currentList));
  localStorage.setItem("todos", JSON.stringify([]));
  Array.from(currentList).forEach((li) => {
    li.remove();
    dellLocal(li.innerText);
  });
}

function delDone(todo) {
  console.log(todo);
  let todo1 = JSON.parse(localStorage.getItem("checked")) || [];
  let spot = todo1.indexOf(todo);
  console.log("place is " + spot);
  todo1.splice(spot, 1);
  localStorage.setItem("checked", JSON.stringify(todo1));
}

function moveDone(todo) {
  let todo1 = JSON.parse(localStorage.getItem("todos"));
  let dones = JSON.parse(localStorage.getItem("checked")) || [];
  let spot = todo1.indexOf(todo);
  dones.push(todo);
  localStorage.setItem("checked", JSON.stringify(dones));
  console.log("place is " + spot);
  todo1.splice(spot, 1);
  localStorage.setItem("todos", JSON.stringify(todo1));
}
