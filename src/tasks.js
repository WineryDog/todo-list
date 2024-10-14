import projects from "./projects";
import { addDays, format, isBefore, isEqual, startOfDay, parse } from "date-fns";

const tasks = (() => {

    class Task {
        constructor(description, dueDate, priority, taskId, completed) {
            this.description = description
            this.dueDate = dueDate
            this.priority = priority
            this.taskId = taskId
            this.completed = completed
        }
    }

    function updateTaskStatus(task,inputBox) {

        task.completed = inputBox.checked ? true : false

        localStorage.setItem('projects', JSON.stringify(projects.projectsList))
        projects.groupTasks()
    }

    function updateTaskStatusGroup(task,inputBox) {

        const idToFind = task.taskId
        const newStatus = inputBox.checked ? true : false

        projects.projectsList.forEach(project => {

            project.tasks.forEach(iterTask => {
                if (iterTask .taskId === idToFind ) {
                    iterTask .completed = newStatus
                    console.log(`taskId ${idToFind} updated: completed = ${newStatus}`);
                }
            });
        });

        localStorage.setItem('projects', JSON.stringify(projects.projectsList))
        projects.groupTasks()
    }

    function removeTask(projectIndex, taskIndex) {

        projects.projectsList[projectIndex].tasks.splice(taskIndex, 1);
        localStorage.setItem('projects', JSON.stringify(projects.projectsList))
        projects.groupTasks()

    }

    function editTask(projectIndex, taskIndex, title, date, priority) {
        projects.projectsList[projectIndex].tasks[taskIndex].description = title
        projects.projectsList[projectIndex].tasks[taskIndex].dueDate = date
        projects.projectsList[projectIndex].tasks[taskIndex].priority = priority

        localStorage.setItem('projects', JSON.stringify(projects.projectsList))
        projects.groupTasks()
    }

    function pushTask(projectIndex, title, date, priority) {

        const allInStorage = JSON.parse(localStorage.getItem('all'));

        if (Array.isArray(allInStorage) && allInStorage.length > 0) {
            const maxTask = allInStorage.reduce((max, item) => {
                return item.taskId > max.taskId ? item : max;
            });
        
            const newTaskId = maxTask.taskId + 1
            const newTask = new Task(title, date, priority, newTaskId, false)

            projects.projectsList[projectIndex].tasks.push(newTask)
    
            localStorage.setItem('projects', JSON.stringify(projects.projectsList))
            projects.groupTasks()

        } else {
            console.error('all is empty or not found in localStorage');
        }
    }

    function removeGroupTask(taskId) {

        projects.projectsList.forEach(project => {
            project.tasks = project.tasks.filter(task => task.taskId !== taskId);
        });

        localStorage.setItem('projects', JSON.stringify(projects.projectsList))
        projects.groupTasks()

    }

    function editGroupTask(taskId, title, date, priority) {

        projects.projectsList.forEach(project => {
            project.tasks.forEach(task => {
                if (task.taskId === taskId){
                    task.description = title
                    task.dueDate = date
                    task.priority = priority
                }
            })
        })

        localStorage.setItem('projects', JSON.stringify(projects.projectsList))
        projects.groupTasks()
    }

    function generateDate(daysToAdd){
        const today = new Date()
        const generatedDate = addDays(today, daysToAdd)
        return format(generatedDate, 'yyyy-MM-dd')
    }

    function evaluateTaskDate(taskDate){
        const today = startOfDay(new Date());
        const oneWeekFromNow = addDays(today, 7);
    
        const parsedTaskDate = startOfDay(parse(taskDate, 'yyyy-MM-dd', new Date()));
    
        let result = "";
        if (isBefore(parsedTaskDate, today)){
            result = "past";
        } else if (isEqual(parsedTaskDate, today)){
            result = "today";
        } else if (isBefore(parsedTaskDate, oneWeekFromNow)){
            result = "week";
        }
        return result;
    }

    return {
        Task,
        updateTaskStatus,
        removeTask,
        generateDate,
        evaluateTaskDate,
        removeGroupTask,
        updateTaskStatusGroup,
        editTask,
        editGroupTask,
        pushTask
    }
})();

export default tasks