//회원가입 요청

function register() {
  $.ajax({
    type: "POST",
    url: "/api/register",
    data: {
      user_id: $("#userid").val(),
      user_pw: $("#userpw").val(),
      user_gender: $("input[name='gender']:checked").val(),
      pw_check: pwchkResult,
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

let pwchk;
let pwchkResult;
let userpwLength;
let pwchkLength;

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

// 비밀번호 결과 변수에 지정

$(".pw").focusout(function () {
  if (pwchk == true && userpwLength != false && pwchkLength != false) {
    pwchkResult = "yes";
  } else pwchkResult = "no";
});

// 비밀번호 길이 설정

$("#userpw").focusout(function () {
  if ($("#userpw").val().length < 5) {
    alert("입력한 글자가 5글자 이상이어야 합니다.");
    return (userpwLength = false);
  }
});
$("#pwchk").focusout(function () {
  if ($("#pwchk").val().length < 5) {
    alert("입력한 글자가 5글자 이상이어야 합니다.");
    return (pwchkLength = false);
  }
});