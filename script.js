const passwordBox = document.getElementById("password");
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = "`~!@#$%^&*()_-=+|[]}{;:/?.,'"
const strengthText = document.getElementById("strength");
const strengthFill = document.querySelector(".strength-fill");

function createPassword(){
    let password = "";
 
    const length = Number(document.getElementById("length").value);
    const hasUpper = document.getElementById("uppercase").checked;
    const hasLower = document.getElementById("lowercase").checked;
    const hasNumber = document.getElementById("number").checked;
    const hasSymbol = document.getElementById("symbol").checked;

    console.log(hasUpper, hasLower, hasNumber, hasSymbol);

    let allChar = "";

    if(hasUpper) allChar += upperCase;
    if(hasLower) allChar += lowerCase;
    if(hasNumber) allChar += number;
    if(hasSymbol) allChar += symbol;
    
    if (allChar === ""){
        alert("Select at least one option!");
        return;
    }

    while(length > password.length){
        password += allChar[Math.floor(Math.random() * allChar.length)];
    }

    passwordBox.value = password;
    updateStrength(password); 
}

function copyPassword(){
    passwordBox.select();
    navigator.clipboard.writeText(passwordBox.value);
}

function toggleDefault(){
    const defaultBox = document.getElementById("default");
    const upper = document.getElementById("uppercase");
    const lower = document.getElementById("lowercase");
    const number = document.getElementById("number");
    const symbol = document.getElementById("symbol");

    if(defaultBox.checked){
        upper.checked = true;
        lower.checked = true;
        number.checked = true;
        symbol.checked = true;

        upper.disabled = true;
        lower.disabled = true;
        number.disabled = true;
        symbol.disabled = true;
    }else{
        upper.disabled = false;
        lower.disabled = false;
        number.disabled = false;
        symbol.disabled = false;
    }
}

function updateStrength(password){
    if(!password){
        strengthText.textContent = "Strength : ----";
        strengthFill.style.width= "0%";

        return;
    }
    const strength = checkStrength(password);

 //Weak
    if(strength === "weak"){
        strengthText.textContent = "Strength : Weak";
        strengthText.className = "weak";
        strengthFill.style.width = "30%";
        strengthFill.style.background = "#ef4444";
    }

 //Medium
    else if(strength === "medium"){
        strengthText.textContent = "Strength : Medium";
        strengthText.className = "medium";
        strengthFill.style.width = "60%";
        strengthFill.style.background = "#eab308";
    }

 //Strong
    else if(strength === "strong"){
        strengthText.textContent = "Strength : Strong";
        strengthText.className = "strong";
        strengthFill.style.width = "90%";
        strengthFill.style.background = "#22c55e";
    }

 //Bulletproof!
    else if(strength === "bulletproof"){
        strengthText.textContent = "Strength : Bulletproof!";
        strengthText.className = "bulletproof";
        strengthFill.style.width = "100%";
        strengthFill.style.background = "#003f17";
    }
}

function checkStrength(password){
    let types = 0;
     
    if(/[A-Z]/.test(password)) types++;
    if(/[a-z]/.test(password)) types++;
    if(/[0-9]/.test(password)) types++;
    if(/[^A-Za-z0-9]/.test(password)) types++;

    let repeated = false;
    for(let char of password){
    let count = password.split(char).length -1;
    if(count > password.length * 0.5){
        repeated = true;
        break;
    }
   }

    if(repeated){
        return "weak";
    }
    const commonPasswords = ["12345678","00000000","11111111","admin","qwer1234","password","abcdef"];

    for(let pattern of commonPasswords){
    if(password.toLowerCase().includes(pattern)){
        return "weak";
       }
    }

  //Weak
   if(password.length < 8){
    return "weak";
   }

 //Bulletproof
  if (password.length >= 13 && types >= 3 || password.length >= 20 && types >= 2) {
    return "bulletproof";
  }

 //Strong
  if (password.length >= 8 && types >= 4 || password.length >= 9 && types >= 2) {
    return "strong";
  }

 //Medium
  return "medium"; 
}
passwordBox.addEventListener("input", () => {
    updateStrength(passwordBox.value);
});


window.onload = () => {
    toggleDefault();
    updateStrength(passwordBox.value);
}
