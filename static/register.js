let pwchk;
let pwchkResult;
let userpwLength;

// 비밀번호 길이 설정 

$("#userpw").focusout(function () {
  if ($("#userpw").val().length < 4) {
    $("#help-pw")
      .text("비밀번호는 4글자 이상이어야 합니다!!!!")
      .removeClass("is-safe")
      .addClass("is-danger");
    userpwLength = false;
  } else {
    userpwLength = true;

    $("#help-pw")
      .text("비밀번호 확인란을 입력해주세요^^")
      .removeClass("is-danger")
      .addClass("is-safe");
  }
});

// 비밀번호 일치 여부 확인

$(".pw").focusout(function () {
  let pw1 = $("#userpw").val();
  let pw2 = $("#pwchk").val();

  if (pw1 == "") {
    $("#help-pw")
      .text("비밀번호를 입력해주세요.")
      .removeClass("is-safe")
      .addClass("is-danger");
    return;
  } else if (pw1 != "" && pw2 != "" && userpwLength == true) {
    if (pw1 == pw2) {
      $("#help-pw")
        .text("비밀번호가 일치합니다~!")
        .removeClass("is-danger")
        .addClass("is-success");
      // $("#alert-success").css("display", "block");
      // $("#alert-danger").css("display", "none");
      pwchk = true;
      return;
    } else {
      $("#help-pw")
        .text("비밀번호를 확인해주세요!!")
        .removeClass("is-safe")
        .addClass("is-danger");
      // $("#alert-success").css("display", "none");
      // $("#alert-danger").css("display", "block");
      pwchk = false;
      return;
    }
    return;
  }
});

/////// 회원가입 요청///////

function register() {
  let username = $("#userid").val();
  if (username == "") {
    alert("아이디를 입력해주세요!");
    $("#userid").focus();
    return;
  }

  // 비밀번호 결과 변수에 지정
  else if (pwchk == true && userpwLength == true) {
    pwchkResult = "yes";
  } else pwchkResult = "no";
  // 아이디 중복확인
  if ($("#help-id").hasClass("is-danger")) {
    alert("아이디를 다시 확인해주세요.");
    return;
  } else if (!$("#help-id").hasClass("is-success")) {
    alert("아이디 중복확인을 해주세요.");
    return;
  }
  // api에 회원가입 요청
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

//정규표현식

function is_nickname(asValue) {
  var regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,10}$/;
  return regExp.test(asValue);
}

// 아이디 중복확인

$("#userid").focusout(function () {
  let username = $("#userid").val();
  console.log(username);
  if (username == "") {
    $("#help-id")
      .text("아이디를 입력해주세요.")
      .removeClass("is-safe")
      .addClass("is-danger");
    return;
  }
  if (!is_nickname(username)) {
    $("#help-id")
      .text(
        "아이디의 형식을 확인해주세요. 영문과 숫자, 일부 특수문자(._-) 사용 가능. 2-10자 길이"
      )
      .removeClass("is-safe")
      .addClass("is-danger");
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
      } else {
        $("#help-id")
          .text("사용할 수 있는 아이디입니다.")
          .removeClass("is-danger")
          .addClass("is-success");
      }
      $("#help-id").removeClass("is-loading");
    },
  });
});
