const projects = (() => {

    let projectsList = []
    if(localStorage.getItem('projects') === null) {
        projectsList = [
            {
                title: 'Awesome Project 1',
                tasks: [
                    {
                        description: 'Having fun',
                        dueDate: '31-09-2024',
                        priority: 'low',
                        // projectIndex: 0,
                        completed: false
                    },
                    {
                        description: 'Go to the gym',
                        dueDate: '4-10-2024',
                        priority: 'high',

                        completed: true
                    },
                ]
            },
            {
                title: 'Awesome Project 2',
                tasks: [
                    {
                        description: 'Do some gardening',
                        dueDate: '28-09-2024',
                        priority: 'lmedium',

                        completed: false
                    }
                ]
            },
        ]
    } else {
        const parseFromLstorage = JSON.parse(localStorage.getItem('projects'))
        projectsList = parseFromLstorage
    }

    class Project {
        constructor(title) {
            this.title = title
            this.tasks = []
        }
    }

    function pushProject(title){
        const project = new Project(title)
        projectsList.push(project)
    }

    function removeProject(index) {
        if (index > -1) {
          projectsList.splice(index, 1);
          localStorage.setItem('projects', JSON.stringify(projects.projectsList))
        }
      }

    return {
        projectsList,
        pushProject,
        removeProject
    }

})();

export default projects