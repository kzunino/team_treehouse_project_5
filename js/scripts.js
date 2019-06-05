// **** Global Variables *****

const searchContainer = $('.search-container');
const formInputs = `<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
</form>`;
searchContainer.append(formInputs);         //appends HTML for search
const galleryDiv = $('#gallery');
const body = $('body');
const modalContainer = $('.modal-container');
let jsonData = '';
modalContainer.hide();


// ****** 12 random users ******

$.ajax({
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function(data) {
    jsonData = data.results;
    console.log(data)
    data.results.forEach(user => {                  //iterates through each user seed
      const galleryDiv = $('#gallery');
      const firstName = user.name.first;            //pulls relevant information from JSON
      const lastName = user.name.last;
      const email = user.email;
      const street = user.location.street;
      const city = user.location.city;
      const state = user.location.state;
      const photo = user.picture.large;
      const userCard = `<div class="card">
                          <div class="card-img-container">
                              <img class="card-img" src="${photo}" alt="profile picture">
                          </div>
                          <div class="card-info-container">
                              <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                              <p class="card-text">${email}</p>
                              <p class="card-text cap">${city}, ${state}</p>
                          </div>
                        </div>`;
      galleryDiv.append(userCard);
    })
  }
}); //end ajax request

// **** Modal Window *****


galleryDiv.on('click', '.card', function(event) {       /* use json variable to access user information */
  event.preventDefault();
  let i = $(this).index();
  const firstName = jsonData[i].name.first;
  const lastName = jsonData[i].name.last;
  const email = jsonData[i].email;
  const street = jsonData[i].location.street;
  const city = jsonData[i].location.city;
  const state = jsonData[i].location.state;
  const photo = jsonData[i].picture.large;
  const phoneNumber = jsonData[i].phone;
  const postalCode = jsonData[i].location.postcode;
  const birthday = jsonData[i].dob.date;
  const modalMarkup = `<div class="modal-container">
                  <div class="modal">
                      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                      <div class="modal-info-container">
                          <img class="modal-img" src="${photo}" alt="profile picture">
                          <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
                          <p class="modal-text">${email}</p>
                          <p class="modal-text cap">${city}</p>
                          <hr>
                          <p class="modal-text">${phoneNumber}</p>
                          <p class="modal-text">${street}, ${city}, ${state} ${postalCode}</p>
                          <p class="modal-text">Birthday: ${birthday}</p>
                      </div>
                  </div>`
  body.append(modalMarkup);
  modalContainer.show();
  $('strong').on('click', function(){
    modalContainer.hide();
    body.children().last().remove();
  })
}); //end event listener
