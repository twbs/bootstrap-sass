$nugetContent = "content"

$mvcJs = $nugetContent + "/Scripts"
$mvcContent = $nugetContent + "/Content";
$mvcImgs = $mvcContent + "/Images"
$mvcSass = $mvcContent + "/sass"

$src = "..\vendor\assets"
$srcImgs = $src + "\images\*"
$srcJs = $src + "\javascripts\*"
$srcSass = $src + "\stylesheets\*"

if(Test-Path $nugetContent) { Remove-Item -Recurse -Force $nugetContent }
mkdir $nugetContent
mkdir $mvcJs
mkdir $mvcContent
mkdir $mvcImgs 
mkdir $mvcSass

copy-item -Recurse -Force $srcImgs $mvcImgs
copy-item -Recurse -Force $srcJs $mvcJs
copy-item -Recurse -Force $srcSass $mvcSass

.\nuget pack Package.nuspec