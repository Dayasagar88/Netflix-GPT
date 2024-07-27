export const validateEmailOrPhone = (input) => {


    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(input);
    const isNumberValid = /^[0-9]{10}$/.test(input);

    return isEmailValid || isNumberValid;
}
export const validatePassword = (input) => {

    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(input);

    return isPasswordValid;
}
export const validateName = (input) => {
     const isNameValid = /([a-zA-Z_\s]+)/.test(input);

     return isNameValid;
}