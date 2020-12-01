//Setting up an onclick for the submit button 
document.getElementById("wishlist-form").addEventListener("submit", getFormData);

//gather form data
function getFormData(event) {

  event.preventDefault();

  let name = event.currentTarget[0].value;
  let loc = event.currentTarget[1].value;
  
  //if no photo url provided set default photo
  let photoURL = event.currentTarget[2];
  if (photoURL.value.length === 0) {
    photoURL = "./res/default_photo.png";
  }
  else {
    photoURL = photoURL.value;
  }

  let description = event.currentTarget[3].value;

  resetForm(event.currentTarget);
  // console.log(`Name: ${name}, Location: ${loc}, URL: ${photoURL}, Desc: ${description}`);
  formatHTMLDisplay(name, loc, photoURL, description);
}

/*
 * creating an html element out of form data
 * utilizing bootstrap styling to dynamically place
 * users choices into the html
*/
function formatHTMLDisplay(name, loc, url, desc) {
  //setting container div to hold image and text
  //utilizing bootstrap classes for styling
  let containDiv = document.createElement("div");
  containDiv.setAttribute("class", "card");
  containDiv.style.width = "16rem";

//setting up the image ele, utilizing bootstrap classes
  let image = document.createElement("img");
  image.setAttribute("class", "card-img-top");
  image.setAttribute("src", url);

  containDiv.appendChild(image); //adding image to container div


  //div to hold the name, location, and description text
  let divBody = document.createElement("div");
  divBody.setAttribute("class", "card-body");
  divBody.style.textAlign = "left";
  divBody.style.border = "1px solid grey";

  //setting name to be an h4
  let titleH5 = document.createElement("h5");
  titleH5.setAttribute("class", "card-title");
  titleH5.innerText = name;

  //setting location to be an h5
  let locH6 = document.createElement("h6");
  locH6.setAttribute("class", "card-subtitle text-muted");
  locH6.innerText = loc;

  //setting description to be a p
  let descPara = document.createElement("p");
  descPara.setAttribute("class", "card-text");
  descPara.textContent = desc;

  //div to hold the buttons for help in styling
  let buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("id", "button-spacing");

  //Edit and remove buttons to go in card-body
  let editBtn = document.createElement("button");
  editBtn.setAttribute("class", "btn btn-warning edit");
  editBtn.innerText = "Edit";
  editBtn.style.paddingRight = "10%";
  editBtn.addEventListener("click", editDestination);

  let removeBtn = document.createElement("button");
  removeBtn.setAttribute("class", "btn btn-danger remove");
  removeBtn.innerText = "Remove";
  removeBtn.style.paddingLeft = "10%";
  removeBtn.addEventListener("click", removeDestination);

  //add buttons to buttonDiv
  buttonDiv.appendChild(editBtn);
  buttonDiv.appendChild(removeBtn);

  //add all text fields to the divBody
  divBody.appendChild(titleH5);
  divBody.appendChild(locH6);
  divBody.appendChild(descPara);
  divBody.appendChild(buttonDiv);

  containDiv.appendChild(divBody); //add divBody to the parent div

  //append all of this to the destinations-list div in the HTML
  document.getElementById("destinations-list").appendChild(containDiv);

  document.getElementById("display-title").innerHTML = "My WishList";
}


//helper to reset the form after submit
function resetForm(form) {
  Array.from(form.elements).forEach(element => element.value = "");
}


function removeDestination(event) {
  //getting the display of destination clicked
  let destDisplay = event.target.parentElement.parentElement.parentElement;
  //removing from the parent div
  document.getElementById("destinations-list").removeChild(destDisplay);
  
  //checking if no more destinations are left, if none setting text back to 
  //destinations
  if (document.getElementById("destinations-list").children.length === 0) {
    document.getElementById("display-title").innerHTML = "Destinations";
  }
}

/*
 * Changes the data stored within the display based on user inputs
*/
function editDestination(event) {
  let destDisplay = event.target.parentElement.parentElement.parentElement;
  let photoURL = destDisplay.children[0];

  let displayTextBody = event.target.parentElement.parentElement;
  let title = displayTextBody.children[0];
  let loc = displayTextBody.children[1];
  
  let newTitle = prompt("Enter destination name");
  let newLoc = prompt("Enter location");
  let newURL = getNewURL();

  photoURL.setAttribute("src", newURL);
  title.innerText = newTitle;
  loc.innerText = newLoc;
}


//function to prompt user to enter photo url and ensures
//url is valid, if it is not, allows user to reenter a proper
//url
function getNewURL() {
  let isValid = false;
  let newURL = "";

  while (!isValid) {
    newURL = prompt("Enter photo url");

    if (isValidUrl(newURL)) {
      isValid = true;
    }
    else {
      alert(`${newURL} is not a valid url, please try again.`);
    }
  }
  return newURL;
}

//checks if the user string is a valid url
//by trying to create a new url, if successful its true
//if an error is thrown it is false
function isValidUrl(url) {
  result = true;

  try {
    new URL(url);
  }
  catch (err) {
    result = false;
  }
  return result;
}