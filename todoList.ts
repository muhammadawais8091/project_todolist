import inquirer from 'inquirer';
import { Task, TaskChoices } from './interfaceTypes.js';



let taskList: Task[] = [];

const displayTasks = (): void => {
    if (taskList.length === 0) {
        console.log('No tasks found.');
    } else {
        taskList.forEach((task, index) => {
            const status = task.taskStatus ? '[x]' : '[ ]';
            console.log(`${index + 1}. ${status} ${task.taskName}`);
        });
    }
};

const addTask = (name: string): void => {
    taskList.push({ taskName: name, taskStatus: false });
};

const markTaskComplete = (index: number): void => {
    if (index >= 0 && index < taskList.length) {
        taskList[index].taskStatus = true;
    } else {
        console.log('Invalid task number.');
    }
};

const deleteTask = (index: number): void => {
    if (index >= 0 && index < taskList.length) {
        taskList.splice(index, 1);
    } else {
        console.log('Invalid task number.');
    }
};

const main = async (): Promise<void> => {
    const answers = await inquirer.prompt<{ action: TaskChoices }>({
        type: 'list',
        name: 'action',
        message: 'Choose an action:',
        choices: Object.values(TaskChoices),
    });

    switch (answers.action) {
        case TaskChoices.ViewTasks:
            displayTasks();
            break;
        case TaskChoices.AddTask:
            const taskName = (await inquirer.prompt<{ name: string }>({
                type: 'input',
                name: 'name',
                message: 'Enter task:'
            })).name;
            addTask(taskName);
            break;
        case TaskChoices.MarkComplete:
            const taskIndex = (await inquirer.prompt<{ index: number }>({
                type: 'input',
                name: 'index',
                message: 'Enter task number to mark as complete:',
                validate: input => !isNaN(input) && Number(input) > 0 && Number(input) <= taskList.length || 'Please enter a valid task number'
            })).index - 1;
            markTaskComplete(taskIndex);
            break;
        case TaskChoices.DeleteTask:
            const deleteIndex = (await inquirer.prompt<{ index: number }>({
                type: 'input',
                name: 'index',
                message: 'Enter task number to delete:',
                validate: input => !isNaN(input) && Number(input) > 0 && Number(input) <= taskList.length || 'Please enter a valid task number'
            })).index - 1;
            deleteTask(deleteIndex);
            break;
        case TaskChoices.Quit:
            return;
    }

    await main(); 
};

main();
