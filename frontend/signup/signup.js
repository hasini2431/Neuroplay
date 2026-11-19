const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const age = Number(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const message = document.getElementById("message");

    // VALIDATION

    if (username.length < 6) {
        message.textContent = "Username must contain at least 6 characters.";
        return;
    }

    if (password.length < 6) {
        message.textContent = "Password must contain at least 6 characters.";
        return;
    }

    if (age < 7 || age > 17) {
        message.textContent = "Age must be between 7 and 17.";
        return;
    }

    if (!gender) {
        message.textContent = "Please select your gender.";
        return;
    }

    const user = {
        username: username,
        password: password,
        age: age,
        gender: gender
    };

    try {

        message.style.color = "blue";
        message.textContent = "Creating your account...";

        const response = await fetch(
           "https://neuroplay.onrender.com/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }
        );

        const result = await response.json();

        console.log("Signup response:", result);

        if (!response.ok) {

            message.style.color = "red";
            message.textContent =
                result.detail || "Registration failed.";

            return;
        }

        // SAVE STUDENT DETAILS

        const loggedInUser = {
            user_id: result.user_id,
            username: username,
            age: age,
            gender: gender
        };

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(loggedInUser)
        );

        localStorage.setItem(
            "neuroplayUser",
            JSON.stringify(loggedInUser)
        );

        message.style.color = "green";

        message.textContent =
            "Account created successfully! Starting your adventure...";

        console.log("Saved student:", loggedInUser);

        // REDIRECT DIRECTLY TO GAME

        window.location.replace("../game/game.html");

    }

    catch (error) {

        console.error("Signup error:", error);

        message.style.color = "red";

        message.textContent =
            "Unable to connect to the server. Please start the backend.";

    }

});
