import './styles.css'
import dom from './dom.js'
import allHandlers from './handlers.js'
import projects from './projects.js'

if(projects.projectsList.length !== 0){
    console.log(projects.projectsList.length)
    dom.renderProjects()
}

allHandlers.listenToClicks()