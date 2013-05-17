@for /r %%i in (*.less) do @lessc --strict-imports --yui-compress "%%~i" "%%~dpni.css"
