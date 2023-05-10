document.addEventListener('DOMContentLoaded', (event) => {

    let x = sessionStorage.getItem('registration');
    x = JSON.parse(x)
    document.getElementById("email").value = x.email;
    document.getElementById("password").value = x.password;
    console.log(JSON.parse(x))
    event.preventDefault();
});


document.getElementById("signin-btn").addEventListener("click", onclick)

function onclick() {
    let error = document.getElementById("error-msg");

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if (isEmpty(email) || isEmpty(password)) {
        error.innerHTML = "Please enter your information!";
    }


    const response = postData("/login", {email, password})


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
        console.log(res)
        if (res.hasOwnProperty("msg")) {
            let error = document.getElementById("error-msg");
            error.innerHTML = res.msg;

        } else {
            sessionStorage.setItem('loginInfo', JSON.stringify(res));
            alert("Welcome, " + res.name)
            window.location.replace(`/Home.html`)
            return res;
        }

    } catch (error) {
        console.log("error", error);
    }
};