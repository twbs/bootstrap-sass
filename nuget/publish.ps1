$webclient = New-Object System.Net.WebClient
$url = "http://nuget.org/nuget.exe"
$file = "./nuget.exe"
$webclient.DownloadFile($url,$file)

.\nuget update -self
.\nuget pack Package.nuspec

$pkg = get-item *.nupkg | Sort-Object LastAccessTime -Descending | Select-Object -First 1 

.\nuget push $pkg.Name