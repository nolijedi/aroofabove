@echo off
powershell -Command "Compress-Archive -Path .\* -DestinationPath function.zip -Force"
curl -X POST ^
  -H "Authorization: Bearer sbp_7678394252c10e1de05700fd79e43198955f33a7" ^
  -H "Content-Type: multipart/form-data" ^
  -F "file=@function.zip" ^
  https://api.supabase.com/v1/projects/xwqwukqukudpzgdkyasu/functions
