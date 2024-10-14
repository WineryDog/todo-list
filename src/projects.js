import tasks from "./tasks";

const projects = (() => {

    let projectsList = []
    if(localStorage.getItem('projects') === null) {
        projectsList = [
            {
                title: 'Awesome Project 1',
                tasks: [
                    {
                        description: 'Having fun',
                        dueDate: tasks.generateDate(0),
                        priority: 'low',
                        taskId: 0,
                        completed: false
                    },
                    {
                        description: 'Go to the gym',
                        dueDate: tasks.generateDate(3),
                        priority: 'high',
                        taskId: 1,
                        completed: true
                    },
                ]
            },
            {
                title: 'Awesome Project 2',
                tasks: [
                    {
                        description: 'Do some gardening',
                        dueDate: tasks.generateDate(4),
                        priority: 'medium',
                        taskId: 2,
                        completed: false
                    }
                ]
            },
            {
                title: 'Awesome Project 3',
                tasks: [
                    {
                        description: 'Swim',
                        dueDate: tasks.generateDate(6),
                        priority: 'medium',
                        taskId: 3,
                        completed: false
                    }
                ]
            },
        ]
        groupTasks()

    } else {
        const parseFromLstorage = JSON.parse(localStorage.getItem('projects'))
        projectsList = parseFromLstorage
        groupTasks()
    }

    function groupTasks() {
        const taskGroups = {
            allTasks: [],
            todayTasks: [],
            upcomingTasks: [],
            completedTasks: []
        };

        projectsList.forEach(project => {
            project.tasks.forEach(task => {


                taskGroups.allTasks.push(task);

                if (task.completed === true) {
                    taskGroups.completedTasks.push(task);
                }

                const result = tasks.evaluateTaskDate(task.dueDate)

                if (result === 'today') {
                    taskGroups.todayTasks.push(task);
                } else if (result === 'week')
                    taskGroups.upcomingTasks.push(task);
            });
        });

        localStorage.setItem('all', JSON.stringify(taskGroups.allTasks));
        localStorage.setItem('today', JSON.stringify(taskGroups.todayTasks));
        localStorage.setItem('upcoming', JSON.stringify(taskGroups.upcomingTasks));
        localStorage.setItem('completed', JSON.stringify(taskGroups.completedTasks));
    }

    localStorage.setItem('projects', JSON.stringify(projectsList));

    class Project {
        constructor(title) {
            this.title = title
            this.tasks = []
        }
    }

    function pushProject(title){

        const project = new Project(title)
        projectsList.push(project)
        localStorage.setItem('projects', JSON.stringify(projectsList));
        groupTasks()
    }

    function removeProject(index) {
        if (index > -1) {
          console.log('Removing project index ' + index)
          projectsList.splice(index, 1);
          localStorage.setItem('projects', JSON.stringify(projectsList));
          groupTasks()
        }
    }

    function editProject(index, value){
        console.log('Renaming project with index ' + index + ' as ' + value)
        projectsList[index].title = value
        console.log(projectsList[index].title)

        localStorage.setItem('projects', JSON.stringify(projectsList));

        console.log(projectsList[index].title);

        groupTasks();
    }

    return {
        projectsList,
        pushProject,
        removeProject,
        editProject,
        groupTasks
    }

})();

export default projects