const navTextItems = document.querySelectorAll('header .nav_text li a');
navTextItems.forEach(item => {
    item.classList.remove('active');
});

// Change bth login-regis
const formLogin = document.querySelector('.login_wr');
const formRegis = document.querySelector('.regis_wr');
const loginBtnChange = document.querySelector('.two_form-wr .btn_change .btn.login');
const regisBtnChange = document.querySelector('.two_form-wr .btn_change .btn.regis');
loginBtnChange.addEventListener('click', () => {
    regisBtnChange.classList.remove('active');
    loginBtnChange.classList.add('active');
    formRegis.classList.remove('active');
    formLogin.classList.add('active');
})
regisBtnChange.addEventListener('click', () => {
    loginBtnChange.classList.remove('active');
    regisBtnChange.classList.add('active');
    formLogin.classList.remove('active');
    formRegis.classList.add('active');
})

// Validate form
document.querySelector('.login-btn').onclick = function(e){
    e.preventDefault();
}
document.querySelector('.regis-btn').onclick = function(e){
    
}

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnRegis = $(".regis-btn");
const inputsLog = $$(".login_wr input");
const inputsRegis = $$(".regis_wr input");
const phoneNumLog = $(".login_wr .phone-num");
const phoneNumRegis = $(".regis_wr .phone-num");
const passwordLog = $(".login_wr .pw");
const passwordRegis = $(".regis_wr .pw");
const cfPass = $(".cf-pw");

function seeError(input, message) {
  let parent = input.parentElement;
  let sibling = input.nextElementSibling;
  let nextSibling = sibling.nextElementSibling;
  parent.classList.add("error");
  sibling.classList.add("error");
  nextSibling.innerText = message;
}

function seeSuccess(input) {
  let parent = input.parentElement;
  let sibling = input.nextElementSibling;
  let nextSibling = sibling.nextElementSibling;
  parent.classList.remove("error");
  sibling.classList.remove("error");
  sibling.classList.add("sucess");
  nextSibling.innerText = null;
}

function checkPhoneNumber(input) {
    let isEmty = true;
    let phoneNumReg = /^0\d{9}$/;
    if (!phoneNumReg.test(input.value)) {
      seeError(input, "Số điện thoại không hợp lệ!");
      isEmty = false;
    } else {
      seeSuccess(input);
    }
    return isEmty;
}

function checkPassword(input) {
  let isEmty = true;
  if(input.value.trim() === '') {
    seeError(input, 'Vui lòng nhập mật khẩu!');
    isEmty = false;
  } else {
    seeSuccess(input);
  }
  return isEmty;
}

function checkPasswordCfError(input) {
  let isEmty = true;
  if (passwordRegis.value !== cfPass.value) {
    seeError(input, "Mật khẩu không trùng khớp");
    isEmty = false;
  } else {
    seeSuccess(input);
  }
  return isEmty;
}

btnRegis.onclick = function (e) {
  e.preventDefault();
  let phoneEmty = phoneNumRegis.value.trim() === '';
  let pwEmty = passwordRegis.value.trim() === '';
  let cfPwEmty = cfPass.value.trim() === '';
  if(phoneEmty || pwEmty || cfPwEmty){
    if(phoneEmty) {
      seeError(phoneNumRegis, 'Vui lòng nhập số điện thoại!');
    } else {
      checkPhoneNumber(phoneNumRegis);
    }
    if(pwEmty) {
      seeError(passwordRegis, 'Vui lòng nhập mật khẩu!');
    } else {
      seeSuccess(passwordRegis);
    }
    if(cfPwEmty) {
      seeError(cfPass, 'Vui lòng xác nhận mật khảu!')
    } else {
      checkPasswordCfError(cfPass);
    }
  } else if(checkPhoneNumber(phoneNumRegis) && checkPassword(passwordRegis) && checkPasswordCfError(cfPass)){
    let phoneNumStore = phoneNumRegis.value.trim();
    let pwStore = passwordRegis.value.trim();

    const accounts = JSON.parse(sessionStorage.getItem('accounts') || "[]");

    const existingAcount = accounts.find((account) => account.phoneNumStored === phoneNumStore);

    if(existingAcount){
      seeError(phoneNumRegis, "Số điện thoại đã tồn tại!")
    } else {
      seeSuccess(phoneNumLog);
      accounts.push({phoneNumStored: phoneNumStore, pwStored: pwStore});
      sessionStorage.setItem("accounts", JSON.stringify(accounts));
      alert('Đăng kí tài khoản thành công!');
    }
  }
};

const btnLogin = document.querySelector('.login-btn')
btnLogin.onclick = function (e) {
  e.preventDefault();
  let phoneEmty = phoneNumLog.value.trim() === '';
  let pwEmty = passwordLog.value.trim() === '';
  if (phoneEmty || pwEmty) {
    if (phoneEmty) {
      seeError(phoneNumLog, 'Vui lòng nhập số điện thoại!');
    } else {
      checkPhoneNumber(phoneNumLog);
    }
    if (pwEmty) {
      seeError(passwordLog, 'Vui lòng nhập mật khẩu!');
    } else {
      seeSuccess(passwordLog);
    }
  } else if(checkPhoneNumber(phoneNumLog) && checkPassword(passwordLog)){
    let phoneNumStore = phoneNumRegis.value.trim();
    let pwStore = passwordRegis.value.trim();

    const accounts = JSON.parse(sessionStorage.getItem('accounts') || "[]");

    const matchingAccount = accounts.find(
      (account) => account.phoneNumStored === phoneNumStore && account.pwStored === pwStore 
    );

    if(!matchingAccount){
      alert('Số điện thoại hoặc mật khẩu không đúng!');
      seeError(phoneNumLog, '');
      seeError(passwordLog, '');
    } else {
      alert('Đăng nhập thành công!');
    }
  }
};