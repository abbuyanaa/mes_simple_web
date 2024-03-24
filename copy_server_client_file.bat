@echo off
setlocal

REM   - 부연설명 -
REM   /s : 복사할 폴더 내 모든 하위폴더를 포함
REM   /h : 숨김파일, 시스템파일을 포함
REM   /e : 비어 있는 폴더를 포함
REM   /d : 복사를 하되 날짜기록에 변경사항이 없으면 건너뛰고 복사
REM   /y : 물어보는 질문없이 복사
REM   /k : 파일 속성 복사. (이 옵션이 없으면, 읽기전용 등의 속성이 없어져 버림)

echo 파일복사를 시작 합니다.

SET CLIENT_FOLDER_NAME=CLIENT_BUILD

@echo on
xcopy .\client\build\  .\%CLIENT_FOLDER_NAME%\build\  /s /h /e /y /d /k
xcopy .\client\config\ .\%CLIENT_FOLDER_NAME%\config\ /s /h /e /y /d /k
xcopy .\client\public\ .\%CLIENT_FOLDER_NAME%\public\ /s /h /e /y /d /k

copy .\client\.env    .\%CLIENT_FOLDER_NAME%\     
copy .\client\app.js    .\%CLIENT_FOLDER_NAME%\
copy .\client\deploy.js .\%CLIENT_FOLDER_NAME%\
copy .\client\next.config.js .\%CLIENT_FOLDER_NAME%\
copy .\client\next-i18next.config.js .\%CLIENT_FOLDER_NAME%\
copy .\client\package.json .\%CLIENT_FOLDER_NAME%\

@echo off
REM   - 부연설명 -
REM   DIR
REM   /S 지정한 디렉터리와 하위 디렉터리를 포함
REM   /B 최소 포맷을 사용(머리말 정보나 요약 없음)
REM   /A:D 지정된 특성을 가진 파일을 보여줌(D 디렉터리)

REM   RMDIR [/S] [/Q] [드라이브:]경로
REM   RD [/S] [/Q] [드라이브:]경로
REM   /S 지정된 디렉터리 자체와, 그 안의 모든 디렉터리 및 파일을 지웁니다.
REM      디렉터리 트리를 지우는데 사용합니다.
REM   /Q 조용한 모드로, /S로 디렉터리 트리를 지우는데 문제가 없으면 다시
REM      묻지 않습니다.

REM remove analyze folder
@echo on
for /f %%i in ('dir %CLIENT_FOLDER_NAME%\analyze /s /b /a:d') do rmdir %%i /s /q

@echo off

SET SERVER_FOLDER_NAME=SERVER_BUILD

@echo on

xcopy .\server\config\ .\%SERVER_FOLDER_NAME%\config\ /s /h /e /y /d /k
xcopy .\server\db\  .\%SERVER_FOLDER_NAME%\db\  /s /h /e /y /d /k
xcopy .\server\messages\  .\%SERVER_FOLDER_NAME%\messages\  /s /h /e /y /d /k
xcopy .\server\passport\ .\%SERVER_FOLDER_NAME%\passport\ /s /h /e /y /d /k
xcopy .\server\routes\ .\%SERVER_FOLDER_NAME%\routes\ /s /h /e /y /d /k
xcopy .\server\utils\ .\%SERVER_FOLDER_NAME%\utils\ /s /h /e /y /d /k
     
copy .\server\.env    .\%SERVER_FOLDER_NAME%\
copy .\server\package.json .\%SERVER_FOLDER_NAME%\
copy .\server\server.js .\%SERVER_FOLDER_NAME%\

REM KEYS
copy .\server\private.pem .\%SERVER_FOLDER_NAME%\
copy .\server\public.pem .\%SERVER_FOLDER_NAME%\

@echo off