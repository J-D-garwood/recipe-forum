const login = document.querySelector(".login");
const signUp = document.querySelector(".signUp");

const userLogin = async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

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

    const name = document.querySelector("#firstName").value.trim() + " " + document.querySelector('#lastName').value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password}),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

login.addEventListener('submit', userLogin);
signUp.addEventListener('submit', userSignUp);