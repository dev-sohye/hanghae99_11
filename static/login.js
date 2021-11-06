<!-- 헤더부분 로그인 버튼 클릭 시-->
function login() {
  let username = $("#userid").val();
  if (username == "") {
    alert("아이디를 입력해주세요!");
    $("#userid").focus();
    return;
  }
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

<!-- 리뷰쓰기 눌렀을 때 나타나는 로그인 창으로 가기 -->
function login_to_review() {
  $.ajax({
    type: "POST",
    url: "/api/login",
    data: { user_id: $("#userid").val(), user_pw: $("#userpw").val() },
    success: function (response) {
      if (response["result"] == "success") {
        $.cookie("mytoken", response["token"]);
        alert("로그인 완료!");
        window.location.href = document.referrer;
        // exhibition/{{ exhi.id }}
      } else {
        alert(response["msg"]);
      }
    },
  });
}
