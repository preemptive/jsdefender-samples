rem Make build folder
mkdir build\src

rem Copy unprotected resources
copy src\*.html build\src\
copy src\*.css build\src\
copy src\*.svg build\src\
copy src\*.jpg build\src\

rem Run JSDefender
jsdefender
