function postLoginForm(loginInfo, callback) {
  const settings = {
    contentType: "application/json",
    data: JSON.stringify({
        username: loginInfo[0],
        password: loginInfo[1]
    }),
    dataType: 'JSON',
    success: callback,
    type: 'POST',
    url: '/api/auth/login'
};
console.log(settings);
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
  let submitArray = []

  submitArray[0] = $('.usernameInput').val();
  submitArray[1] = $('.passwordInput').val();
  console.log(submitArray);
  return submitArray
}

function successCallback(data) {
  console.log(data);
  localStorage.setItem("bearer", JSON.stringify(data));
}

$(watchSubmit);