const login = document.querySelector(/*input login form query class*/);
const signUp = document.querySelector(/*input signup form query class*/);

const userLogin = async (event) => {
    event.preventDefault();

    const email = document.querySelector(/*input login query id*/).value.trim();
    const password = document.querySelector(/*input password query id*/).value.trim();

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

    const name = document.querySelector(/*input name signup query id*/).value.trim();
    const email = document.querySelector(/*input email signup query id*/).value.trim();
    const password = document.querySelector(/*input password signup query id*/).value.trim();

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