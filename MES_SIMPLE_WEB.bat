@echo off
REM cd "./SERVER_BUILD"
pushd SERVER_BUILD
call npm.cmd start
popd
REM cd "../CLIENT_BUILD"
pushd CLIENT_BUILD
call npm.cmd start