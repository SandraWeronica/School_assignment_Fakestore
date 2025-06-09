const inlogForm = document.getElementById("inlogForm");
const message = document.getElementById("message");
const createAccountButton = document.getElementById("createAccountButton");
const signUpForm = document.getElementById("signUpForm");

const toggleForm = () => {
  inlogForm.classList.toggle("hidden");
  signUpForm.classList.toggle("hidden");
};

const handleLogin = async (e) => {
  try {
    e.preventDefault();
    const username = e.target.elements.username.value.trim();
    const password = e.target.elements.password.value.trim();

    const response = await fetch("http://localhost:4000/users", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Ett fel uppstod, ta en fruktstund och återkom :).");
    }

    const users = await response.json();
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (!user) {
      alert("Fel användarnamn eller lösenord, vänligen försök igen.");
      throw new Error(
        "Ett fel uppstod vid inloggningen, vänligen försök igen."
      );
      return;
    }
    if (user) {
      location.href = "./user.html";

      const saveUser = {
        name: user.username,
        email: user.email,
        id: user.id,
      };
      localStorage.setItem("user", JSON.stringify(saveUser));
      if (saveUser.user === "user") {
        location.href = "./user.html";
      }
    }
  } catch (error) {
    message.textContent = error.message;
    console.error("An error occured", error);
  }
};

const handleSignUp = async (e) => {
  try {
    e.preventDefault();
    const username = e.target.elements.username.value.trim();
    const password = e.target.elements.password.value.trim();
    const email = e.target.elements.email.value.trim();
    const confirmPassword = e.target.elements.confirmPassword.value.trim();

    if (await checkIfEmailExists(email)) {
      alert("Konto för denna email finns redan");
      throw new Error("Konto för denna email finns redan");
      return;
    }
    if (await checkIfUsernameExists(username)) {
      alert("En användare med detta namn finns redan, vänligen välj ett annat");
      throw new Error(
        "Konto med detta användarnamn finns redan, vänligen välj ett annat."
      );
      return;
    }
    if (password !== confirmPassword) {
      alert("Lösenordet stämmer inte överens, vänligen försök igen.");
      return;
    }

    const response = await fetch("http://localhost:4000/users", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        role: "user",
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Något gick fel, ta ett glas vatten och åtterkom");
    }
    alert("Ditt konto har skapats, välkommen in i värmen!");
    toggleForm();
  } catch (error) {
    console.error("An error occurred", error);
  }
};

const checkIfEmailExists = async (newEmail) => {
  try {
    const response = await fetch("http://localhost:4000/users", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Det finns redan ett konto kopplat till denna mail.");
    }

    const users = await response.json();
    const user = users.find((user) => user.email === newEmail);
    if (user) {
      return true;
    }
    return false;
  } catch {
    console.error("An error occured", error);
    return false;
  }
};

const checkIfUsernameExists = async (newUsername) => {
  try {
    const response = await fetch("http://localhost:4000/users", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(
        "Detta användarnamn är upptaget, vänligen välj ett nytt."
      );
    }

    const users = await response.json();
    const user = users.find((user) => user.username === newUsername);
    if (user) {
      return true;
    }
    return false;
  } catch {
    console.error("An error occured", error);
    return false;
  }
};

inlogForm.addEventListener("submit", handleLogin);
createAccountButton.addEventListener("click", toggleForm);
signUpForm.addEventListener("submit", handleSignUp);
