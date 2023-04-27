/********w************
    
	Project 4 Javascript
	Name: Stanley Llaguno
	Date: 2023/04/09
	Description: All you have to do is add code to formvalidate.js. 
	Code should be indented appropriately. All other coding practices are up to the discretion of your instructor and will be covered in class.
	Before you start coding, study the markup and look for the different classes and ids assigned to the elements. 

	Tasks

	1. Ensure that at least one product has been added to the shopping cart.
	2. Validate the shipping and payment fields.  If any errors are made during the form submission process, the appropriate error should be displayed (check the markup and demos). 


*********************/

//CONST VARIABLES DECLARED
const itemDescription = ["AIR Nike DIOR", "Retro Jordan Chicago", "AJ OF Blue", "AJ OF BY", "AJ J-Balvin"];
const itemPrice = [18899.99, 12000.99, 199.99, 199.99, 199.99];
const itemImage = ["mac.png", "mouse.png", "wdehd.png", "nexus.png", "drums.png"];
let numberOfItemsInCart = 0;
let orderTotal = 0;


/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
	// Hides all error elements on the page
	hideErrors();

	// Determine if the form has errors
	if (formHasErrors()) {
		// Prevents the form from submitting
		e.preventDefault();

		// When using onSubmit="validate()" in markup, returning false would prevent
		// the form from submitting
		return false;
	}

	// When using onSubmit="validate()" in markup, returning true would allow
	// the form to submit
	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Clear order?')) {
		// Ensure all error fields are hidden
		hideErrors();

		// Set focus to the first text field on the page
		document.getElementById("qty1").focus();

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();
	return false;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {
	// Determine if any items are in the cart
	// When the cart has not items, submission of form is halted
	if (numberOfItemsInCart == 0) {
		// Display an error message contained in a modal dialog element
		const modal = document.querySelector("#cartError");
		modal.showModal();

		const closeModal = document.querySelector(".close-button");
		closeModal.addEventListener("click", () => {
			modal.close();
			document.getElementById("qty1").focus();
		});

		// Form has errors
		return true;
	}

	let errorFlag = false;

	/*
	* SHIPPING INFORMATION VALIDATES
	* Validate the customer’s shipping information (All of the field are required)
	*/
	// Check if Full Name field is empty
	const fullNameInput = document.getElementById('fullname');
	if (fullNameInput.value.trim() === '') {
		// Full Name is empty, display error message and set focus on field
		document.getElementById('fullname_error').style.display = 'block';
		fullNameInput.focus();

		// Form has errors
		errorFlag = true;
	}

	// Check if Address field is empty
	const addressInput = document.getElementById('address');
	if (addressInput.value.trim() === '') {
		// Address is empty, display error message and set focus on field
		document.getElementById('address_error').style.display = 'block';
		addressInput.focus();

		// Form has errors
		errorFlag = true;
	}

	// Check if City field is empty
	const cityInput = document.getElementById('city');
	if (cityInput.value.trim() === '') {
		// City is empty, display error message and set focus on field
		document.getElementById('city_error').style.display = 'block';
		cityInput.focus();

		// Form has errors
		errorFlag = true;
	}

	// Check if Postal Code field is empty or invalid format
	const postalInput = document.getElementById('postal');
	const postalFormat = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
	if (postalInput.value.trim() === '') {
		// Postal Code is empty, display error message and set focus on field
		document.getElementById('postal_error').style.display = 'block';
		postalInput.focus();

		// Form has errors
		errorFlag = true;

	} else if (!postalInput.value.match(postalFormat)) {
		// Postal Code is in invalid format, display error message and set focus on field
		document.getElementById('postalformat_error').style.display = 'block';
		postalInput.focus();

		// Form has errors
		errorFlag = true;
	}

	// Check if Email field is empty or invalid format
	const emailInput = document.getElementById('email');
	const emailFormat = /^\S+@\S+\.\S+$/;
	if (emailInput.value.trim() === '') {
		// Email is empty, display error message and set focus on field
		document.getElementById('email_error').style.display = 'block';
		emailInput.focus();

		// Form has errors
		errorFlag = true;
	} else if (!emailInput.value.match(emailFormat)) {
		// Email is in invalid format, display error message and set focus on field
		document.getElementById('emailformat_error').style.display = 'block';
		emailInput.focus();

		// Form has errors
		errorFlag = true;
	}

	/*
	* PAYMENT INFORMATION VALIDATION
	* Validate the customer’s payment information(All of the field are required)
	*/
	// Check if Card Type is selected
	const cardTypeInputs = document.querySelectorAll("#cardTypes input[type=radio]");
	let cardTypeSelected = false;
	for (let i = 0; i < cardTypeInputs.length; i++) {
		if (cardTypeInputs[i].checked) {
			cardTypeSelected = true;
			break;
		}
	}
	if (!cardTypeSelected) {
		// Card Type is not selected, display error message
		document.getElementById("cardtype_error").style.display = "block";

		// Form has errors
		errorFlag = true;
	}

	// Check if Name on Card field is empty
	const nameOnCardInput = document.getElementById('cardname');
	if (nameOnCardInput.value.trim() === '') {
		// Name on Card is empty, display error message and set focus on field
		document.getElementById('cardname_error').style.display = 'block';
		nameOnCardInput.focus();

		// Form has errors
		errorFlag = true;
	}

	const expiryMonthInput = document.getElementById('month');
	if (expiryMonthInput.value === '- Month -') {
		// Expiry Month is not selected, display error message and set focus on field
		document.getElementById('month_error').style.display = 'block';
		expiryMonthInput.focus();

		// Form has errors
		errorFlag = true;
	}

	// Check if Expiry Year field is empty or invalid
	const expiryYearInput = document.getElementById("year");
	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth();
	const expiryYear = parseInt(expiryYearInput.value);
	if (!expiryYear || expiryYear < currentYear) {
		// Expiry Year is not selected or invalid, display error message
		document.getElementById("expiry_error").style.display = "block";
		expiryYearInput.focus();

		// Form has errors
		errorFlag = true;
	}

	// Check if Expiry Date is valid
	console.log(currentMonth);
	console.log(expiryMonthInput.value);
	console.log(expiryYearInput.value + "-" + currentYear);


	if (parseInt(expiryYearInput.value) == parseInt(currentYear) && parseInt(expiryMonthInput.value) < parseInt(currentMonth) + 1) {
		// Expiry Year is not selected or invalid, display error message
		console.log("Invalid expire date");
		document.getElementById("expiry_error").style.display = "block";
		expiryYearInput.focus();

		// Form has errors
		errorFlag = true;
	}

	// Check if Card Number field is empty or not 10 digits
	const cardNumberInput = document.getElementById("cardnumber");
	const cardNumber = cardNumberInput.value.trim();
	if (cardNumber === "") {
		document.getElementById("cardnumber_error").style.display = "block";
		cardNumberInput.focus();
		errorFlag = true;
	} else if (cardNumber.length < 10) {
		document.getElementById("invalidcard_error").style.display = "block";
		cardNumberInput.focus();
		errorFlag = true;
	}

	else {

		//MODULUS CHECK LOGIC
		const checkingFactors = [4, 3, 2, 7, 6, 5, 4, 3, 2];
		let sum = 0;
		for (let i = 0; i < checkingFactors.length; i++) {
			sum += checkingFactors[i] * parseInt(cardNumber[i]);
		}
		const remainder = sum % 11;
		const checkDigit = remainder === 0 ? 0 : 11 - remainder;
		if (checkDigit !== parseInt(cardNumber[9])) {
			document.getElementById("invalidcard_error").style.display = "block";
			cardNumberInput.focus();
			errorFlag = true;
		}
	}

	// No errors found
	return errorFlag;
}

/*
 * Adds an item to the cart and hides the quantity and add button for the product being ordered.
 *
 * param itemNumber The number used in the id of the quantity, item and remove button elements.
 */
function addItemToCart(itemNumber) {
	// Get the value of the quantity field for the add button that was clicked 
	let quantityValue = trim(document.getElementById("qty" + itemNumber).value);

	// Determine if the quantity value is valid
	if (!isNaN(quantityValue) && quantityValue != "" && quantityValue != null && quantityValue != 0 && !document.getElementById("cartItem" + itemNumber)) {
		// Hide the parent of the quantity field being evaluated
		document.getElementById("qty" + itemNumber).parentNode.style.visibility = "hidden";

		// Determine if there are no items in the car
		if (numberOfItemsInCart == 0) {
			// Hide the no items in cart list item 
			document.getElementById("noItems").style.display = "none";
		}

		// Create the image for the cart item
		let cartItemImage = document.createElement("img");
		cartItemImage.src = "images/" + itemImage[itemNumber - 1];
		cartItemImage.alt = itemDescription[itemNumber - 1];

		// Create the span element containing the item description
		let cartItemDescription = document.createElement("span");
		cartItemDescription.innerHTML = itemDescription[itemNumber - 1];

		// Create the span element containing the quanitity to order
		let cartItemQuanity = document.createElement("span");
		cartItemQuanity.innerHTML = quantityValue;

		// Calculate the subtotal of the item ordered
		let itemTotal = quantityValue * itemPrice[itemNumber - 1];

		// Create the span element containing the subtotal of the item ordered
		let cartItemTotal = document.createElement("span");
		cartItemTotal.innerHTML = formatCurrency(itemTotal);

		// Create the remove button for the cart item
		let cartItemRemoveButton = document.createElement("button");
		cartItemRemoveButton.setAttribute("id", "removeItem" + itemNumber);
		cartItemRemoveButton.setAttribute("type", "button");
		cartItemRemoveButton.innerHTML = "Remove";
		cartItemRemoveButton.addEventListener("click",
			// Annonymous function for the click event of a cart item remove button
			function () {
				// Removes the buttons grandparent (li) from the cart list
				this.parentNode.parentNode.removeChild(this.parentNode);

				// Deteremine the quantity field id for the item being removed from the cart by
				// getting the number at the end of the remove button's id
				let itemQuantityFieldId = "qty" + this.id.charAt(this.id.length - 1);

				// Get a reference to quanitity field of the item being removed form the cart
				let itemQuantityField = document.getElementById(itemQuantityFieldId);

				// Set the visibility of the quantity field's parent (div) to visible
				itemQuantityField.parentNode.style.visibility = "visible";

				// Initialize the quantity field value
				itemQuantityField.value = "";

				// Decrement the number of items in the cart
				numberOfItemsInCart--;

				// Decrement the order total
				orderTotal -= itemTotal;

				// Update the total purchase in the cart
				document.getElementById("cartTotal").innerHTML = formatCurrency(orderTotal);

				// Determine if there are no items in the car
				if (numberOfItemsInCart == 0) {
					// Show the no items in cart list item 
					document.getElementById("noItems").style.display = "block";
				}
			},
			false
		);

		// Create a div used to clear the floats
		let cartClearDiv = document.createElement("div");
		cartClearDiv.setAttribute("class", "clear");

		// Create the paragraph which contains the cart item summary elements
		let cartItemParagraph = document.createElement("p");
		cartItemParagraph.appendChild(cartItemImage);
		cartItemParagraph.appendChild(cartItemDescription);
		cartItemParagraph.appendChild(document.createElement("br"));
		cartItemParagraph.appendChild(document.createTextNode("Quantity: "));
		cartItemParagraph.appendChild(cartItemQuanity);
		cartItemParagraph.appendChild(document.createElement("br"));
		cartItemParagraph.appendChild(document.createTextNode("Total: "));
		cartItemParagraph.appendChild(cartItemTotal);

		// Create the cart list item and add the elements within it
		let cartItem = document.createElement("li");
		cartItem.setAttribute("id", "cartItem" + itemNumber);
		cartItem.appendChild(cartItemParagraph);
		cartItem.appendChild(cartItemRemoveButton);
		cartItem.appendChild(cartClearDiv);

		// Add the cart list item to the top of the list
		let cart = document.getElementById("cart");
		cart.insertBefore(cartItem, cart.childNodes[0]);

		// Increment the number of items in the cart
		numberOfItemsInCart++;

		// Increment the total purchase amount
		orderTotal += itemTotal;

		// Update the total puchase amount in the cart
		document.getElementById("cartTotal").innerHTML = formatCurrency(orderTotal);
	}
}

/*
 * Hides all of the error elements.
 */
function hideErrors() {
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for (let i = 0; i < error.length; i++) {
		// Hide the error element by setting its display style to "none"
		error[i].style.display = "none";
	}
}

// HIDE ALL ERRORS DISPLAYED
window.onload = hideErrors;

/*
 * Handles the load event of the document.
 */
function load() {
	//	Populate the year select with up to date values
	let year = document.getElementById("year");
	let currentDate = new Date();
	for (let i = 0; i < 7; i++) {
		let newYearOption = document.createElement("option");
		newYearOption.value = currentDate.getFullYear() + i;
		newYearOption.innerHTML = currentDate.getFullYear() + i;
		year.appendChild(newYearOption);
	}

	// Add event listener for the form submit
	document.getElementById("orderform").addEventListener("submit", validate);
	document.getElementById("clear").addEventListener("click", resetForm);

}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);

/*
*
*/
document.addEventListener("DOMContentLoaded", function () {

	document.getElementById("addMac").addEventListener("click", function () {
		addItemToCart("1");
	});
	document.getElementById("addMouse").addEventListener("click", function () {
		addItemToCart("2");
	});
	document.getElementById("addWD").addEventListener("click", function () {
		addItemToCart("3");
	});
	document.getElementById("addNexus").addEventListener("click", function () {
		addItemToCart("4");
	});
	document.getElementById("addDrums").addEventListener("click", function () {
		addItemToCart("5");
	});
});


















