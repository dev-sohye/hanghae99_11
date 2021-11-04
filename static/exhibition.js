//유저 정보 가져오기

$.ajax({
  type: "GET",
  url: "/api/user",
 data: {},
  success: function (response) {
    if (response["result"] == "success") {
      $(".customer").css("display", "block");
      $(".visitor").css("display", "none");
      let username = response["user_id"];
      $("#customer_name").prepend(username);
    } else {
      $(".customer").css("display", "none");
      $(".visitor").css("display", "block");
    }
  },
});

//로그인 여부 확인 후 리뷰창 오픈

let counterLet = 0;
function dologin() { //리뷰창 카운터
    ++counterLet;
  $.ajax({
    type: "GET",
    url: "/api/user",
    data: {},
    success: function (response) {
      if (response["result"] == "success" && counterLet == 1) {
        let reviewwrite = `
         
            <div className="review-commit">
              <ul>
                <li className="user-info">
                  <p>user img</p>
                  <p>user name</p>
                  <select id="grade" className="form-select">
                    <option selected>평점</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </li>
                <li className="table contentArea">
                            <textarea className="form-control" id="comment"
                                      cols="30"
                                      rows="5" placeholder="내용을 입력하세요."></textarea>
                </li>
              </ul>
              <div>
                <button onClick="makeReview()">등록하기</button>
              </div>
            </div>
          `;
        $("#reviewform").append(reviewwrite);
      } else if(response["result"] != "success"){
        alert("로그인 먼저 하세요~!~!")
        location.replace('/login')
        //이전 페이지 URL의 마지막 숫자 또는 이전 페이지의exhi.id값 가져와서 url 뒤쪽에 넣기,,
      }
    },
  });
}
//로그아웃
function logout() {
  $.removeCookie("mytoken", { path: "/" });
  alert("로그아웃!");
  window.location.reload();
}
