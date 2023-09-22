//Initializing the elements
const body = document.body;
const mainInput = document.querySelector("#link");
const overlay = document.querySelector(".overlay");

const linkForm = document.querySelector("#link-form");
const listElements = document.querySelector(".list-of-links");

let allLinks = JSON.parse(localStorage.getItem('link_list')) || [];
populateLinkList(allLinks);

//Adding event listeners
mainInput.addEventListener("focusin", focusInput);
mainInput.addEventListener("focusout", endFocus);
overlay.addEventListener("click", endFocus);
linkForm.addEventListener("submit", createLink);
listElements.addEventListener("click", removeLink);

//Functions 
function focusInput() {
    body.classList.add("focus-form");
}

function endFocus() {
    body.classList.remove("focus-form");
}

function createLink(linkEvent) {
    linkEvent.preventDefault();
    const url = mainInput.value; 

    allLinks.push(url);
    populateLinkList(allLinks);
    addLinkToStorage(allLinks);

    //reset the form
    linkForm.reset();
}

function removeLink(clickEvent) {
    if(!clickEvent.target.matches(".close-btn")) return;

    const index = clickEvent.target.parentNode.dataset.index;
    
    allLinks.splice(index, 1);
    populateLinkList(allLinks);
	saveLinkListToLocalStorage(allLinks);
}

function addLinkToStorage(links) {
    localStorage.setItem('link_list', JSON.stringify(links));
}

function populateLinkList(links = []) {
    // Loop over all links and create a new bookmark for each element
    listElements.innerHTML = links
      .map(
        (link) =>
            `<li> 
                <a class="link" href=${link} target="_blank" >${link}</a> 
                <button class="close-btn">&times;</button>
            </li>`
      )
      .join("");
}