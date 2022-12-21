//Get the phone lists by search value
const  getTextData = () =>  {
    var inputText = document.getElementById('input-text');
    var searchValue = inputText.value;
    console.log(searchValue.length);
    inputText.value = '';
    makeBlank(searchValue);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
    .then(res => res.json())
    .then ( data => displayData(data.data));
}

//make the field blank
const makeBlank = (searchValue) => {
  if ( searchValue.length > 0) {
    document.getElementById('phonedetails').innerHTML = ` `;
  }
  
}

//Display the phones according to the seach value
function  displayData(phones) {
        // display no phones found
        const noPhone = document.getElementById('no-found-message');
        if(phones.length === 0){
            noPhone.classList.remove('d-none');
        }
        else{
            noPhone.classList.add('d-none');
        }

    const phoneRapper = document.getElementById('phones-rapper');
    // phoneRapper.textContent = '';
        for( item of phones.slice(-10)) {
        const div = document.createElement('div');
        div.classList.add('col', 'dibba');
        div.innerHTML = `
        <div class='card h-50'id='card-container'>
        <img src='${item.image}' class='card-img-top' alt='...'>
        <div class='card-body'>
          <h5 class='card-title'>${item.phone_name}</h5>
          <h6 class='card-title'>Brand: ${item.brand}</h6>
          <button href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal" onclick="loadDetails('${item.slug}')"> Show Details</button>
            
        </div>
      </div>
        `;
        phoneRapper.appendChild(div);
        if (item.length === 0) {
          break;
        }
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
    console.log(details);
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


