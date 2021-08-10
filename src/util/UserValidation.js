import Instance from './axios';

// Basic Details

export const handleFullName = (e, setName, setValidation) => {
    let nameInput = e.target.value;

    if (nameInput.length === 0) {
        setName("")
        setValidation("Full name is required")
    } else if (nameInput.length >= 4) {
        setName(nameInput)
        setValidation("")
    } else {
        setValidation("Full name must be at least 4 characters")
        setName("")
    }
}

export const handleEmail = (e, setEmail, setValidation) => {
    let emailInput = e.target.value;

    if (emailInput.length === 0) {
        setEmail("")
        setValidation("Email is required")
    } else if (/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(emailInput)) {
        // Check if email is already in use
        Instance.get(`/user/checkExist/?email=${emailInput}`).then((response) => {
            if (response.status === 204) {
                setEmail(emailInput)
                setValidation("")
            } else {
                setEmail("")
                setValidation("This user already exists, please use another email address")
            }
          })
          .catch((error) => {
            setValidation("Sorry something went wrong, please try again")
          })
    } else {
        setEmail("")
        setValidation("Incorrect email format, should be in format: example@example.com")
    }
}

export const handlePhoneNumber = (e, setPhone, setValidation) => {
    let phoneInput = e.target.value;
    if (phoneInput.length === 0) {
        setPhone("")
        setValidation("Phone number is required")
    } else if (/^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/.test(phoneInput)) {
        Instance.get(`/user/checkExist/?mobile=${phoneInput}`).then((response) => {
            if (response.status === 204) {
                setPhone(phoneInput)
                setValidation("")
            } else {
                setPhone("")
                setValidation("This mobile number is already registered to another user, please use a different number")
            }
          })
          .catch((error) => {
            setValidation("Sorry something went wrong, please try again")
          })
    } else {
        setPhone("")
        setValidation("Incorrect phone number format")
    }
}

// End Basic Details


// Bank Details

export const handleCardName = (e, setCardName, setValidation) => {
    let nameInput = e.target.value

    if (nameInput.length === 0) {
        setCardName("")
        setValidation("Card Name is required")
    } else {
        setCardName(nameInput)
        setValidation("")
    }
}

export const handleCardNumber = (e, setCardNumber, setValidation) => {
    let numberInput = e.target.value

    if (numberInput.length === 0) {
        setCardNumber("")
        setValidation("Card Number is required")
    } else if (/\b\d{16}\b/.test(numberInput)) {
        setCardNumber(numberInput)
        setValidation("")
    } else {
        setCardNumber("")
        setValidation("Incorrect format for card number, should be in the format: 1234567890123456")
    }
}

export const handleExpiry = (e, setExpiry, setValidation) => {
    let expiryInput = e.target.value

    if (expiryInput.length === 0) {
        setExpiry("")
        setValidation("Expiry date is required")
    } else if (/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(expiryInput)) {
        setExpiry(expiryInput)
        setValidation("")
    } else {
        setExpiry("")
        setValidation("Incorrect format for card number, should be in the format: mm/yy, mmyy or mmyyyy")
    }
}

export const handleCcv = (e, setCcv, setValidation) => {
    let ccvInput = e.target.value

    if (ccvInput.length === 0) {
        setCcv("")
        setValidation("CCV is required")
    } else if (/\b\d{3}\b/.test(ccvInput)) {
        setCcv(ccvInput)
        setValidation("")
    } else {
        setCcv("")
        setValidation("Incorrect format for ccv, should be in the format: 123")
    }
}

export const handleAccNumber = (e, setAccNumber, setValidation) => {
    let accNumberInput = e.target.value

    if (accNumberInput.length === 0) {
        setAccNumber("")
        setValidation("Account number is required")
    } else if (/\b\d{8}\b/.test(accNumberInput)) {
        setAccNumber(accNumberInput)
        setValidation("")
    } else {
        setAccNumber("")
        setValidation("Incorrect format for account number")
    }
}

export const handleBsb = (e, setBsb, setValidation) => {
    let bsbInput = e.target.value

    if (bsbInput.length === 0) {
        setBsb("")
        setValidation("Account number is required")
    } else if (/\b\d{6}\b/.test(bsbInput)) {
        setBsb(bsbInput)
        setValidation("")
    } else {
        setBsb("")
        setValidation("Incorrect format for account number")
    }
}



// End Bank Details

// Start Location Details

export const handleAddress = (e, setAddress, setValidation) => {
    let addressInput = e.target.value;

    if (addressInput.length === 0) {
        setAddress("")
        setValidation("Address is required")
    } else if (/\d+\s[a-zA-Z]+/gi.test(addressInput)) {
        setAddress(addressInput)
        setValidation("")
    } else {
        setAddress("")
        setValidation("Incorrect address format, should be in format: 12 Example Street")
    }
}

export const handleCity = (e, setCity, setValidation) => {
    let cityInput = e.target.value;

    if (cityInput.length === 0) {
        setCity("")
        setValidation("City is required")
    } else if (/^([^0-9!@#$%^&*()]*)$/.test(cityInput) && cityInput.length >= 2) {
        setCity(cityInput)
        setValidation("")
    } else {
        setCity("")
        setValidation("Incorrect city format, should be in format: Brisbane")
    }
}

export const handleCountry = (e, setCountry, setValidation) => {
    let countryInput = e.target.value;

    if (countryInput.length === 0) {
        setCountry("")
        setValidation("Country is required")
    } else if (/^([^0-9!@#$%^&*()]*)$/.test(countryInput) && countryInput.length >= 4) {
        setCountry(countryInput)
        setValidation("")
    } else {
        setCountry("")
        setValidation("Incorrect country format, should be in format: Australia")
    }
}

export const handleState = (e, setState, setValidation) => {
    let stateInput = e.target.value;

    if (stateInput.length === 0) {
        setState("")
        setValidation("State is required")
    } else if (/^([^0-9!@#$%^&*()]*)$/.test(stateInput) && stateInput.length >= 3) {
        setState(stateInput)
        setValidation("")
    } else {
        setState("")
        setValidation("Incorrect state format, should be in format: Australia")
    }
}

// End location details