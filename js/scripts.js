// **** Global Variables *****

const searchContainer = $('.search-container');
const formInputs = `<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
</form>`;
searchContainer.append(formInputs);         //appends HTML for search
const galleryDiv = $('#gallery');

// ***** Modal Container ******

const body = $('body')
const modalMarkup = `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                        <h3 id="name" class="modal-name cap">name</h3>
                        <p class="modal-text">email</p>
                        <p class="modal-text cap">city</p>
                        <hr>
                        <p class="modal-text">(555) 555-5555</p>
                        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                        <p class="modal-text">Birthday: 10/21/2015</p>
                    </div>
                </div>`
body.append(modalMarkup);
const modalContainer = $('.modal-container').hide();

// ****** 12 random users ******

$.ajax({
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function(data) {
    console.log(data)
    data.results.forEach(user => {
      const galleryDiv = $('#gallery');
      const firstName = user.name.first;
      const lastName = user.name.last;
      const email = user.email;
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
