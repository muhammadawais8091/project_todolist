export enum TaskChoices {
    ViewTasks = 'View Tasks',
    AddTask = 'Add Task',
    MarkComplete = 'Mark Task as Complete',
    DeleteTask = 'Delete Task',
    Quit = 'Quit',
}

export interface Task {
    taskName: string;
    taskStatus: boolean;
}