const inputs = document.querySelectorAll(
  "input[type='text'], input[type='password'] "
);

const progressBar = document.getElementById("progress-bar");
const form = document.querySelector("form");

let pseudo, email, password, confirmPassword;

const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector(`.${tag}-container`);
  const span = document.querySelector(`.${tag}-container > span`);

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

const pseudoChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("pseudo", "Le pseudo doit faire entre 3 et 20 caractères");
    pseudo = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "pseudo",
      "Le pseudo ne doit pas contenir de caractères spéciaux"
    );
    pseudo = null;
  } else {
    errorDisplay("pseudo", "", true);
    pseudo = value;
  }
};

const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Le format de l'email est incorrect.");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

const passwordChecker = (value) => {
  progressBar.classList = "";
  if (
    !value.match(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    )
  ) {
    errorDisplay(
      "password",
      "Minimum 8 caractères, un chiffre, une majuscule et un caractère spécial."
    );
    password = null;
    progressBar.classList.add("progressRed");
  } else if (value.length < 12) {
    errorDisplay("password", "", true);
    password = value;
    progressBar.classList.add("progressBlue");
  } else {
    errorDisplay("password", "", true);
    password = value;
    progressBar.classList.add("progressGreen");
  }

  confirmPasswordChecker(inputs[3].value);
};

const confirmPasswordChecker = (value) => {
  if (value !== password) {
    errorDisplay(
      "confirmPassword",
      "Les deux mots de passes doivent être identiques et valides"
    );
    confirmPassword = false;
  } else {
    errorDisplay("confirmPassword", "", true);
    confirmPassword = true;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "pseudo":
        pseudoChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "password":
        passwordChecker(e.target.value);
        break;
      case "confirmPassword":
        confirmPasswordChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (pseudo && email && password && confirmPassword) {
    const data = {
      pseudo,
      email,
      password,
    };
    alert("Inscription validée");
    pseudo = null;
    email = null;
    password = null;
    confirmPassword = null;

    inputs.forEach((input) => (input.value = ""));
    progressBar.classList = "";
    console.log(data);
  } else {
    alert("Le formulaire n'est pas correctement rempli!");
  }
});
