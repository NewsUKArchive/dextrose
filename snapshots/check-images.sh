RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

rm snaps/hello_worlds.ios.png || echo "hello_worlds.ios.png does not exist"
rm snaps/goodbyeWorld.ios.png || echo "goodbyeWorld.ios.png does not exist"

./run-ios.sh

if [ ! -f snaps/hello_worlds.ios.png ]; then
    printf "${RED}FAILED: hello_world component was not snapped${NC}\n"
    exit 1
fi

if [ ! -f snaps/goodbyeWorld.ios.png ]; then 
    printf "${RED}FAILED: goodbyeWorld component was not snapped${NC}\n"
    exit 1
fi

if [ -f snaps/IGNORE.ios.png ]; then 
    printf "${RED}FAILED: IGNORE component should not have been snapped${NC}\n"
    exit 1
fi
printf "${GREEN}PASSED: Snapped components correctly${NC}\n"
