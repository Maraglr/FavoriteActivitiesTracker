class Activity {
    constructor (id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
};

class Repository {
    constructor () {
        this.id = 0;
        this.activities = [];
    };
    
    getAllActivities () {
        return this.activities;
    };

    createActivities (title, description, imgUrl) {
        const id = this.id++;
        const actividad = new Activity (id, title, description, imgUrl)
        return this.activities.push(actividad)
    };

    deleteActivities(id) {
        this.activities = this.activities.filter((actividad) => actividad.id !== id);
    }
};


const rep = new Repository();

function createActivityElement(activity) {
    const {title, description, imgUrl } = activity;

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    const titleElement = document.createElement('h3');
    titleElement.textContent = title;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;

    const imageElement = document.createElement('img');
    imageElement.src = imgUrl;
    imageElement.alt = title;

    cardDiv.classList.add('activity-card');
    titleElement.classList.add('activity-title');
    descriptionElement.classList.add('activity-description');
    imageElement.classList.add('activity-image');

    cardDiv.appendChild(titleElement);
    cardDiv.appendChild(descriptionElement);
    cardDiv.appendChild(imageElement);

    return cardDiv;
}

function renderActivities() {
    const container = document.querySelector('.cardsContainer');

    container.innerHTML = '';

    const activities = rep.getAllActivities();

    const activityElements = activities.map(activity => createActivityElement(activity));

    activityElements.forEach(activityElement => {
        container.appendChild(activityElement);
    });
}

function addButtonHandler(event) {

    event.preventDefault();


    const titleInput = document.querySelector('input[name="titulo"]');
    const descriptionInput = document.querySelector('textarea[name="descripcion"]');
    const imgUrlInput = document.querySelector('input[name="buscador"]');


    const title = titleInput.value;
    const description = descriptionInput.value;
    const imgUrl = imgUrlInput.value;


    if (!title || !description || !imgUrl) {
        alert("Ups! Parece que hay un campo incompleto. Por favor complete todos");
        return; 
    }

    rep.createActivities(title, description, imgUrl);

    renderActivities();

    titleInput.value = '';
    descriptionInput.value = '';
    imgUrlInput.value = '';
}

const addButton = document.querySelector('button[type="submit"]');
addButton.addEventListener('click', addButtonHandler);