cls
node dojo/dojo.js load=build --profile pin.profile.js --release
del release\*.uncompressed.js /S /Q
komodo release\build-report.txt