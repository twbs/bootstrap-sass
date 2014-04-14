$nugetContent = "content"

$mvcJs = $nugetContent + "/Scripts"
$mvcImgs = $nugetContent + "/fonts"
$mvcSass = $nugetContent + "/sass"

$src = "..\vendor\assets"
$srcImgs = $src + "\fonts\bootstrap\*"
$srcJs = $src + "\javascripts\*"
$srcSass = $src + "\stylesheets\*"

if(Test-Path $nugetContent) { Remove-Item -Recurse -Force $nugetContent }
mkdir $nugetContent
mkdir $mvcJs
mkdir $mvcImgs 
mkdir $mvcSass

copy-item -Recurse -Force $srcImgs $mvcImgs
copy-item -Recurse -Force $srcJs $mvcJs
copy-item -Recurse -Force $srcSass $mvcSass

.\nuget update -self
.\nuget pack Package.nuspec

