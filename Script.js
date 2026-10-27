// I was told to get all the elements first and check if they exist
let myForm = document.getElementById('registrationForm');
let nameInput = document.getElementById('fullName');
let emailInput = document.getElementById('email');
let phoneInput = document.getElementById('phone');
let courseSelect = document.getElementById('course');
let messageBox = document.getElementById('message');

// error spans for each input
let nameErr = document.getElementById('fullNameError');
let emailErr = document.getElementById('emailError');
let phoneErr = document.getElementById('phoneError');
let courseErr = document.getElementById('courseError');
let messageErr = document.getElementById('messageError');

// other parts
let successBox = document.getElementById('successMessage');
let list = document.getElementById('memberList');
let counter = document.getElementById('memberCounter');
let darkBtn = document.getElementById('darkModeToggle');

// just to confirm everything is found like the question said
console.log(myForm);
console.log(nameInput, emailInput, phoneInput, courseSelect, messageBox);
console.log(nameErr, emailErr, phoneErr, courseErr, messageErr);
console.log(successBox, list, counter, darkBtn);

// when form is submitted
myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let ok = true; // to track if all is valid

    // check name
    if(nameInput.value.trim() == ""){
        nameErr.textContent = "Please enter your full name";
        ok = false;
    } else if(nameInput.value.length < 3){
        nameErr.textContent = "Name is too short";
        ok = false;
    }

    // check email
    if(emailInput.value.trim() == ""){
        emailErr.textContent = "Email is needed";
        ok = false;
    } else if(!emailInput.value.includes('@')){
        emailErr.textContent = "Email should have @";
        ok = false;
    }

    // phone
    if(phoneInput.value.trim() == ""){
        phoneErr.textContent = "Phone number required";
        ok = false;
    }

    // course
    if(courseSelect.value == ""){
        courseErr.textContent = "Choose course please";
        ok = false;
    }

    // message
    if(messageBox.value.trim() == ""){
        messageErr.textContent = "Write something";
        ok = false;
    }

    if(ok == false){
        return; // stop if there is error
    }

    // if everything is okay, add member to list
    let newLi = document.createElement('li');
    newLi.innerHTML = `<span>${nameInput.value} - ${courseSelect.value}</span> <button class="removeBtn">X</button>`;
    list.appendChild(newLi);

    // update how many members
    counter.textContent = list.children.length;

    // show success message
    successBox.classList.remove('hidden');
    myForm.reset();

    // hide success after 3 sec
    setTimeout(function(){
        successBox.classList.add('hidden');
    }, 3000);
});

// clear error when user starts typing again - this helps UX
nameInput.addEventListener('input', () => nameErr.textContent = "");
emailInput.addEventListener('input', () => emailErr.textContent = "");
phoneInput.addEventListener('input', () => phoneErr.textContent = "");
courseSelect.addEventListener('change', () => courseErr.textContent = "");
messageBox.addEventListener('input', () => messageErr.textContent = "");

// removing a member
list.addEventListener('click', (e) => {
    if(e.target.classList.contains('removeBtn')){
        e.target.parentElement.remove();
        counter.textContent = list.children.length;
    }
});

// dark mode part
darkBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if(document.body.classList.contains('dark')){
        darkBtn.textContent = "Light Mode";
    } else {
        darkBtn.textContent = "Dark Mode";
    }
});
