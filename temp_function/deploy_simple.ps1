$headers = @{
    'Authorization' = 'Bearer sbp_7678394252c10e1de05700fd79e43198955f33a7'
    'Content-Type' = 'application/json'
}

$body = @{
    name = 'chat'
    slug = 'chat'
    verify_jwt = $false
    entrypoint_file = 'index.ts'
    content = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((Get-Content -Path .\index.ts -Raw)))
} | ConvertTo-Json

Invoke-RestMethod `
    -Method Post `
    -Uri 'https://api.supabase.com/v1/projects/xwqwukqukudpzgdkyasu/functions' `
    -Headers $headers `
    -Body $body
