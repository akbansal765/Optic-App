const password = document.querySelector('.password');
const email = document.querySelector('.email_address')
const loginBtn = document.querySelector('.login_button');

const akash = {
    name: 'Akash Bansal',
    username: 'AB',
    password: 1234,
    email: 'ak.bansal.765@gmail.com'
}


loginBtn.addEventListener('click', function(){
     
    console.log(password.value);
    if(+password.value === akash.password && email.value === akash.email) 
    window.open('/dashboard.html', '_blank');
})