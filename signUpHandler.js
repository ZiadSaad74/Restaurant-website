document.getElementById("signup-btn").addEventListener("click", onclick)

function onclick() {
    let error = document.getElementById("error-msg");
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPass = document.getElementById("confirm-password").value;
    let phone = document.getElementById("phone").value;
    if (isEmpty(name) || isEmpty(email) || isEmpty(password) || isEmpty(confirmPass) || isEmpty(phone)) error.innerHTML = "Please enter your information!";
    else if (password !== confirmPass) error.innerHTML = "Passwords do not match!";
    else {
        const data = {name, email, password, phone}
        postData("/signUp", data)
        alert("Successful registration!")
        sessionStorage.setItem('registration', JSON.stringify(data));
        window.location.replace('/SignIn.html')
    }
}

function isEmpty(field) {
    return field === ""
}

const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST', credentials: 'same-origin', headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
        const res = await response.json();
    } catch (error) {
        console.log("error", error);
    }
};