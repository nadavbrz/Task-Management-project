export const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const isValidLength = password.length >= 8;
    if (!hasUpperCase || !isValidLength) {
      return "Password must contain at least 8 characters and one uppercase letter.";
    }
    return "";
  };

  export const validateEmail = (email)=>{
    const emailLengthValid = email.length > 3
    if(!emailLengthValid){
        return "Invalid Email"
    } 
  }

  export const validateUsername = (username)=>{
    const trimmedUsername = username.trim()
    const usernameLengthValid = trimmedUsername.length > 3
    if(!usernameLengthValid){
        return "Invalid Username"
    }
  }