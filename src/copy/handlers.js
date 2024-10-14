import dom from './dom.js'

const allHandlers = (() => {

    function listenToClicks(){
        const allNavLinks = document.querySelectorAll('.nav-link')
        const allDelbuttons = document.querySelectorAll('.del-icon')

        dom.select(allNavLinks)
        dom.deleteElement(allDelbuttons)
    }

    return {
        listenToClicks
    }
})();

export default allHandlers