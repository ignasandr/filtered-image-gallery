class Picture {
    constructor(link, tags){
        this.link = link;
        this.tags = tags;
        this.visible = false;
    }
    spawn(element, id){
        //create HTML outline
        const HTML = `
        <div class="image" data-index=${id}>
            <img src="${this.link}">
            <div class="info">
                <a href="${this.link}">
                    <i></i>
                </a>
                <h5>
                    <a href="#">Our Photography</a>
                </h5>
            </div>
        </div>`;
        //add to the end of gallery
        element.insertAdjacentHTML('beforeend', HTML);
        this.visible = true;
        this.inDOM = gallery.querySelector(`[data-index="${id}"]`);
    }
    hide(){
        this.inDOM.style.display = "none";
        this.visible = false;
    }
    appear(){
        this.inDOM.style.display = "initial";
        this.visible = true;
    }
}

let loadedPictures = [];
const navBar = document.querySelector('.portfolio > .row > nav');

function createNav(tags) {
    tags.forEach(tag => {
        const filterTag = document.createElement('li');
        filterTag.textContent = tag;
        navBar.appendChild(filterTag);
    });
    activateFilter();
}

//populate a list of pictures and create an html element for each
function createGallery(pictureBank) {
    const gallery = document.querySelector('#gallery');
    pictureBank.forEach((entry, index) => {
        loadedPictures[index] = new Picture(entry.link, entry.tags);
        loadedPictures[index].spawn(gallery, index);
    });
}

// activate filter
function activateFilter() {
    // const navBar = document.querySelector('.portfolio > .row > nav');
    navBar.addEventListener('click', e => {
        if(e.target.tagName == "LI") {
            //get text value of the nav element pressed
            const term = e.target.textContent.toLowerCase();
            //set the element that was pressed to active
            const allTags = navBar.querySelectorAll('li');
            allTags.forEach(tag => {
                if (tag.textContent.toLowerCase() === term){
                    tag.classList.add('active');
                }
                else {
                    tag.classList.remove('active');
                }
            });
            //show all pictures if the text value of selected element is equal to all
            if (term === 'all') {
                loadedPictures.forEach(picture => {
                    if (picture.visible === false) {
                        picture.appear();
                    }
                });
            }
            //otherwise filter by tag name
            else {
                loadedPictures.forEach(picture => {
                    const tags = picture.tags;
                    if(tags.includes(term) === true && picture.visible === false){
                        picture.appear();
                    }
                    else if (tags.includes(term) === false && picture.visible === true) {
                        picture.hide();
                    }
                });
            }
        }
    });
}

export default {
    createNav,
    createGallery
};