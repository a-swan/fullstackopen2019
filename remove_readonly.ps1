$folderPath = $args[0]

#Get file structure of folder
$Files = Get-ChildItem -Path $folderPath -Recurse

#For each child remove read-only tag and delte
ForEach($File in $Files){
    Write-Host ""$File.Attributes": "$File "IsReadOnly: " $File.IsReadOnly
    if($File.Attributes -ne "Directory" -and $File.Attributes -ne "Directory, Archive"){
        if($File.IsReadOnly -eq $true){
            try{
                #change readonly to false
                Set-ItemProperty -Path $File.FullName -Name IsReadOnly -Value $false
                Write-Host "File: "$File "IsReadOnly: " $File.IsReadOnly -ForegroundColor "magenta"

                #delete child
                Remove-Item
            }
            catch [Exception]{
                Write-Host "Error at file "$Path"\"$File
                Write-Host $_.Exception.Message
            }
        }
    }
}