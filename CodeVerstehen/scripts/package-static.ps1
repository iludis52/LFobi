$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$targetDir = Join-Path $projectRoot 'dist\code-verstehen'
$releaseDir = Join-Path $projectRoot 'release'
New-Item -ItemType Directory -Path $targetDir,$releaseDir -Force | Out-Null

# Explizite Positivliste: kein Node-Server, keine Tests, keine lokalen Zugangsdaten.
$files = @(
  'index.html', 'styles.css', 'app.js', 'runtime.js', 'adaptive-learning.js', 'model-prompts.js', 'model-client.js', 'model-monitor.js', 'task-engine.js', 'chapter-one.js', 'chapter-two.js', 'chapter-three.js', 'branch-workshop.js', 'task-variation.js', 'interaction-forms.js', 'advanced-lessons.js', 'learning-program.js', 'lesson-tools.js', 'lernbausteine.py',
  'skills\catalog.json',
  'skills\zuweisung-reihenfolge\SKILL.md',
  'skills\zuweisung-reihenfolge\content.de.md',
  'skills\zuweisung-reihenfolge\templates.json',
  'skills\zuweisung-reihenfolge\examples.json',
  'skills\zuweisung-reihenfolge\tools\validate.js',
  'skills\zuweisung-reihenfolge\tools\evaluate.js',
  'skills\aktueller-zustand\SKILL.md',
  'skills\aktueller-zustand\content.de.md',
  'skills\aktueller-zustand\templates.json',
  'skills\aktueller-zustand\examples.json',
  'skills\anweisungsreihenfolge\SKILL.md',
  'skills\anweisungsreihenfolge\content.de.md',
  'skills\anweisungsreihenfolge\templates.json',
  'skills\anweisungsreihenfolge\examples.json',
  'skills\zahlenwert-uebernehmen\SKILL.md',
  'skills\zahlenwert-uebernehmen\content.de.md',
  'skills\zahlenwert-uebernehmen\templates.json',
  'skills\zahlenwert-uebernehmen\examples.json',
  'skills\bedingungen-grenzfaelle\SKILL.md',
  'skills\bedingungen-grenzfaelle\content.de.md',
  'skills\bedingungen-grenzfaelle\templates.json',
  'skills\bedingungen-grenzfaelle\examples.json',
  'skills\verzweigungen\SKILL.md',
  'skills\verzweigungen\content.de.md',
  'skills\verzweigungen\templates.json',
  'skills\verzweigungen\examples.json',
  'skills\entscheidungsketten\SKILL.md',
  'skills\entscheidungsketten\content.de.md',
  'skills\entscheidungsketten\templates.json',
  'skills\entscheidungsketten\examples.json',
  'skills\codeaenderungen-entscheidungen\SKILL.md',
  'skills\codeaenderungen-entscheidungen\content.de.md',
  'skills\codeaenderungen-entscheidungen\templates.json',
  'skills\codeaenderungen-entscheidungen\examples.json',
  'skills\feste-wiederholungen\SKILL.md',
  'skills\feste-wiederholungen\content.de.md',
  'skills\feste-wiederholungen\templates.json',
  'skills\feste-wiederholungen\examples.json',
  'skills\bedingte-wiederholungen\SKILL.md',
  'skills\bedingte-wiederholungen\content.de.md',
  'skills\bedingte-wiederholungen\templates.json',
  'skills\bedingte-wiederholungen\examples.json',
  'skills\zaehler-und-summen\SKILL.md',
  'skills\zaehler-und-summen\content.de.md',
  'skills\zaehler-und-summen\templates.json',
  'skills\zaehler-und-summen\examples.json',
  'skills\schleifenaenderungen\SKILL.md',
  'skills\schleifenaenderungen\content.de.md',
  'skills\schleifenaenderungen\templates.json',
  'skills\schleifenaenderungen\examples.json'
)
# Fixed resource names for explicitly registered, validated skill directories.
# This keeps future chapter resources in the same positive allowlist contract.
$packageRegistry = Get-Content -Raw -LiteralPath (Join-Path $projectRoot 'skills/catalog.json') | ConvertFrom-Json
foreach ($packageSkill in $packageRegistry.skills) {
  if ($packageSkill -notmatch '^[a-z][a-z0-9-]*$') { throw 'Ungültiger Skillpfad im Paketregister.' }
  foreach ($packageResource in @('SKILL.md', 'content.de.md', 'templates.json', 'examples.json')) {
    $packageRelativePath = 'skills\' + $packageSkill + '\' + $packageResource
    if ($files -notcontains $packageRelativePath) { $files += $packageRelativePath }
  }
}
foreach ($relativePath in $files) {
  $sourcePath = Join-Path $projectRoot $relativePath
  $destinationPath = Join-Path $targetDir $relativePath
  New-Item -ItemType Directory -Path (Split-Path -Parent $destinationPath) -Force | Out-Null
  Copy-Item -LiteralPath $sourcePath -Destination $destinationPath -Force
}
$archivePath = Join-Path $releaseDir 'code-verstehen.zip'
# Nur freigegebene Dateien packen, auch falls im dist-Ordner zusätzliche Dateien liegen.
Add-Type -AssemblyName System.IO.Compression
$stream = [System.IO.File]::Open($archivePath, [System.IO.FileMode]::Create)
try {
  $zip = [System.IO.Compression.ZipArchive]::new($stream, [System.IO.Compression.ZipArchiveMode]::Create)
  try {
    foreach ($relativePath in $files) {
      $entryName = 'code-verstehen/' + $relativePath.Replace('\','/')
      $entry = $zip.CreateEntry($entryName)
      $entryStream = $entry.Open()
      try {
        $bytes = [System.IO.File]::ReadAllBytes((Join-Path $targetDir $relativePath))
        $entryStream.Write($bytes, 0, $bytes.Length)
      } finally { $entryStream.Dispose() }
    }
  } finally { $zip.Dispose() }
} finally { $stream.Dispose() }
Write-Output "Statisches Paket: $archivePath"
