function postLoginForm(loginInfo, callback, failCallBack) {
  const {username, password, firstName, lastName, email} = loginInfo
  const settings = {
    contentType: "application/json",
    data: JSON.stringify({
      username,
      password, 
      firstName, 
      lastName, 
      email
    }),
    dataType: 'JSON',
    success: callback,
    error: failCallBack,
    type: 'POST',
    url: '/api/users'
};
  $.ajax(settings);
}

function watchSubmit() {
  $('#createUser').submit(event => {
    event.preventDefault();
    postLoginForm(getSubmitValue(), successCallback, failCallBack);
    getSubmitValue();
  });
}

function getSubmitValue() {
  let submitObj = {
    username: $('.usernameInput').val(),
    password: $('.passwordInput').val(),
    firstName: $('.firstNameInput').val(),
    lastName: $('.lastNameInput').val(),
    email: $('.emailInput').val()
  }
  console.log(submitObj);
  return submitObj
}

function renderSuccessCreated(data) {
  html = `
  <div class="successUser">
    <h2 class="cardName">
      <p>${data.username} has been created</p>
      <p>Click to login
      <a href="/login.html"><button class="redirect">Login</button></a>
      </p>
    </h2>
  </div>
  `
  return html
}

function successCallback(data) {
  $form = $('.formDiv');
  $form.html(renderSuccessCreated(data));
}

function failCallBack(data) {
  
}

$(watchSubmit);