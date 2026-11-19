const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Get login details
    const username = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value;

    const message = document.getElementById("message");

    // Check empty fields
    if (username === "" || password === "") {

        message.textContent = "Please fill in all fields.";

        return;
    }

    try {

        message.style.color = "blue";

        message.textContent = "Checking your account...";

        // Prepare login data
        const loginData = {

            username: username,

            password: password

        };

        // Send login request to FastAPI
        const response = await fetch("http://127.0.0.1:8000/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(loginData)

        });

        const result = await response.json();

        // Check login response
        if (!response.ok) {

            message.style.color = "red";

            message.textContent =
                result.detail || "Invalid username or password.";

            return;
        }

        // Login successful
        message.style.color = "green";

        message.textContent = "Login successful!";

        // Get user details from backend
        const loggedInUser = result.user;

        // Save only basic user details in localStorage
        // Password is NOT stored here
        localStorage.setItem(

            "loggedInUser",

            JSON.stringify(loggedInUser)

        );

        // Redirect to game page
        setTimeout(function () {

            window.location.href = "../game/game.html";

        }, 700);

    }

    catch (error) {

        console.error("Login error:", error);

        message.style.color = "red";

        message.textContent =
            "Unable to connect to the server. Please start the backend.";

    }

});