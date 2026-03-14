$exts = @('.ts','.tsx','.js','.jsx','.mjs','.cjs','.json','.md','.yml','.yaml','.html','.css','.scss','.xml','.env','.mdc','.svg')
$skip = @('node_modules','.git','dist','out','bin','.turbo','coverage')
$files = Get-ChildItem -Recurse -File | Where-Object {
  $p = $_.FullName
  $skipMatch = $false
  foreach ($s in $skip) { if ($p -like "*\$s\*") { $skipMatch = $true; break } }
  -not $skipMatch -and ($exts -contains $_.Extension)
}
$replacements = @(
  @('RooCodeInc','abhiramvishal'),
  @('RooVeterinaryInc','clawpilot'),
  @('Roo Code','ClawPilot'),
  @('RooCode','ClawPilot'),
  @('roo-code','clawpilot'),
  @('roocode','clawpilot'),
  @('roo-cline','clawpilot'),
  @('RooCline','ClawPilot'),
  @('Roo-Code-Evals','clawpilot-evals'),
  @('Roo-Code-Docs','clawpilot-docs'),
  @('Roo-Code','clawpilot'),
  @('RooVetGit','abhiramvishal')
)
$count = 0
foreach ($f in $files) {
  $c = [System.IO.File]::ReadAllText($f.FullName)
  $n = $c
  foreach ($t in $replacements) { $n = $n.Replace($t[0], $t[1]) }
  if ($n -ne $c) {
    [System.IO.File]::WriteAllText($f.FullName, $n)
    $count++
    Write-Host $f.FullName
  }
}
Write-Host "Updated $count files"
