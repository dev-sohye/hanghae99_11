//회원가입 요청

function register() {
  $.ajax({
    type: "POST",
    url: "/api/register",
    data: {
      user_id: $("#userid").val(),
      user_pw: $("#userpw").val(),
      user_gender: $(".usergender").val(),
      pw_check: pwchk,
    },
    success: function (response) {
      if (response["result"] == "success") {
        alert("회원가입이 완료되었습니다.");
        window.location.href = "/login";
      } else {
        alert(response["msg"]);
      }
    },
  });
}

// 비밀번호 확인

$(".pw").focusout(function () {
  let pw1 = $("#userpw").val();
  let pw2 = $("#pwchk").val();

  if (pw1 == "") {
    $("#alert-success").css("display", "none");
    $("#alert-danger").css("display", "none");
  } else if (pw2 == "") {
    $("#alert-success").css("display", "none");
    $("#alert-danger").css("display", "none");
  } else if (pw1 != "" && pw2 != "") {
    if (pw1 == pw2) {
      $("#alert-success").css("display", "block");
      $("#alert-danger").css("display", "none");
      return (pwchk = true);
    } else {
      $("#alert-success").css("display", "none");
      $("#alert-danger").css("display", "block");
      return (pwchk = false);
    }
  }
});

function check() {
  if (pwchk == false) {
    console.log("오호");
  } else console.log("아직");
}

//성별 데이터 전송
