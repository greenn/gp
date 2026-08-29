param(
  [switch]$Force
)

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$assets = Join-Path $root 'assets'
New-Item -ItemType Directory -Force -Path $assets | Out-Null
$rows = Import-Csv (Join-Path $root 'illustrations.csv')

for ($index = 0; $index -lt $rows.Count; $index++) {
  $number = '{0:d2}' -f ($index + 1)
  $target = Join-Path $assets "$number.jpg"
  if (-not $Force -and (Test-Path -LiteralPath $target)) { continue }
  try {
    Invoke-WebRequest -Uri $rows[$index].image_url -OutFile $target -Headers @{ 'User-Agent' = 'Mozilla/5.0' }
    Write-Host "Downloaded $number.jpg — $($rows[$index].caption)"
  } catch {
    Write-Warning "Could not download illustration ${number}: $($_.Exception.Message)"
  }
}
