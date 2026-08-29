param(
  [switch]$Force
)

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$assets = Join-Path $root 'assets'
New-Item -ItemType Directory -Force -Path $assets | Out-Null

# Already supplied with the project: copy them under stable, web-friendly names.
$localImages = @(
  @{ Source = 'Кулибин_реальные_референсы/01_Мост/01_архивное_изображение_проекта_моста.png'; Target = 'kulibin-bridge-drawing.png' },
  @{ Source = 'Кулибин_реальные_референсы/02_Реконструкции/01_самокатка_музейная_модель.png'; Target = 'kulibin-scooter-model.png' },
  @{ Source = 'Кулибин_реальные_референсы/03_Часы_и_механизм/01_часы_яйцо_раскрытый_корпус_Эрмитаж.png'; Target = 'kulibin-egg-clock-open.png' },
  @{ Source = 'Кулибин_реальные_референсы/03_Часы_и_механизм/02_часы_яйцо_внешний_вид.png'; Target = 'kulibin-egg-clock.png' },
  @{ Source = 'Кулибин_реальные_референсы/03_Часы_и_механизм/03_архивная_гравюра_часов.png'; Target = 'kulibin-clock-engraving.png' }
)
foreach ($item in $localImages) {
  $source = Join-Path $root $item.Source
  $target = Join-Path $assets $item.Target
  if ($Force -or -not (Test-Path -LiteralPath $target)) { Copy-Item -LiteralPath $source -Destination $target -Force }
}

# Supplementary museum-exhibition photographs listed in ИСТОЧНИКИ.txt.
$remoteImages = @(
  @{ Url = 'https://russia_to_the_world.aif.ru/static/Gallery_3_1-00f2a3ca41fff8cc67e778754edd09db.jpg'; Target = 'bridge-model-01.jpg' },
  @{ Url = 'https://russia_to_the_world.aif.ru/static/Gallery_3_2-107e94bcacf25c5fcd8a97b448261dbd.jpg'; Target = 'bridge-model-02.jpg' },
  @{ Url = 'https://russia_to_the_world.aif.ru/static/Gallery_3_3-29470b04dd61802363875c461272abb7.jpg'; Target = 'bridge-model-03.jpg' },
  @{ Url = 'https://russia_to_the_world.aif.ru/static/Gallery_3_4-c8d707aa4357035c2cd2b2c11e642897.jpg'; Target = 'bridge-model-04.jpg' },
  @{ Url = 'https://russia_to_the_world.aif.ru/static/Gallery_2_6-1604346af4dae68945b7939244e84920.jpg'; Target = 'watercraft-model.jpg' },
  @{ Url = 'https://russia_to_the_world.aif.ru/static/Gallery_2_7-a315ab088fd25aed8d5dfa8c6965e8ea.jpg'; Target = 'watercraft-mechanism.jpg' }
)
foreach ($item in $remoteImages) {
  $target = Join-Path $assets $item.Target
  if (-not $Force -and (Test-Path -LiteralPath $target)) { continue }
  try {
    Invoke-WebRequest -Uri $item.Url -OutFile $target -Headers @{ 'User-Agent' = 'Mozilla/5.0' }
    Write-Host "Downloaded $($item.Target)"
  } catch {
    Write-Warning "Could not download $($item.Url): $($_.Exception.Message)"
  }
}
