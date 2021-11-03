// 회원가입 요청

function register() {

// 비밀번호 결과 변수에 지정
  if (pwchk == true && userpwLength == true) {
    pwchkResult = "yes";
  } else pwchkResult = "no";

// 회원가입 요청 API
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

let pwchk;
let pwchkResult;
let userpwLength;
let pwLength = $("#userpw").val().length;

// 비밀번호 일치 여부 확인

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

// 비밀번호 길이 설정
$("#userpw").focusout(function () {
  if ($("#userpw").val().length < 5) {
    alert("입력한 글자가 5글자 이상이어야 합니다.");
    userpwLength = false;
  } else userpwLength = true;
});

function test() {
  console.log(
    `pwchk : ${pwchk}, pwchResult:${pwchkResult}, userpwLength : ${userpwLength}`,
    `pwLength:${pwLength} `, $("#userpw").val().length
  );
}

//정규표현식
function is_nickname(asValue) {
  var regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,10}$/;
  return regExp.test(asValue);
}

function is_password(asValue) {
  var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
  return regExp.test(asValue);
}

// 아이디 중복확인
function idcheck() {
  let username = $("#userid").val();
  console.log(username);
  if (username == "") {
    $("#check-id")
      .text("아이디를 입력해주세요.")
      .removeClass("is-safe")
      .addClass("is-danger");
    $("#userid").focus();
    return;
    c;
  }
  if (!is_nickname(username)) {
    $("#check-id")
      .text(
        "아이디의 형식을 확인해주세요. 영문과 숫자, 일부 특수문자(._-) 사용 가능. 2-10자 길이"
      )
      .removeClass("is-safe")
      .addClass("is-danger");
    $("#userid").focus();
    return;
  }
  $("#help-id").addClass("is-loading");
  $.ajax({
    type: "POST",
    url: "/sign_up/check_dup",
    data: {
      username_give: username,
    },
    success: function (response) {
      if (response["exists"]) {
        $("#help-id")
          .text("이미 존재하는 아이디입니다.")
          .removeClass("is-safe")
          .addClass("is-danger");
        $("#userid").focus();
      } else {
        $("#help-id")
          .text("사용할 수 있는 아이디입니다.")
          .removeClass("is-danger")
          .addClass("is-success");
      }
      $("#help-id").removeClass("is-loading");
    },
  });
}
