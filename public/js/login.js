function postLoginForm(loginInfo, callback) {
  const {username, password} = loginInfo
  const settings = {
    contentType: "application/json",
    data: JSON.stringify({
      username,
      password
    }),
    dataType: 'JSON',
    success: callback,
    type: 'POST',
    url: '/api/auth/login'
};
  $.ajax(settings);
}

function watchSubmit() {
  $('.loginForm').submit(event => {
    event.preventDefault();
    postLoginForm(getSubmitValue(), successCallback);
    getSubmitValue();
  });
}

function getSubmitValue() {
  let submitObj = {
    username: $('.usernameInput').val(),
    password: $('.passwordInput').val()
  }
  return submitObj
}

function successCallback(data) {
  localStorage.setItem("bearer", JSON.stringify(data));
}

$(watchSubmit);