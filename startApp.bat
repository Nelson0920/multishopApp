@echo off
title Multishop App - Iniciando Servicios
cd /d %~dp0

@REM echo Iniciando App en una nueva pestaña...
start cmd /k "title App && cd frontend/mutishop && npm run dev"

echo Iniciando Servidor en una nueva pestaña...
start /b cmd /c "cd backend/src/server && npm run dev"

echo Iniciando Servidor de MongoDb en una nueva pestaña...
start /b cmd /c "mongod --replSet rs0 --bind_ip localhost"

echo El proyecto esta en ejecución.
echo Cierra las ventanas para detenerlos manualmente o presiona una tecla para detenerlos automáticamente.
pause >nul

echo Deteniendo todos los procesos...
taskkill /im "npm.exe" /f

exit
