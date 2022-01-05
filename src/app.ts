enum STATUS {
    Pending,
    Finished
}

type dataType = string;

interface Validation {
    text: dataType,
    min?: number;
}

function validate( item: Validation ){
    let isValid = true;
    if( item.min && item.text.length < item.min){
        isValid = false;
    }
    return isValid;
}

class ItemStructure {
    constructor( 
        public id: dataType,
        public input: dataType,
        public status: STATUS
    ) {}
}

class AppState {
    protected todos: ItemStructure[];
    private static instance: AppState;

    protected constructor(){
        this.todos = [];
    }

    static getInstance() {
        if(this.instance){
            return this.instance;
        }
        this.instance = new AppState();
        return this.instance;
    }

    protected getTodoList() {
        new TodoList(this.todos, 'Pending');
        new TodoList(this.todos, 'Finished');
    }

    addItem(
        id:string,
        input: string,
        status: STATUS
    ) {
        const todoItem = new ItemStructure(id, input, status);
        this.todos.push(todoItem);
        this.getTodoList();
    }

    set Todos(todoItems: ItemStructure[]) {
        this.todos = [...todoItems];
        this.getTodoList();
    }

    get Todos(){
        return this.todos;
    }

}

const appState = AppState.getInstance();

// Implementações de UI

class TodoItem {
    tempElement: HTMLTemplateElement;
    ulElement: HTMLUListElement;
    liElement: HTMLLIElement;
    constructor(
      private id: string,
      private input: string,
      private todoItems: ItemStructure[] 
    ) {
      this.tempElement = document.querySelector('template')!;
      this.ulElement = document.querySelector('ul')! as HTMLUListElement;
  
      const importedHtml = document.importNode(this.tempElement.content, true);
      this.liElement = importedHtml.firstElementChild as HTMLLIElement;
      this.attach();
      this.display();
      this.deleteTodo();
      this.editTodo();
    }
  
    private attach() {
      console.log(this.todoItems, this.liElement, this.ulElement);
      this.ulElement.insertAdjacentElement('afterbegin', this.liElement)!;
    }
  
    private display() {
      this.ulElement.querySelector('h2')!.textContent = this.input;
      this.ulElement.querySelector('.del')!.id = this.id;
      this.ulElement.querySelector('.edit')!.id = this.id;
    }
    
    private deleteItem(id: string, todoItems: ItemStructure[]) {
      const removedTodo = todoItems.filter((todo) => todo.id !== id);
      appState.Todos = removedTodo;
    }
  
    private deleteHandler() {
      if (document.querySelector('input')!.value) {
        alert('Todo already selected');
        return;
      }
      const id = this.id.toString();
      const todoItems = [...appState.Todos];
      this.deleteItem(id, todoItems);
    }
  
    private editHandler() {
      if (document.querySelector('input')!.value) {
        alert('Todo already selected');
        return;
      }
      const id = this.id.toString();
      const todoItems = [...appState.Todos];
      const getText = todoItems.find((todo) => todo.id === id)!;
      document.querySelector('input')!.value = getText.input;
      this.deleteItem(id, todoItems);
    }
  
    private deleteTodo() {
      this.liElement
        .querySelector('.del')!
        .addEventListener('click', this.deleteHandler.bind(this));
    }
  
    private editTodo() {
      this.liElement
        .querySelector('.edit')!
        .addEventListener('click', this.editHandler.bind(this));
    }
  }
  
  class TodoList {
    constructor(
      private todoItems: ItemStructure[],
      private type: 'Pending' | 'Finished',
    ) {
      this.display();
      console.log(this.type);
    }
  
    private display() {
  
        document.querySelector('ul')!.innerText = '';
  
      for (let todo of this.todoItems) {
        new TodoItem(todo.id, todo.input, this.todoItems);
      }
    }
  
  }
  
  class TodoInput {
    todoInput: HTMLInputElement;
    submitButton: HTMLButtonElement;
    constructor() {
      this.todoInput = document.querySelector('input')! as HTMLInputElement;
      this.submitButton = document.querySelector(
        '.addTodo'
      )! as HTMLButtonElement;
      this.submit();
    }
  
    private validation(value: string): string | undefined {
      const checkInput = validate({
        text: value,
        min: 3,
      });
      if (!checkInput) {
        alert('Invalid input');
        return;
      }
      return value;
    }
  
    private clearFormInput() {
      this.todoInput.value = '';
    }
  
    private submitHandler(e: Event) {
      e.preventDefault();
      console.log('event');
      const getTodoValue = this.todoInput.value;
      const ValidatedText = this.validation(getTodoValue);
      if (ValidatedText) {
        const id = Math.random().toString();
        appState.addItem(id, ValidatedText, STATUS.Pending);
        this.clearFormInput();
      } else {
        this.clearFormInput();
      }
    }
    private submit() {
      console.log(this.submitButton, this.todoInput);
      this.submitButton.addEventListener('click', this.submitHandler.bind(this));
    }
  }
  
  const todo = new TodoInput();