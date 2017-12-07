npx selenium-standalone install &&
npx selenium-standalone start & 
react-native start --reset-cache &
npx fructose-web -d fructose &

npx dextrose --config ./fructose/dextrose.web.js -t 2000 --loglevel verbose