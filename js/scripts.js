// **** Global Variables *****

const searchContainer = $('.search-container');
const formInputs = `<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
searchContainer.append(formInputs);         //appends HTML for search
const galleryDiv = $('#gallery');
const body = $('body');
const modalContainer = $('.modal-container');
let jsonData = '';                            //stores JSON data to create modals
let i = 0;                                    //i is the index value of whichever employee modal is clicked
let visibleEmployees = [];

// ****** 12 random users ******

$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us',
  dataType: 'json',
  success: function(data) {
    jsonData = data.results;                        //stores data to access outside of request
    data.results.forEach(user => {                  //iterates through each user seed
      const galleryDiv = $('#gallery');
      const firstName = user.name.first;            //pulls relevant information from JSON
      const lastName = user.name.last;
      const email = user.email;
      const street = user.location.street;
      const city = user.location.city;
      const state = user.location.state;
      const photo = user.picture.large;               //below uses string interpolation to add information to cards
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

function createModal(i){                            //pulls data from jsonData to populate modal
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
  let birthdate = birthday.slice(0, 10).split('-');                          //takes first 10 digits and removes dashes
  birthdate = birthdate[1]+'/'+birthdate[2]+'/'+birthdate[0];                //converts date to mm/dd/yyyy
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
                          <p class="modal-text">Birthday: ${birthdate}</p>
                      </div>
                  </div>`
  body.append(modalMarkup);

  const toggleModal = `<div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
  </div>
  </div>`
  $('.modal-container').append(toggleModal);

// *** Previous, Next and Exit Buttons  ***

  $('#modal-prev').on('click', function(){              // shows previous employee on the list
    let employee = $('.card');
    if (i > 0 ) {
      for (let x = i - 1; x >= 0; x--){
        if (employee.eq(x).is(":visible")){
          body.children().last().remove();
          createModal(x);
          if (employee[x] === visibleEmployees[0]) {
            removePrev();
          }
          break;
        }
      }
    }
  })

  $('#modal-next').on('click', function(){              // shows next employee on list
    let employee = $('.card');
    let numberOfEmployees = employee.length;
    if (i < (numberOfEmployees - 1)) {                      // - 1 to reference last index value of visibleEmployees array
      for (let x = i + 1; x <= numberOfEmployees; x++){     //loops until it finds next visible employee if exists
        if (employee.eq(x).is(":visible")){                 //if employee is visible passes x as index value for modal
          body.children().last().remove();
          createModal(x);
          if (x === numberOfEmployees - 1 || employee[x] == visibleEmployees[visibleEmployees.length - 1]) {   //index is last
            removeNext();
          }
          break;                                          //stops loop after first visible modal is created
        }
        }
      }
  })

  $('#modal-close-btn').on('click', function(){                 //exits modal when X is clicked
    let employee = $('.card')
    modalContainer.hide();
    body.children().last().remove();
    i = 0;                                           //resets i to empty string
  })

} //end createModal

// ****** Searchbar functionaity *****

const searchFunctionality = () => {
  let searchInputValue = $('#search-input').val().toUpperCase();
  let employee = $('.card');
  visibleEmployees = [];
  i = 0;

  for (let x = 0; x < employee.length; x++){    //checks input against letters in name.
    employee[x].style.display = 'none';
    let employeeName = jsonData[x].name.first.toUpperCase() +" "+ jsonData[x].name.last.toUpperCase();
    if (employeeName.toUpperCase().indexOf(searchInputValue) > -1){
      employee[x].style.display = '';
      visibleEmployees.push(employee[x]);       //updates visible employee array with visible employees for length
  }
}
} // end search functionalty

// **** Search Event Listeners ******

const searchInput = $('#search-input');
searchInput.on('keyup', function(){
  searchFunctionality();
})

const searchButton = $('#search-submit');
searchButton.on('click', function(event) {
  event.preventDefault();
  searchFunctionality();
})

// ***** Employee Gallery Event Listener ********

galleryDiv.on('click', '.card', function(event) {
  event.preventDefault();
  let employees = $('.card');
  visibleEmployees = [];
  for (let x = 0; x < employees.length; x++) {
      if (employees.eq(x).is(":visible")){
        visibleEmployees.push(employees[x]);
      }
    }
  i = ($(this).index());                                // i is employee index value of clicked employee card
  createModal(i);                                      //passes userCard index number to function
  if (i === 0 || employees[i] === visibleEmployees[0]){     //if employee[i] === to same div as visibleEmployee
    removePrev();
  }
  if (employees[i] === visibleEmployees[visibleEmployees.length - 1] || employees[i] === employees[employees.length - 1]){
    removeNext();
  }
});    //end event gallery.card event listener

function removeNext(){
  $('#modal-next').remove();
}

function removePrev(){
  $('#modal-prev').remove();

}
