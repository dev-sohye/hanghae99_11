# [ 🎆 전시 뭐하니? ]
![전시뭐하니](https://user-images.githubusercontent.com/65863834/140554983-96080ef4-aafa-4d87-b6d1-404d7a5c54f6.JPG)


[logo]: https://github.com/dev-sohye/hanghae99_11/blob/main/logo_02.png?raw=true
## 미니 프로젝트 <span style="font-size:12px;">항해99 4기 11조</span>
***
### 전시 뭐하니?
위드코로나 시대로 전환되고 있는 지금, 방구석에만 있으면 안되겠죠? 다양한 전시회를 한 눈에 볼 수 있도록 만들었습니다! 사람들의 리뷰와 상세페이지를 참고하여 후회없는 전시회에 다녀오세요. 다녀온 후에는 리뷰도 남겨주시는 거 잊지 마세요!
- 웹사이트 링크 : http://전시뭐하니.shop
- 데모영상 : https://youtu.be/4efpjiBn4ms
***
##### 프로젝트 기간
2021.11.01 ~ 2021.11.5
##### 참여인원
이소혜 / 정민경 / 서민지 / 이건희
##### 개발 스택
    HTML, CSS, Javascript, Flask, jinja2, mongoDB, JWT, Git
***
## 페이지 별 구현기능
1. 전시회 목록
   - python,mongoDB 를 활용하여 티켓 사이트 크롤링 후 전시회 목록 전시 
   - 종료 임박 전시회의 경우 가로로 롤링하여 조회 
   - 전시회 검색
   - 전시회 클릭 시 해당 전시회의 상세 페이지로 이동
2. 상세 페이지
    - DB내 전시회 정보 전시
    - 유저 정보를 불러와 로그인 한 사람만 리뷰 작성
    - jinja2를 활용하여 리뷰 불러오기 및 날짜순 정렬
    - DB에서 평점을 불러와 전시회 평균 평점 전시
    - DB를 바탕으로 본인이 작성한 리뷰만 삭제
3. 로그인 & 회원가입
    - 아이디 중복확인
    - 비밀번호 일치 확인
    - 아이디, 비밀번호 가입 규칙
    - JWT를 활용한 토큰 발급
    - 상세 페이지 통해서 로그인 시 이전페이지로 이동
***
## 기능 API
| API | 기능 | Method | URL |
|---|:---:|---|---|
| api_register() |  회원가입 | POST |
| api_login | 로그인 | POST |
| api_valid | 유저 정보 불러오기 | GET |
| chek_dup | 아이디 중복확인 | POST |
| write_review() | 리뷰 등록하기 | POST |

## 배운 점
1. 팀프로젝트 시 팀원들과 협력하는 방법
   - 깃허브와 깃의 기초 사용법
   - 노션을 활용하여 진행상황 공유
   - 커뮤니케이션 방법
2. 백엔드와 프론트앤드의 차이점
3. 웹사이트가 구동되는 전반적인 기초원리
4. SSR과 CSR의 차이점
5. JWT(Json Web Token) 방식의 로그인
6. 서버와 클라이언트간의 통신
7. jinja2를 활용한 SSR

***
## 회고록

서민지: [Github](https://github.com/ireneeming/sparta99-4/blob/main/README.md)
이건희: [Velog](https://velog.io/@isthis/WIL-%ED%95%AD%ED%95%B4-1%EC%A3%BC%EC%B0%A8-1%EC%A3%BC%EA%B0%84%EC%9D%98-%ED%9A%8C%EA%B3%A0)
