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
REM   - �ο����� -
REM   DIR
REM   /S ������ ���͸��� ���� ���͸��� ����
REM   /B �ּ� ������ ���(�Ӹ��� ������ ��� ����)
REM   /A:D ������ Ư���� ���� ������ ������(D ���͸�)

REM   RMDIR [/S] [/Q] [����̺�:]���
REM   RD [/S] [/Q] [����̺�:]���
REM   /S ������ ���͸� ��ü��, �� ���� ��� ���͸� �� ������ ����ϴ�.
REM      ���͸� Ʈ���� ����µ� ����մϴ�.
REM   /Q ������ ����, /S�� ���͸� Ʈ���� ����µ� ������ ������ �ٽ�
REM      ���� �ʽ��ϴ�.

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