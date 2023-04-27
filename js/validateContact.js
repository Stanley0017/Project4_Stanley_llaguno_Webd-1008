function validateContact() {
    var nameInput = document.getElementById("name");
    var phoneInput = document.getElementById("phone");
    var emailInput = document.getElementById("email");
    var commentsInput = document.getElementById("comments");

    var nameError = document.getElementById("name-error");
    var phoneError = document.getElementById("phone-error");
    var emailError = document.getElementById("email-error");
    var commentsError = document.getElementById("comments-error");

    var isValid = true;

    if (nameInput.value == "") {
        nameError.style.display = "block";
        nameInput.focus();
        nameInput.select();
        isValid = false;
    } else {
        nameError.style.display = "none";
    }

    if (!phoneInput.value.match(/^\d{10}$/)) {
        phoneError.style.display = "block";
        phoneInput.focus();
        phoneInput.select();
        isValid = false;
    } else {
        phoneError.style.display = "none";
    }

    if (!emailInput.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        emailError.style.display = "block";
        emailInput.focus();
        emailInput.select();
        isValid = false;
    } else {
        emailError.style.display = "none";
    }

    if (commentsInput.value == "") {
        commentsError.style.display = "block";
        commentsInput.focus();
        commentsInput.select();
        isValid = false;
    } else {
        commentsError.style.display = "none";
    }

    return isValid;
}
