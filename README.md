# SpringFramework-Project-내 일을 JOB자


## 🖥️ 프로젝트 소개
사람인을 참고하여 만든 구인구직-채용연계 사이트입니다
<br>

## 🕰️ 개발기간
* 23.10.23 - 23.12.08
* 23.10.23 - 23.11.05 설계
* 23.11.06 - 23.12.08 구현

### 🧑‍🤝‍🧑 구성원 소개 및 역할
 - 개발인원 : 7명
 - 팀장  : 이기웅 - 지원절차 관리(서류,적성검사,기술시험,면접), 기업정보관리
 - 팀원1 : 이은솔 - 시험지 관리, 채용공고목록 조회, 채용절차 관리(서류,적성검사,기술시험,면접), 채팅
 - 팀원2 : 김소원 - 로그인, 회원가입, ID찾기, PW찾기, 채용공고 등록
 - 팀원3 : 김정하 - 쿠폰 관리, 프로모션 관리(포인트 충전, 이용권, 광고 관리) 및 결제기능
 - 팀원4 : 신수연 - 관리자 페이지, 메인 CSS
 - 팀원5 : 박주연 - 마이페이지(개인정보조회, 이력서 작성, 면접후기 등록)
 - 팀원6 : 김태형 - 자유게시판, 이벤트 페이지

### ⚙️ 개발 환경
- `Java 8`
- `JDK 1.8.0`
- **IDE** : ECLIPSE
- **Framework** : 전자정부 표준프레임워크 4.0(Spring Framework 기반)
- **Database** : Oracle DB(11xe)
- **ORM** : Mybatis

## 📌 주요 기능
### 공통기능
#### 로그인
- 개인회원, 기업회원, 관리자 아이디 로그인 시 해당 메인페이지로 이동
- ID찾기, PW찾기
#### 회원가입
- 주소 API 연동
- ID 중복 체크
---
### 기업회원
#### 채용 관리
1. 채용공고 등록
- 채용공고 등록, 수정, 삭제
- 채용절차 커스텀
2. 채용공고 목록 조회
- 공고별 지원 및 확인/미확인 서류, 최종합격 통계 조회 가능
3. 채용절차 관리
 1) 서류
- 채점표 생성
- 지원자 이력서 조회 및 채점
 2) 적성검사
- 지원자 검사결과지 조회
 3) 기술시험
- 지원자 검사결과지 조회 및 채점
 4) 면접
- 지원자별 면접일정 등록
- 면접일정 수정 및 삭제
- 메일 발송
 5) 공통기능
- 지원자 이력서 조회
- 미확인, 합격, 불합격 영역별 지원자목록 조회
- 합불여부 저장
- 절차 마감
- 지원자 목록 엑셀 다운로드
#### 시험지 관리
- 시험지 조회, 등록, 수정, 삭제
- 기간과 제목으로 시험지 검색
#### 마이페이지
- 정보 조회 및 수정정
#### 프로모션
- 이미지 광고
- 배너 광고
---
### 개인회원
#### 공고 조회
- 지역별 공고 조회
- 관심공고 스크랩
#### 채팅
- 지역선택
- 지역별 채팅
#### 채용공고 지원
- 합불 현황 조회
- 적성검사 시험지 제출
- 기술시험 시험지 제출
- 면접일정 조회
#### 마이페이지
- 면접후기 작성
- 포인트 및 쿠폰 조회
#### 이력서
- 본인 이력서 조회
- 이력서 등록
---
### 관리자
- 회원 정보 조회 및 관리
- 기업회원 가입 승인
- 공지사항 등록, 수정, 삭제
- 1:1 문의 조회 및 댓글 등록
  
