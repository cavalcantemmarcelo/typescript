type Task = {
    title: string;
    status: Number;
    description: string;
    priority: boolean;
}

const task1: Readonly<Task> = {
    title: 'desenvolvimento do front-end',
    status: 1,
    description: 'desenvolver tela para cadastro de usuários',
    priority: false
}

console.log(`titulo: ${task1.title}`)

// task1.priority = true

console.log(`prioridade: ${task1.priority}`)