function login() {
  $.ajax({
    type: "POST",
    url: "/api/login",
    data: { user_id: $("#userid").val(), user_pw: $("#userpw").val() },
    success: function (response) {
      if (response["result"] == "success") {
        $.cookie("mytoken", response["token"]);

        alert("로그인 완료!");
        window.location.href = "/";
      } else {
        alert(response["msg"]);
      }
    },
  });
}

function login_to_review() {
  $.ajax({
    type: "POST",
    url: "/api/login",
    data: { user_id: $("#userid").val(), user_pw: $("#userpw").val() },
    success: function (response) {
      if (response["result"] == "success") {
        $.cookie("mytoken", response["token"]);
        alert("로그인 완료!");
        window.location.href = "/";
        // exhibition/{{ exhi.id }}
      } else {
        alert(response["msg"]);
      }
    },
  });
}
