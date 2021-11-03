//회원가입 요청

function register() {
  $.ajax({
    type: "POST",
    url: "/api/register",
    data: {
      user_id: $("#userid").val(),
      user_pw: $("#userpw").val(),
      user_gender: $(".usergender").val(),
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
function pwchk() {
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
        return true;
      } else {
        $("#alert-success").css("display", "none");
        $("#alert-danger").css("display", "block");
        return false;
      }
    }
  });
}

console.log(pwchk());
//성별 데이터 전송
