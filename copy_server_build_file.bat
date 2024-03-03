@echo off
setlocal

REM   - �ο����� -
REM   /s : ������ ���� �� ��� ���������� ����
REM   /h : ��������, �ý��������� ����
REM   /e : ��� �ִ� ������ ����
REM   /d : ���縦 �ϵ� ��¥��Ͽ� ��������� ������ �ǳʶٰ� ����
REM   /y : ����� �������� ����
REM   /k : ���� �Ӽ� ����. (�� �ɼ��� ������, �б����� ���� �Ӽ��� ������ ����)

echo ���Ϻ��縦 ���� �մϴ�.

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
copy .\server\package-lock.json .\%SERVER_FOLDER_NAME%\
copy .\server\server.js .\%SERVER_FOLDER_NAME%\

REM KEYS
copy .\server\private.pem .\%SERVER_FOLDER_NAME%\
copy .\server\public.pem .\%SERVER_FOLDER_NAME%\

REM FFMPEG
copy .\server\ffmpeg.exe .\%SERVER_FOLDER_NAME%\

@echo off