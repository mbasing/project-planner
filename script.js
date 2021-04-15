const activeProjects = document.getElementById('active-projects').querySelector('ul');
const finishedProjects = document.getElementById('finished-projects').querySelector('ul');

const activeProjectsArray = [];
const finishedProjectsArray = [];
const moreInfoArray = [];

function removeDiv(){
    document.querySelector('#div').remove();
}

const moreInfoObject = {
    do() {
        if(document.querySelectorAll('#div').length > 0){
            removeDiv();
        }
        this.moreInformation.innerHTML = `
            <p>${this.project.info}</p>
            <button>close</button>
        `
        this.moreInformation.setAttribute('id', 'div');
        this.moreInformation.classList = 'card';
        document.body.append(this.moreInformation);
        this.moreInformation.querySelector('button').addEventListener('click', removeDiv);
    }
}

function moreInfo() {
    moreInfoObject.moreInformation = document.createElement('div');
    findList(this.id, moreInfoArray, undefined, moreInfoObject);
}

function changeProperites(project){
    const pomocna = project.from;
    project.from = project.to;
    project.to = pomocna;
}

function changeTextInTheButton(btn, text){
    btn.innerHTML = text;
}

const switchList = {
    do(){  
        this.project.to.append(this.project.from.children[this.i]);
        changeProperites(this.project);
        this.array2.push(this.project);
        this.array.splice(this.i, 1);
    }  
}

function findList(id, array, array2, funkce){
    let i = 0;
    for(const project of array){
        if(id == project.id){
            funkce.i = i;
            funkce.project = project;
            funkce.array = array;
            funkce.array2 = array2;
            funkce.do();
            return true;
        }
        i++;
    }
    return false;
}

function putLiFromUlToUl(){

    if(!findList(this.id, activeProjectsArray, finishedProjectsArray, switchList)){
        findList(this.id, finishedProjectsArray, activeProjectsArray, switchList);
        changeTextInTheButton(this, 'Finish');
        return;
    }
    changeTextInTheButton(this, 'Activate');
    return;
}


function setEventListenersInArray(array, array2, pomocnePole, ID){
    for(const project of array.children){
        const btns = project.querySelectorAll('button');
        const object = {
            from: array,
            to: array2, 
            id: ID, 
            // info: /*'detaily o projektu'*/ prompt('set information', '')
        }
        moreInfoArray.push(object);
        pomocnePole.push(object);
        btns[0].id = ID;
        btns[1].id = ID;
        btns[0].addEventListener('click', moreInfo);
        btns[1].addEventListener('click', putLiFromUlToUl);

        ID++;
    }
    return ID;
}

function setEventListeners(){
    let ID = setEventListenersInArray(activeProjects, finishedProjects, activeProjectsArray, 0);
    setEventListenersInArray(finishedProjects, activeProjects, finishedProjectsArray, ID);
}

setEventListeners();