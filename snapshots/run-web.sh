npx selenium-standalone install &&
npx selenium-standalone start & 
react-native start --reset-cache &
npx webpack --config ./fructose/vendor.webpack.config.js
npx fructose-web -d fructose &

LOGLEVEL=verbose dextrose --config ./fructose/dextrose.web.js