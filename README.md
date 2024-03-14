# 직원들을 위한 급여 명세 페이지

직원들을 위한 급여 및 업무 관리 플랫폼
로그인 기능을 통해 로그인을 한 뒤 직원 각각의 급여 내역서와 업무관리를 할 수 있습니다.

<br>

## 프로젝트 소개

🗂️ 배포한 사이트

[OSTB](https://pay-system-neon.vercel.app/)

<br>

🗂️ 프로젝트 기간

24.03.04 ~ 24.03.13


<br>

🗂️ 사용 기술

React.js / TypeScript / styled-component / firebase / redux / chakra UI

<br>

🗂️ 팀원 소개
<table>
  <tr>
    <td align="center">
        <img src="https://github.com/dmswnlee/pay-system/blob/main/src/assets/img/jyd.png" width="150px;" alt="jyd"/><br />
        <sub><b>전유덕</b><br></sub>
    </td>
    <td align="center">
        <img src="https://github.com/dmswnlee/pay-system/blob/feat-eunjoo/src/assets/img/lej.png?raw=true" width="150px;" alt="lej"/><br />
        <sub><b>이은주</b><br></sub>
    </td>
    <td align="center">
        <img src="" width="150px;" alt="ssm"/><br />
        <sub><b>심소망</b><br></sub>
    </td>
  </tr>
 <tr>
    <td align="center">
        <sub><b>로그인, 인사정보 페이지</b><br></sub>
    </td>
    <td align="center">
        <sub><b>급여내역, 업무관리 페이지</b><br></sub>
    </td>
    <td align="center">
        <sub><b>정정신청, 정정내역 페이지</b><br></sub>
    </td>
  </tr>
</table>
<br>

## 기능구현

**데이터 정보** 

* id : jyd@gmail.com 
* id : lej@gmail.com
* id : ssm@gmail.com 
* pw : 123456

<br>

### 전유덕
로그인 페이지

* 이메일, 비밀번호를 사용한 로그인 기능
* 로그인 오류발생시 알람모달
* 로그인하지 않은 상태에서 페이지 접근시 로그인 페이지로 이동

인사정보 페이지

* 로그인한 직원 인사정보 노출
* 파이어베이스 스토리지를 이용한 프로필이미지 노출 및 수정기능

<br>

### 이은주
급여내역 페이지

* 로그인한 각 직원의 급여내역 페이지
* 직원 정보 테이블 조회
* 직원 급여 명세 테이블 조회
* 급여 명세에 열람하기 버튼 클릭 시 급여 상세 내역 모달창

업무관리 페이지

* 업무관리 캘린더
* 일정 등록 / 수정 / 삭제 
* 등록된 일정 확인 모달창
* 각 일정마다 다른 색상 선택 가능

<br>

### 심소망

정정신청 페이지

* 셀렉트 박스로 날짜 데이터 입력 및 내용 데이터 입력
* 빈값 제출시 반려모달창
* 데이터 성공시 모달창

정정신청내역 페이지

* 정정신청 페이지에서 입력한 데이터들 조회가능
* 삭제 버튼시 데이터 삭제

<br>

## 구현페이지

**로그인 페이지**
<img src="https://github.com/dmswnlee/pay-system/blob/feat-eunjoo/src/assets/img/01.%EB%A1%9C%EA%B7%B8%EC%9D%B8.png?raw=true" width=1678   alt="로그인 페이지" />

<br>

**인사정보 페이지**
<img src="https://github.com/dmswnlee/pay-system/blob/feat-eunjoo/src/assets/img/02.%EC%9D%B8%EC%82%AC%EC%A0%95%EB%B3%B4.png?raw=true" width=1678   alt="인사정보 페이지" />

<br>

**급여내역 페이지**
<img src="https://github.com/dmswnlee/pay-system/blob/feat-eunjoo/src/assets/img/03.%EA%B8%89%EC%97%AC%EB%82%B4%EC%97%AD.png?raw=true" width=1678   alt="급여내역 페이지" />

<br>

**급여내역 페이지 - 급여상세내역**
<img src="https://github.com/dmswnlee/pay-system/blob/feat-eunjoo/src/assets/img/04.%EA%B8%89%EC%97%AC%EC%83%81%EC%84%B8%EB%82%B4%EC%97%AD.png?raw=true" width=1678   alt="급여상세내역" />

<br>

**정정신청 페이지**
<img src="https://github.com/dmswnlee/pay-system/blob/feat-eunjoo/src/assets/img/08.gif?raw=true" width=1678   alt="정정신청페이지" />

- 셀렉션 박스로 날짜를 선택해 데이터를 입력 할 수 있습니다.
- 날짜나 내용이 빈값일때 제출버튼 클릭시 값을 입력해달라는 모달창이 뜹니다.
- 내용을 모두 기입할시엔 입력 성공했다는 모달창이 뜹니다.  
<br>

**정정내역 페이지**
<img src="https://github.com/dmswnlee/pay-system/blob/feat-eunjoo/src/assets/img/06.%EC%A0%95%EC%A0%95%EB%82%B4%EC%97%AD.png?raw=true" width=1678   alt="정정내역페이지" />

- 정정신청 페이지에서 입력한 데이터들이 조회됩니다.
- 날짜는 20xx.xx.xx 식으로 조회됩니다.
- 삭제버튼 클릭시 해당 리스트의 데이터가 삭제됩니다. 
<br>

**업무관리 페이지**
<img src="https://github.com/dmswnlee/pay-system/blob/feat-eunjoo/src/assets/img/09.gif?raw=true" width=1678   alt="업무관리페이지" />

<br>

