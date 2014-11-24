git add .

MSG=auto'-'`date +%Y%m%d'-'%H%M%S`
git commit -m "$MSG"

git push

work="[OK] ".$(pwd)
echo -e '\E[34m'"\033[1m$work\033[0m"
