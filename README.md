# House Project

집값 예측, 매물 트렌드 등을 확인하기 위한 프로젝트

# Stack

사용언어 : Java 17  
개발도구 : Spring Boot 3.2.3, Spring Data JPA, Query DSL  
서버 : Apache Tomcat  
DB : MySQL (AWS RDS)  
배포 : AWS EC2 / Load Balancer  
형상관리 : Git  

# 아키텍처 다이어그램

![image](https://github.com/mirikwon427/House-Project/blob/master/images/image1.png)

## 프로젝트 진행 사항

### 1주차
- **DB 설계**: `user`, `registered_House`, `liked` 테이블 생성
- **프로젝트 구조**: Gradle 사용, Java 17, Spring Security, Spring Data JPA 설정
- **Git**: Git-flow 사용법 학습

  _힘들었던 점_: Spring Security와 JPA의 기본 개념 학습, Git-flow를 통한 브랜치 전략 이해 및 적용의 어려움

### 2주차
- **프론트-백 연동**: CORS 설정, JSON 데이터 전달
- **JWT 토큰**: Spring Security로 암호화 및 JWT 사용
- **로그인/회원가입**: Spring Data JPA, JWT 구현

  _힘들었던 점_: JWT 구현의 복잡성과 DTO를 통한 JSON 데이터 전송 처리에서 어려움을 겪음

### 3주차
- **User 기능**: 정보 수정, 탈퇴, 상세 페이지 구현
- **Registered_House**: 등록, 수정, 삭제, 상세 페이지 구현
- **Like 기능**: 찜 목록, 찜하기, 찜 삭제
- **DB 저장**: 크롤링 데이터 저장

  _힘들었던 점_: 대용량 CSV 파일을 DB에 저장할 때 오류가 발생했으며, 이를 해결하기 위해 CSV를 JSON으로 변환하여 데이터베이스에 적재

### 4주차
- **검색 기능**: Query DSL 사용, 매물 목록 페이징
- **DB 작업**: 공용 DB 생성, CSV 파일 JSON 변환

  _힘들었던 점_: Query DSL 사용 학습, 공용 데이터베이스 구축 (AWS RDS)

### 5주차
- **Flask 연동**: 이전 및 예상 가격 가져오기
- **휴대폰 인증**: Flask와 연동

  _힘들었던 점_: Flask 서버 설정 및 데이터 통신

### 6주차
- **HTTPS 배포**: AWS 로드밸런서 사용
- **DB 보안**: RDS 퍼블릭 접근 제한
- **서버 설정**: 환경 변수로 보안 강화

## Issues

1. 아직 미구현 부분이나 에러가 많습니다. 모든 내용은 [Issues](https://github.com/housestudy/project/issues)에 정리되어 있습니다.

2. **상세페이지**에 로딩이 오래 걸리는 에러가 있습니다. 상세페이지 입장 시, AI 모델을 돌리며 이로 인한 시간과 EC2 프리티어를 사용해 CPU 사용량이 좋지 않습니다. 약 30초 전후의 시간이 필요합니다.

