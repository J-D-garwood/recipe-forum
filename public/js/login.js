const login = document.querySelector("#login");
const signUp = document.querySelector("#signUp");

const userLogin = async (event) => {
    event.preventDefault();
    const email = document.querySelector("#email_login").value.trim();
    const password = document.querySelector("#password_login").value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json'}
        });

        if (response.ok) {
            //redirect user to profile
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

const userSignUp = async (event) => {
    event.preventDefault();
    const name = document.querySelector("#name_signup").value.trim();
    const email = document.querySelector("#email_signup").value.trim();
    const password = document.querySelector("#password_signup").value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password}),
            headers: { 'Content-Type': 'application/json' },
        })
        console.log(response);
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document
        .querySelector(".login")
        .addEventListener('submit', userLogin);
document
        .querySelector(".signUp")
        .addEventListener('submit', userSignUp);