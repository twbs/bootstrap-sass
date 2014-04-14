$pkg = get-item *.nupkg | Sort-Object LastAccessTime -Descending | Select-Object -First 1 

.\nuget push $pkg.Name