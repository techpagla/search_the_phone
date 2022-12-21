//Get the phone lists by search value
const getTextData = () => {
    var inputText = document.getElementById('input-text');
    var searchValue = inputText.value;
    console.log(searchValue.length);
    inputText.value = '';
    makeBlank(searchValue);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data));
}

//make the field blank
const makeBlank = (searchValue) => {
    if (searchValue.length > 0) {
        document.getElementById('phonedetails').innerHTML = ` `;
    }

}

//Display the phones according to the seach value
function displayData(phones) {
    // display no phones found
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    } else {
        noPhone.classList.add('d-none');
    }

    const phoneRapper = document.getElementById('phones-rapper');
    phoneRapper.textContent = '';
    if (phones.length > 10) {
        var x = 10;
        document.getElementById('show-all').classList.remove('d-none');

    } else {
        document.getElementById('show-all').classList.add('d-none');
    }

    //adding the function of show all phones
    document.getElementById('btn-show-all').addEventListener("click", function() {
        phoneRapper.textContent = '';
        var x = 1000;
        for (phone of phones.slice(-x)) {
            const div = document.createElement('div');
            div.classList.add('col', 'dibba');
            div.innerHTML = `
          <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadDetails('${phone.slug}')" href="#" class="btn btn-primary" >Show Details</button>
            </div>
        </div>
        `;

            phoneRapper.appendChild(div);

        }
        document.getElementById('show-all').classList.add('d-none');



    });

    for (phone of phones.slice(-x)) {
        const div = document.createElement('div');
        div.classList.add('col', 'dibba');
        div.innerHTML = `
          <div class="card p-4">
          <img src="${phone.image}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <button onclick="loadDetails('${phone.slug}')" href="#" class="btn btn-primary" >Show Details</button>
          </div>
      </div>
          `;
        phoneRapper.appendChild(div);

    }
}


//Load details of clicked phones
const loadDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    phoneDetails(data.data);


}

//show details of clicked phones
const phoneDetails = details => {
    const div = document.getElementById('phonedetails');
    div.innerHTML = `
    <div class='card mb-5' style='width: 30rem;'>
    <img class='card-img-top' src='${details.image}' alt='Card image cap'>
    <div class='card-body'>
      <h5 class='card-title'>Name: ${details.name}</h5>
      <h6 class='card-title'>Brand: ${details.brand}</h6>
      <h6 class='card-title'>Release Date: ${details.releaseDate}</h6>
      <h6 class='card-title'>Chipset: ${details.mainFeatures.chipSet}</h6>
      <h6 class='card-title'>Display Size: ${details.mainFeatures.displaySize}</h6>
      <h6 class='card-title'>Storage: ${details.mainFeatures.storage}</h6>
      <h6 class='card-title'>Sensors: ${details.mainFeatures.sensors}</h6>
      
    </div>
  </div> 
    `;

}