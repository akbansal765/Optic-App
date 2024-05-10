const container = document.querySelector('.data_container');
const form = document.querySelector('.customer_data');
const openBtn = document.querySelector('.upload_btn');
const closeBtn = document.querySelector('.close_window');
const dataWindow = document.querySelector('.upload_window');
const overlay = document.querySelector('.overlay_window');
const submitBtn = document.querySelector('.submit_btn');
const inputElements = document.querySelectorAll('.cust');
const searchBtn = document.querySelector('.search_btn');
const searchBar = document.querySelector('.search_field');

const detailsWindow = document.querySelector('.detais_window');



// Functions
const closeModal = function(){
      dataWindow.classList.toggle('hidden');
      overlay.classList.toggle('hidden');
}

const closeDetailsModal = function(){
    detailsWindow.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
}
const displayCustomer = function(data){
      const markup = `
      <div class="customer" id="${data.id}" >
            <h3>Name: <span class="special">${data.name}</span></h3>
            <h3>S/O: <span class="special">${data.parent}</span></h3>
            <h3>DOB: <span class="special">${data.age}</span></h3>
            <h3>City/Village: <span class="special">${data.address}</span></h3>
            <button class="details_customer" id="${data.id}">
               <img src="/images/main-menu.png" alt="">
            </button>
            <button class="delete_customer" id="${data.id}">
               <img src="/images/cancel.png" alt="">
            </button>
      </div>
      `
      container.insertAdjacentHTML('afterbegin', markup);
}
// array containing the values of only one upload window which is opened
const arrayElements = [];

// Getting Values from Form
const array = [];

form.addEventListener('submit', function(e){
    e.preventDefault();
    const formDataArr = [...new FormData(this)];
    const dataObj = Object.fromEntries(formDataArr);
      
    array.push(dataObj);
    
    // assigning every dataObj unique ids - this code assigns ids everytime array is reloaded for every object which can affect on performance for large no of users later, so to resolve this we have to come up with new idea which will assign the id to object one by one when only one
    array.forEach((obj, i) => {
        obj.id = i + 1;
    });

    console.log(array);

    // storing Array to local storage
    localStorage.setItem('Array', JSON.stringify(array));
          
    // creating a new customer data tab in the data container
    displayCustomer(dataObj);

    // closing overlay and modal window after the submission of the form
    closeModal();

    // clearing input fields of modal window after the submission of the form
    inputElements.forEach(el => el.value = '');

    delCustomer(); // Call delCustomer function after adding new data

    detailsWindowMain(); // Cal details Window function after adding new data
});

// handling events on close button and open button
closeBtn.addEventListener('click', closeModal);
openBtn.addEventListener('click', closeModal);

// getting data from local storage
const data = localStorage.getItem('Array');
const finalDataArray = JSON.parse(data);
console.log(finalDataArray);

// rendering local storage data in webpage
finalDataArray?.forEach(obj => {  // we used optional chaning cause when the finalDataArray will not exist it will not give an error in console
    array.push(obj);
    displayCustomer(obj);
});


const delCustomer = function() {
    const delBtns = document.querySelectorAll('.delete_customer');

    // Remove existing event listeners to prevent duplicates
    delBtns.forEach(delBtn => {
        delBtn.removeEventListener('click', deleteCustomer);
    });

    // Add event listener to all delete buttons
    delBtns.forEach(delBtn => {
        delBtn.addEventListener('click', deleteCustomer);
    });
}

const deleteCustomer = function() {
    const delCustomer = this.closest('.customer');

    // removing customer from DOM
    delCustomer.remove();
    
    // deleting from array and updating the local storage
    const index = array.findIndex(obj => obj.id === +delCustomer.id);
    array.splice(index, 1);
    localStorage.setItem('Array', JSON.stringify(array)); // Update local storage after deletion
};

// Call delCustomer function after all delete buttons have been rendered
window.addEventListener('load', delCustomer);


//////////////////////////////////////// Implementing Search feature ////////////////////////////////////////
searchBtn.addEventListener('click', function(){
      // getting the search value
      const searchValue = searchBar.value;
      console.log(searchValue);
      
      // getting DOM customer elements
      const nodeList = document.querySelectorAll('.customer');
      const customers = Array.from(nodeList);
      console.log(customers);
    
      // getting search reults according to search value
      const searchResults = array.filter(obj => obj.name.startsWith(searchValue));
      console.log(searchResults);

      // creating alert when there are no search results
      if(searchResults.length === 0) alert('Try searching with different name!')

      // first removing all the current customers
      customers.forEach(el => el.remove());

      // displaying only the search results now
      searchResults.forEach(obj => {  

      displayCustomer(obj);

      delCustomer(); // Call delCustomer function after searching for data

      detailsWindowMain(); // Cal details Window function after searching for data

      });
    });

//////////////////////////////////// Implementing Details Window feature //////////////////////////////////////////

const detailsWindowMain = function(){
    const detailsBtn = container.querySelectorAll('.details_customer');
    
    // Remove existing event listeners to prevent duplicates
    detailsBtn.forEach(el => el.removeEventListener('click', detailsWindowPrimary))
    
    // Adding event listeners to all detail buttons
    detailsBtn.forEach(el => el.addEventListener('click', detailsWindowPrimary))

};

const detailsWindowPrimary = function(){  // here this keyword is pointing to "el"
// Open Details window
        closeDetailsModal();

        console.log(this.id)
        // getting an array object that have same id as details button
        const arrayEl = array.find(obj => obj.id === +this.id);
        console.log(arrayEl);
        
        // first empty the arrayElements array and then push the arrayEl, so that everytime there will be only one element in array
        arrayElements.pop();
        arrayElements.push(arrayEl);

        const markup = `
            <div class="box_1">
              <button class="close_detailsWindow cursor">
                 <img src="/images/cancel.png" alt="close">
              </button>
            </div>
            <div class="box_2">
            <div class="column1">
                <p>Name :</p>
                <div>${arrayEl.name}</div>
                <p>Mother/Father :</p>
                <div>${arrayEl.parent}</div>
                <p>DOB :</p>
                <div>${arrayEl.age}</div>
                <p>City/Village :</p>
                <div>${arrayEl.address}</div>
            </div>

            <div class="column2">
                <p>Right Eye :</p>
                <div>${arrayEl.rightEye}</div>
                <p>Left Eye :</p>
                <div>${arrayEl.leftEye}</div>
                <p>Degree/Angle :</p>
                <div>${arrayEl.degree}</div>
                <p>Addition/Near Vision :</p>
                <div>${arrayEl.addition}</div>
            </div>
            </div>
            <div class="box_3">
            <button class="update_details inner_shadow cursor">Update</button>
            </div>
        `;
        detailsWindow.innerHTML = markup;

        // closing the details window
        const detailClose = document.querySelector('.close_detailsWindow');
        console.log(detailClose);

        detailClose.addEventListener('click', closeDetailsModal);

        updateDetails();

};

window.addEventListener('load', detailsWindowMain);


// Implementing Updating or Edit details feature
const updateDetails = function(){
    const updateDetail = document.querySelector('.update_details');

    updateDetail.addEventListener('click', function(){
        console.log(arrayElements);
        const [valueObj] = arrayElements;

        const markup = `
            <div class="box_1">
              <button class="close_detailsWindow cursor">
                 <img src="/images/cancel.png" alt="close">
              </button>
            </div>
            <div class="update_container box_2">
                <div class="personal_data_edit column1">
                    <p>Name :</p>
                    <input type="text" class="customer_name_update cust" name="name" placeholder="Name" value="${valueObj.name}">
                    <p>Mother/Father :</p>
                    <input type="text" class="customer_parent_update cust" name="parent" placeholder="Mother/Father" value="${valueObj.parent}">
                    <p>DOB :</p>
                    <input type="text" class="customer_age_update cust" name="age" placeholder="DOB" value="${valueObj.age}">
                    <p>City/Village :</p>
                    <input type="text" class="customer_address_update cust" name="address" placeholder="City / Village" value="${valueObj.address}">
                </div>
                <div class="eye_info_edit column2">
                    <p>Right Eye :</p>
                    <input type="text" class="customer_rightEye_update cust" name="rightEye" placeholder="Right Eye" value="${valueObj.rightEye}">
                    <p>Left Eye :</p>
                    <input type="text" class="customer_leftEye_update cust" name="leftEye" placeholder="Left Eye" value="${valueObj.leftEye}">
                    <p>Degree/Angle :</p>
                    <input type="text" class="customer_degree_update cust" name="degree" placeholder="Degree / Angle" value="${valueObj.degree}">
                    <p>Addition/Near Vision :</p>
                    <input type="text" class="customer_addition_update cust" name="addition" placeholder="Addition / Near Vision" value="${valueObj.addition}">
                </div>
             </div>
             <div class="box_3">
               <button class="update_button inner_shadow cursor">Update</button>
             </div>
        `;
        detailsWindow.innerHTML = markup;

        // Closing Update Details feature window
        const detailClose = document.querySelector('.close_detailsWindow');
        detailClose.addEventListener('click', closeDetailsModal);

        updateContainer(valueObj);

        
    })
};

const updateContainer = function(valueObj){
    const obj = {...valueObj}; // creating a clone so that we dont alterate the valueObj
    const updateBtn = document.querySelector('.update_button');
    
    updateBtn.addEventListener('click', function(){

    obj.name = document.querySelector('.customer_name_update').value;
    obj.parent = document.querySelector('.customer_parent_update').value;
    obj.age = document.querySelector('.customer_age_update').value;
    obj.address = document.querySelector('.customer_address_update').value;
    obj.rightEye = document.querySelector('.customer_rightEye_update').value;
    obj.leftEye = document.querySelector('.customer_leftEye_update').value;
    obj.degree = document.querySelector('.customer_degree_update').value;
    obj.addition = document.querySelector('.customer_addition_update').value;
    console.log(obj);
 
    //  getting the DOM element that needs to be removed from the DOM after the updation
    const allCustomers = document.querySelectorAll('.customer');
    console.log(allCustomers);

    const [elementToBeUpdated] = Array.from(allCustomers).filter(el => +el.id === obj.id);
    console.log(elementToBeUpdated);

    elementToBeUpdated.remove();

    // creating new updated customer in the DOM
    displayCustomer(obj);
    
    // pushing the newly created obj to public array
    array.push(obj);

    // closing the modal after the update button has pressed
    closeDetailsModal();
    
    // deleting valueObj from the public array
    const index = array.findIndex(obj => obj.id === valueObj.id);
    console.log(index);

    array.splice(index, 1);
    console.log(array);

    // updating the local storage
    localStorage.setItem('Array', JSON.stringify(array));

    // calling the details window immediately after the updation
    detailsWindowMain();
   
    // calling the delete feature immediately after the updation
    delCustomer();
    })
}

















///////////////////////////////// in this code multiple event are attaching to details buttons right after uploading a new data /////////////////////////////////////////
/*
const detailsWindowFunction = function(){
const detailsBtn = container.querySelectorAll('.details_customer');

detailsBtn.forEach(el => el.addEventListener('click', function(){
     // Open Details window
     closeDetailsModal();

     console.log(el.id)
     // getting an array object that have same id as details button
     const arrayEl = array.find(obj => obj.id === +el.id);
     console.log(arrayEl);

     const markup = `
            <button class="close_detailsWindow button">Close1</button>
            <div class="column1">
            <h3>Name: ${arrayEl.name}</h3>
            <h3>S/O: ${arrayEl.parent}</h3>
            <h3>DOB: ${arrayEl.age}</h3>
            <h3>City/Village: ${arrayEl.address}</h3>
            </div>
            <div class="column2">
                <h3>Right Eye: ${arrayEl.rightEye}</h3>
                <h3>Left Eye: ${arrayEl.leftEye}</h3>
                <h3>Degree / Angle: ${arrayEl.degree}</h3>
                <h3>Addition / Near Vision: ${arrayEl.addition}</h3>
            </div>
     `;
     detailsWindow.innerHTML = markup;
     
     // closing the details window
     const detailClose = document.querySelector('.close_detailsWindow');
     console.log(detailClose);

     detailClose.addEventListener('click', closeDetailsModal);
}))
};

detailsWindowFunction();
*/


/////////////////////////////////////////////////////// The alternative code for deleting the customer, In this code multiple events are attaching to del buttons/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
// Deleting customer from DOM only for buttons that are rendered after getting the data from local storage, here we cannot select the del buttons that are uploaded immediately after the submission


const delCustomer = function(){
      const delBtns = document.querySelectorAll('.delete_customer');
      // console.log(delBtns);

      const btns = Array.from(delBtns);
      
      btns.forEach(delBtn => {
            delBtn.addEventListener('click', function(){
                  const delCustomer = delBtn.closest('.customer');
                  console.log(delCustomer);
                  console.log(delCustomer.id);
                  // delCustomer.remove();

            // deleting from local storage
            
            const index = array.findIndex(obj => obj.id === +delCustomer.id);

            array.splice(index, 1);

            console.log(array)
            // updating the local storage array
            // localStorage.setItem('Array', JSON.stringify(array));
            });
      });
};

window.addEventListener('load', delCustomer);
*/