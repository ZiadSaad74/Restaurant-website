function saturday() {
    let element1 = document.getElementById('mealImage');
    element1.src = 'images/days_meals/saturdayMeal.jpg';
    let element2 = document.getElementById('MealDescrip');
    element2.innerHTML = 'Grilled beef with onion slices <br><del class="old_price">100$</del>80$';
}

function sunday() {
    let element1 = document.getElementById('mealImage');
    element1.src = 'images/days_meals/sundayMeal.jpg';
    let element2 = document.getElementById('MealDescrip');
    element2.innerHTML = 'Pasta with meatballs <br><del class="old_price">120$</del>100$';
}

function monday() {
    let element1 = document.getElementById('mealImage');
    element1.src = 'images/days_meals/mondayMeal.jpg';
    let element2 = document.getElementById('MealDescrip');
    element2.innerHTML = 'chicken and red wine <br><del class="old_price">220$</del>170$';
}

function tuesday() {
    let element1 = document.getElementById('mealImage');
    element1.src = 'images/days_meals/tuesdayMeal.jpg';
    let element2 = document.getElementById('MealDescrip');
    element2.innerHTML = 'shrimp and vegetables <br><del class="old_price">200$</del>180$';
}

function wednsday() {
    let element1 = document.getElementById('mealImage');
    element1.src = 'images/days_meals/wednsdayMeal.jpg';
    let element2 = document.getElementById('MealDescrip');
    element2.innerHTML = 'salad and chicken <br><del class="old_price">100$</del>90$';
}

function thursday() {
    let element1 = document.getElementById('mealImage');
    element1.src = 'images/days_meals/thursdayMeal.jpg';
    let element2 = document.getElementById('MealDescrip');
    element2.innerHTML = 'sea food pizza <br><del class="old_price">150$</del>120$';
}

function friday() {
    let element1 = document.getElementById('mealImage');
    element1.src = 'images/days_meals/fridayMeal.jpg';
    let element2 = document.getElementById('MealDescrip');
    element2.innerHTML = 'Burger meal and beer <br><del class="old_price">170$</del>150$';
}

document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
    let user = sessionStorage.getItem('loginInfo');
    if (user !== null) {
        user = JSON.parse(user);
        console.log(user);
        reservationFill(user);
    }
});
document.getElementById("reservationButton").addEventListener("click", onclick)

function reservationFill(user) {
    document.getElementById("resevationName").value = user.name;
    document.getElementById("reservationEmail").value = user.email;
    document.getElementById("reservationPnone").value = user.phone;
}

function onclick() {
    let error = document.getElementById("error-msg");
    let bookingName = document.getElementById("resevationName").value;
    let bookingEmail = document.getElementById("reservationEmail").value;
    let bookingDate = document.getElementById("reservationDate").value;
    let bookingPhone = document.getElementById("reservationPnone").value;
    let bookingGroup = document.getElementById("reservationGroup");
    let bookingTime = document.getElementById("reservationTime");
    if (isEmpty(bookingName)||isEmpty(bookingEmail)||isEmpty(bookingDate) || isEmpty(bookingPhone) || isEmpty(bookingGroup.value) || isEmpty(bookingTime.value)) error.innerHTML = "Please enter valid information!";
    else {
        bookingGroup = bookingGroup.options[bookingGroup.selectedIndex].text;
        bookingTime = bookingTime.options[bookingTime.selectedIndex].text;
        const data = {bookingName, bookingEmail, bookingDate, bookingPhone, bookingGroup, bookingTime}
        postData("/booking", data);
        alert("Successful booking!");
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
