import projects from './projects.js'
import tasks from './tasks.js';
import {format} from "date-fns";

const dom = (() => {

    const projectsDiv = document.querySelector('.projects-links')
    const mainTitleText = document.querySelector('.main-title-text')
    const mainTitleDiv = document.querySelector('.main-title')
    const mainContent = document.querySelector('.main')

    const tasksTitle =  document.querySelector('div.tasks-title')

    const modalDiv = document.querySelector('.modal-container')
    const modalDialogTask = document.querySelector('#task-modal-card')

    const modalLegendTask = document.querySelector('.modal-fieldset-task>.modal-legend');
    const modalTitleInputTask = document.querySelector('.modal-fieldset-task>#modal-title');
    const modalDateTask = document.querySelector('#modal-date');
    const modalPriorityTask = document.querySelector('#modal-priority');

    const modalSubmitTask = document.querySelector('#task-form>.modal-submit');
    const modalCloseProject = document.querySelector('.modal-close-project');
    const modalCloseTask = document.querySelector('.modal-close-task');

    let tempProjectIndex = ""
    let tempTaskIndex = ""
    let tempTaskId = ""
    let tempGroup = ""

    let currentOperation = ""
    let origin = ""

    const menuButton = document.querySelector('.menu-btn')
    const sideNav = document.querySelector('.side-nav')

    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('active')
        sideNav.classList.toggle('active')
        mainContent.classList.toggle('inactive')
    })


    // SUBMIT TASK BTN
    modalSubmitTask.addEventListener('click', (event) => {

        event.preventDefault();
        const currentTitleValue = modalTitleInputTask.value
        const currentDateValue = format(modalDateTask.value, 'yyyy-MM-dd')
        const currentPriorityValue = modalPriorityTask.value

        if(origin === "project"){

            if(currentOperation === 'edit'){
                tasks.editTask(tempProjectIndex, tempTaskIndex, currentTitleValue, currentDateValue, currentPriorityValue)
            }
            else if(currentOperation === 'add'){
                tasks.pushTask(tempProjectIndex, currentTitleValue, currentDateValue, currentPriorityValue)
            }
            autoSelect(tempProjectIndex)

        } else if (origin === "group"){

            tasks.editGroupTask(tempTaskId, currentTitleValue, currentDateValue, currentPriorityValue)
            autoSelectGroup(tempGroup)
        }

        modalDiv.classList.remove('modal-active')
        modalDialogTask.close()
    });

    modalCloseTask.addEventListener('click', () => {

        modalDiv.classList.remove('modal-active')
        modalDialogTask.close()
    });

   
    function addEditTask(button, task, projectIndex, taskIndex) {
        button.addEventListener('click', () => {
            
            currentOperation = "edit"
            origin = "project"

            modalLegendTask.innerText = "Edit Task";
            modalTitleInputTask.value = task.description;
            modalDateTask.value = task.dueDate;
            modalPriorityTask.value = task.priority;

            tempProjectIndex = projectIndex
            tempTaskIndex = taskIndex

            modalDiv.classList.add('modal-active')
            modalDialogTask.showModal()
        });
    }


    function addEditGroupTask(button, task, group, taskId) {
        button.addEventListener('click', () => {

            currentOperation = "edit"
            origin = "group"

            modalLegendTask.innerText = "Edit Task";
            modalTitleInputTask.value = task.description;
            modalDateTask.value = format(task.dueDate, 'yyyy-MM-dd');
            modalPriorityTask.value = task.priority;

            tempGroup = group
            tempTaskId = taskId

            modalDiv.classList.add('modal-active')
            modalDialogTask.showModal()
        });
    }

    function addSelect(){
        const allNavLinks = document.querySelectorAll('.nav-link')
        allNavLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                allNavLinks.forEach(link => {
                    link.classList.remove('selected')
                })
                event.currentTarget.classList.add('selected')
                if (['all', 'today', 'upcoming', 'completed'].includes(event.currentTarget.id)){
                    origin = 'group'
                    mainTitleText.innerText = event.currentTarget.id[0].toUpperCase() + event.currentTarget.id.substring(1)
                    renderTasks('group',event.currentTarget)
       
                } else {
                    origin = 'project'    
                    const currentTargetPchild = event.currentTarget.querySelector('p')
                    mainTitleText.innerText = currentTargetPchild.innerText
                    renderTasks('projects',event.currentTarget)
                }
            })
        })
    }

    function adjustTitleIcon(iconType){
        const existingIcon = mainTitleDiv.querySelector('svg');
        if (existingIcon) {
            mainTitleDiv.removeChild(existingIcon);
        }

        let svgElement = null;

        switch (iconType) {
            case 'all':
                svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 3H4a2 2 0 0 0-2 2v2a2 2 0 0 0 1 1.72V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.72A2 2 0 0 0 22 7V5a2 2 0 0 0-2-2zM4 5h16v2H4zm1 14V9h14v10z"></path><path d="M8 11h8v2H8z"></path></svg>`;
                break;
            case 'today':
                svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="m9.981 14.811-.467 2.726 2.449-1.287 2.449 1.287-.468-2.726 1.982-1.932-2.738-.398L11.963 10l-1.225 2.481L8 12.879z"></path><path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm.002 16H5V8h14l.002 12z"></path></svg>`;
                break;
            case 'upcoming':
                svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-3V2h-2v2h-4V2H8v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM5 20V7h14V6l.002 14H5z"></path><path d="M7 10v2h10V9H7z"></path></svg>`;
                break;
            case 'completed':
                svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21 4h-3V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1H3a1 1 0 0 0-1 1v3c0 4.31 1.799 6.91 4.819 7.012A6.001 6.001 0 0 0 11 17.91V20H9v2h6v-2h-2v-2.09a6.01 6.01 0 0 0 4.181-2.898C20.201 14.91 22 12.31 22 8V5a1 1 0 0 0-1-1zM4 8V6h2v6.83C4.216 12.078 4 9.299 4 8zm8 8c-2.206 0-4-1.794-4-4V4h8v8c0 2.206-1.794 4-4 4zm6-3.17V6h2v2c0 1.299-.216 4.078-2 4.83z"></path></svg>`;
                break;
            case 'project':
                svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5zM5 19V5h14l.002 14H5z"></path><path d="M7 7h1.998v2H7zm4 0h6v2h-6zm-4 4h1.998v2H7zm4 0h6v2h-6zm-4 4h1.998v2H7zm4 0h6v2h-6z"></path></svg>`;
                break;
        }

        if (svgElement) {

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = svgElement.trim();
            const svgNode = tempDiv.firstChild;

            mainTitleDiv.insertBefore(svgNode, mainTitleText);
        }       
    }

    function autoSelect(projectIndex){

        origin = 'project'
        let newSelectedNav;

        if(projects.projectsList.length === 0){
            autoSelectGroup('all')
            return

        } else {

            const allNavLinks = document.querySelectorAll('.nav-link')
            allNavLinks.forEach(link => {
                    link.classList.remove('selected')
                })

            const newSelectedIndex = projectIndex 
   
            const newSelectedTitle = projects.projectsList[newSelectedIndex].title
            const editNavTitle = document.querySelector(`.project-card.nav-link[data-project-index="${newSelectedIndex}"]>p`)
            editNavTitle.innerText = newSelectedTitle
        
            newSelectedNav = document.querySelector(`[data-project-index="${newSelectedIndex}"]`)

            newSelectedNav.classList.add('selected')
    
            mainTitleText.innerText = newSelectedTitle
    
            renderTasks('projects', newSelectedNav)
        }
    }

    function autoSelectGroup(groupSelector){

        origin = 'group'
    
        let newSelectedNav = document.querySelector(`#${groupSelector}`)
     
        const allNavLinks = document.querySelectorAll('.nav-link')
        allNavLinks.forEach(link => {
            link.classList.remove('selected')
        })
    
        newSelectedNav.classList.add('selected')
        mainTitleText.innerText = newSelectedNav.innerText
        renderTasks('group',newSelectedNav)

    }
    
    function renderProjects(){
        localStorage.setItem('projects', JSON.stringify(projects.projectsList))

        projectsDiv.innerHTML = ''

        projects.projectsList.forEach((project, i) => {
            const projectCard = document.createElement('div')
            projectCard.classList.add('project-card')
            projectCard.classList.add('nav-link')
            projectCard.setAttribute('data-project-index', i)
            const projectText = document.createElement('p')
            projectText.innerText = project.title

            const { editIcon, deleteIcon } = createIcons('project')

            addDeleteProject(deleteIcon, i)
            addEditProject(editIcon, i)

            const rWrapperDiv = document.createElement('div')
            rWrapperDiv.classList.add('right-wrapper')
            
            rWrapperDiv.append(editIcon, deleteIcon)
            projectCard.append(projectText, rWrapperDiv)

            projectsDiv.appendChild(projectCard)
            
        });
        addSelect()
    }

    function renderTasks(type,selector){

        const sourceType = type

        const tasksDiv = document.querySelector('.tasks-list');
        tasksDiv.innerHTML = '';

        if(sourceType === "projects"){
      
            const projectIndex = selector.getAttribute('data-project-index')
            const selectedProject = projects.projectsList[projectIndex]

            tempProjectIndex = projectIndex
        
            if (!selectedProject) {
                mainTitleText.innerText = '';
                return;
            }

            renderAddButton()
        
            const projectTasks = selectedProject.tasks;

            adjustTitleIcon('project')

            projectTasks.forEach((task, i) => {
                const taskCard = document.createElement('div')
                taskCard.classList.add('task-card')
                taskCard.classList.add(`${task.priority}`)
                taskCard.setAttribute('data-task-index', i)

                const statusBox = document.createElement('input')
                statusBox.classList.add('task-status')
                statusBox.setAttribute('type','checkbox')

                if (task.completed === true) {
                    statusBox.checked = true;
                    taskCard.classList.add('completed')
                }

                statusBox.addEventListener('click', () => {
                    if (statusBox.checked === true) {
                        taskCard.classList.add('completed')
                    }else if(statusBox.checked === false){
                        taskCard.classList.remove('completed')
                    }
                    tasks.updateTaskStatusGroup(task, statusBox)
                })

                const description = document.createElement('div')
                description.innerText = task.description
                description.classList.add('task-text')
                const date = document.createElement('div')
                date.classList.add('date')
                date.innerText = task.dueDate
                
                const { editIcon, deleteIcon } = createIcons('task')

                addDeleteTask(deleteIcon, task, projectIndex, i)
                addEditTask(editIcon, task, projectIndex, i)

                const rWrapperDiv = document.createElement('div')
                rWrapperDiv.classList.add('right-wrapper-task')
                rWrapperDiv.append(date, editIcon, deleteIcon)

                const lWrapperDiv = document.createElement('div')
                lWrapperDiv.classList.add('left-wrapper-task')
                lWrapperDiv.append(statusBox, description)

                taskCard.append(lWrapperDiv, rWrapperDiv)
                tasksDiv.appendChild(taskCard)
            })

        } else if(sourceType === "group"){

            removeAddButton()

            const localArray = JSON.parse(localStorage.getItem(selector.id))

            adjustTitleIcon(selector.id)

            localArray.forEach(task => {
                const taskCard = document.createElement('div')
                taskCard.classList.add('task-card')
                taskCard.classList.add(`${task.priority}`)
                taskCard.setAttribute('data-task-id', task.taskId)

                const statusBox = document.createElement('input')
                statusBox.classList.add('task-status')
                statusBox.setAttribute('type','checkbox')

                if (task.completed === true) {
                    statusBox.checked = true;
                    taskCard.classList.add('completed')
                }

                statusBox.addEventListener('click', () => {
                    if (statusBox.checked === true) {
                        taskCard.classList.add('completed')
                    }else if(statusBox.checked === false){
                        taskCard.classList.remove('completed')
                    }
                    tasks.updateTaskStatusGroup(task, statusBox)
                })

                const description = document.createElement('div')
                description.classList.add('task-text')
                description.innerText = task.description
                const date = document.createElement('div')
                date.classList.add('date')
                date.innerText = task.dueDate
                
                const { editIcon, deleteIcon } = createIcons('task')

                addDeleteGroupTask(deleteIcon, task, selector.id, task.taskId)
                addEditGroupTask(editIcon, task, selector.id, task.taskId)

                const rWrapperDiv = document.createElement('div')
                rWrapperDiv.classList.add('right-wrapper-task')
                rWrapperDiv.append(date, editIcon, deleteIcon)

                const lWrapperDiv = document.createElement('div')
                lWrapperDiv.classList.add('left-wrapper-task')
                lWrapperDiv.append(statusBox, description)

                taskCard.append(lWrapperDiv, rWrapperDiv)
                tasksDiv.appendChild(taskCard)
            })
        }
    }

    function createIcons(element){

        const editIcon = document.createElement('div')
        editIcon.classList.add('edit-icon')
        editIcon.classList.add(element)
        editIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26" viewBox="0 0 26 26" fill="currentColor">
                <path d="M 20.09375 0.25 C 19.5 0.246094 18.917969 0.457031 18.46875 0.90625 L 17.46875 1.9375 L 24.0625 8.5625 L 25.0625 7.53125 C 25.964844 6.628906 25.972656 5.164063 25.0625 4.25 L 21.75 0.9375 C 21.292969 0.480469 20.6875 0.253906 20.09375 0.25 Z M 16.34375 2.84375 L 14.78125 4.34375 L 21.65625 11.21875 L 23.25 9.75 Z M 13.78125 5.4375 L 2.96875 16.15625 C 2.71875 16.285156 2.539063 16.511719 2.46875 16.78125 L 0.15625 24.625 C 0.0507813 24.96875 0.144531 25.347656 0.398438 25.601563 C 0.652344 25.855469 1.03125 25.949219 1.375 25.84375 L 9.21875 23.53125 C 9.582031 23.476563 9.882813 23.222656 10 22.875 L 20.65625 12.3125 L 19.1875 10.84375 L 8.25 21.8125 L 3.84375 23.09375 L 2.90625 22.15625 L 4.25 17.5625 L 15.09375 6.75 Z M 16.15625 7.84375 L 5.1875 18.84375 L 6.78125 19.1875 L 7 20.65625 L 18 9.6875 Z"></path>
            </svg>
        `

        const deleteIcon = document.createElement('div')
        deleteIcon.classList.add('del-icon')
        deleteIcon.classList.add(element)
        deleteIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26" viewBox="0 0 26 26" fill="currentColor">
            <path d="M 11 -0.03125 C 10.164063 -0.03125 9.34375 0.132813 8.75 0.71875 C 8.15625 1.304688 7.96875 2.136719 7.96875 3 L 4 3 C 3.449219 3 3 3.449219 3 4 L 2 4 L 2 6 L 24 6 L 24 4 L 23 4 C 23 3.449219 22.550781 3 22 3 L 18.03125 3 C 18.03125 2.136719 17.84375 1.304688 17.25 0.71875 C 16.65625 0.132813 15.835938 -0.03125 15 -0.03125 Z M 11 2.03125 L 15 2.03125 C 15.546875 2.03125 15.71875 2.160156 15.78125 2.21875 C 15.84375 2.277344 15.96875 2.441406 15.96875 3 L 10.03125 3 C 10.03125 2.441406 10.15625 2.277344 10.21875 2.21875 C 10.28125 2.160156 10.453125 2.03125 11 2.03125 Z M 4 7 L 4 23 C 4 24.652344 5.347656 26 7 26 L 19 26 C 20.652344 26 22 24.652344 22 23 L 22 7 Z M 8 10 L 10 10 L 10 22 L 8 22 Z M 12 10 L 14 10 L 14 22 L 12 22 Z M 16 10 L 18 10 L 18 22 L 16 22 Z"></path>
            </svg>
        `
        return {
            deleteIcon,
            editIcon
        }
    }

    function renderAddButton(){ 
        if(!document.querySelector('.add-icon.task')){
            const addIcon = document.createElement('div')
            addIcon.setAttribute('id','add-task')
            addIcon.classList.add('add-icon')
            addIcon.classList.add('task')

            addIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>        `


            addIcon.addEventListener('click', () => {
        
                currentOperation = 'add'
                origin = 'project'
        
                modalLegendTask.innerText = 'Add Task';
                modalTitleInputTask.value = ''

                modalDateTask.value = format(new Date(), 'yyyy-MM-dd')              

                modalDiv.classList.add('modal-active')
                modalDialogTask.showModal()       
            });

            tasksTitle.appendChild(addIcon)
        }
    }

    function removeAddButton(){
        if(document.querySelector('.add-icon.task')){
            document.querySelector('.add-icon.task').remove()
        }
    }

    function addDeleteProject(button, projIndex){

        button.addEventListener('click', (event) => {

            const projectIndex = projIndex
            const selectedProject = projects.projectsList[projectIndex]

            projects.removeProject(projectIndex)

            event.stopPropagation()
            renderProjects()

            if(origin === 'project'){
                let suggestedIndex;
                if(projects.projectsList.length > 0){
                    suggestedIndex = projects.projectsList.length - 1
                    autoSelect(suggestedIndex)
                } else {
                    autoSelect(0)
                }
            } else if(origin === 'group'){
                const groupId = document.querySelector('.selected').getAttribute('id')
                autoSelectGroup(groupId)
            }
        })
    }

    const modalDialogProject = document.querySelector('#project-modal-card')

    // SUBMIT PROJECT BTN
    const modalSubmitProject = document.querySelector('#project-form>.modal-submit');
    const modalLegendProject = document.querySelector('.modal-fieldset-project>.modal-legend');
    const modalTitleInputProject = document.querySelector('.modal-fieldset-project>#modal-title');

    modalSubmitProject.addEventListener('click', (event) => {

        event.preventDefault();

        if(currentOperation === 'edit'){
            const currentValue = modalTitleInputProject.value
            projects.editProject(tempProjectIndex, currentValue);
            autoSelect(tempProjectIndex)
        }
        else if(currentOperation === 'add'){
            const currentValue = modalTitleInputProject.value
            projects.pushProject(currentValue);
            const newAddedIndex = projects.projectsList.length - 1

            renderProjects()
            autoSelect(newAddedIndex)
            }
        
        modalDiv.classList.remove('modal-active')
        modalDialogProject.close()
    });

    modalCloseProject.addEventListener('click', () => {

        modalDiv.classList.remove('modal-active')
        modalDialogProject.close()
    });

    const addProject = document.querySelector('#add-project');

    addProject.addEventListener('click', () => {

        currentOperation = 'add'

        modalLegendProject.innerText = 'Add Project';
        modalTitleInputProject.value = ''

        modalDiv.classList.add('modal-active')
        modalDialogProject.showModal()
    });

    function addEditProject(button, projIndex) {
        button.addEventListener('click', (event) => {

            currentOperation = "edit"
            origin = "project"

            const projectIndex = projIndex;
            const selectedProject = projects.projectsList[projectIndex];
            tempProjectIndex = projectIndex
         
            modalLegendProject.innerText = "Edit Project";
            modalTitleInputProject.value = selectedProject.title;
    
            event.stopPropagation();
            modalDiv.classList.add('modal-active')
            modalDialogProject.showModal()
        });
    }


    function addDeleteTask(button, task, projectIndex, taskIndex){
        button.addEventListener('click', () => {

            tasks.removeTask(projectIndex, taskIndex)
            autoSelect(projectIndex)
        })
    }

    function addDeleteGroupTask(button, task, group, taskId){
        button.addEventListener('click', () => {

            tasks.removeGroupTask(taskId)
            autoSelectGroup(group)
        })
    }

    function inizializeDom(selector){
        renderProjects()
        autoSelectGroup(selector)
    }

    return {
        renderProjects,
        addSelect,
        addDeleteProject,
        inizializeDom
    }
})();

export default dom