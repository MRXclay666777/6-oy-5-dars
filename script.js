document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("todo-input");
    const addButton = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");

    function saveTodos() {
        const todos = [];
        document.querySelectorAll("#todo-list li").forEach((li) => {
            todos.push({
                text: li.querySelector("span").textContent,
                completed: li.classList.contains("completed"),
            });
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function loadTodos() {
        const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        savedTodos.forEach(({ text, completed }) => addTodo(text, completed));
    }

    function addTodo(text, completed = false) {
        if (!text.trim()) return;

        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        checkbox.checked = completed;
        checkbox.addEventListener("change", () => {
            li.classList.toggle("completed", checkbox.checked);
            saveTodos();
        });

        const span = document.createElement("span");
        span.textContent = text;
        if (completed) li.classList.add("completed");

        const editButton = document.createElement("button");
        editButton.textContent = "✏️";
        editButton.classList.add("edit-btn");
        editButton.addEventListener("click", () => {
            const newText = prompt("Edit your task:", span.textContent);
            if (newText !== null) {
                span.textContent = newText;
                saveTodos();
            }
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", () => {
            li.remove();
            saveTodos();
        });

        const actions = document.createElement("div");
        actions.classList.add("actions");
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(actions);

        todoList.appendChild(li);
        saveTodos();
    }

    addButton.addEventListener("click", () => {
        addTodo(input.value);
        input.value = "";
    });

    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTodo(input.value);
            input.value = "";
        }
    });

    loadTodos();
});

