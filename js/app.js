const  getText = () =>  {
    var inputText = document.getElementById('input-text');
    var searchValue = inputText.value;
    inputText.value = '';
   
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    
    fetch(url)
    .then(res => res.json())
    .then ( data => displayData(data.data));

}

function  displayData(phones) {
    const phoneRapper = document.getElementById('phones-rapper');
    phoneRapper.textContent = '';
        for( item of phones) {
         console.log(item.slug);
       
        const div = document.createElement('div');
        div.classList.add('col', 'dibba');
        div.innerHTML = `
        <div class='card h-50' onclick='loadDetail(${item.slug})'>
        <img src='${item.image}' class='card-img-top' alt='...'>
        <div class='card-body'>
          <h5 class='card-title'>${item.phone_name}</h5>
          More </a> </span> </p>
        </div>
      </div>
        `;
        phoneRapper.appendChild(div);
    } 
}

const loadDetail = async id => {
	console.log(id);
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  phoneDetails(data.data);
  console.log(data.data);

}
const phoneDetails = details => {
    console.log(details);
    const div = document.getElementById('phonedetails');
    div.innerHTML = `
    <div class='card mb-5' style='width: 30rem;'>
    <img class='card-img-top' src='${details.image}' alt='Card image cap'>
    <div class='card-body'>
      <h5 class='card-title'>${details.storage}</h5>
      <p class='card-text'>${details.memory}</p>
      
    </div>
  </div> 
    `;
    
}


