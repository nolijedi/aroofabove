$token = "7a33468e77122b44e0a3034e14f95843a1283d7c5b6e0dcd6eb4bef0882822b0"
$projectRef = "xwqwukqukudpzgdkyasu"

# Create a temporary zip file
Compress-Archive -Path "../supabase/functions/chat/*" -DestinationPath "./function.zip" -Force

# Deploy the function using curl
$headers = @{
    "Authorization" = "Bearer $token"
}

$deployUrl = "https://$projectRef.supabase.co/functions/v1/deploy"

# Deploy using curl
curl.exe -X POST `
  -H "Authorization: Bearer $token" `
  -F "file=@function.zip" `
  "https://$projectRef.supabase.co/functions/v1/deploy"

# Clean up
Remove-Item -Path "./function.zip" -Force

Write-Output "Function deployed successfully!"
