# 더블 슬래쉬 웹앱 Restful API 서버

## 프레임워크: Nest.js

## DB: Mongo DB

- DB 테이블 정리

  - 게시판 (공지사항)
    | id     | title  | timestamp |   desc | type(활동...) | upload_file_list |
    | :----- | :----: | --------: | -----: | ------------: | ---------------: |
    | Number | String |      Date | String |        Number |    Array(String) |

  - 게시판 (활동사진)
    | id     | title  | timestamp |   desc | type(활동...) | upload file list |
    | :----- | :----: | --------: | -----: | ------------: | ---------------: |
    | Number | String |      Date | String |        Number |    Array(String) |

  - 리쿠르트 테이블
    | id     |  name  |  phone | isAccept |
    | :----- | :----: | -----: | -------: |
    | Number | String | String |  Boolean |

  - 프로젝트 테이블
    | id     | service |   link |     team list |
    | :----- | :-----: | -----: | ------------: |
    | Number | String  | String | Array(Number) |

  - 프로젝트 구성원 테이블
    | id     |  part  |   name |
    | :----- | :----: | -----: |
    | Number | String | String |