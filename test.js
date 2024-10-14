import { addDays, format, isBefore, parse } from "date-fns";

const tasks = (() => {

    class Task {
        constructor(description, dueDate, priority, completed) {
            this.description = description
            this.dueDate = dueDate
            this.priority = priority
            this.completed = completed
        }
    }

    function updateTaskStatus(task,inputBox) {

        task.completed = inputBox.checked ? true : false

        localStorage.setItem('projects', JSON.stringify(projects.projectsList))
    }

    function removeTask(projectIndex, taskIndex) {

        projects.projectsList[projectIndex].tasks.splice(taskIndex, 1);
        localStorage.setItem('projects', JSON.stringify(projects.projectsList))

    }

    function generateDate(daysToAdd){
        const today = new Date()
        const generatedDate = addDays(today, daysToAdd)
        return format(generatedDate, 'dd-MM-yyyy')
    }

    function evaluateTaskDate(taskDate){
        const today = new Date()
        const oneWeekFromNow = addDays(today, 7)

        
    }

    return {
        Task,
        updateTaskStatus,
        removeTask,
        generateDate,
        evaluateTaskDate
    }
})();

const taskDate = parse('03-10-2024', 'dd-MM-yyyy', new Date())

console.log(taskDate)