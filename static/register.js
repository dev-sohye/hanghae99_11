function register() {
  $.ajax({
    type: "POST",
    url: "/api/register",
    data: {
      user_id: $('#userid').val(),
      user_pw: $('#userpw').val(),
      user_gender: $('.usergender').val(),
    },
    success: function (response) {
      if (response["result"] == "success") {
        alert("회원가입이 완료되었습니다.");
        window.location.href = "/login";
      } else {
        alert(response["msg"]);
      }
    }
  })
}

if ($('#userpw').val()==$('#pwchk').val()){
  
}