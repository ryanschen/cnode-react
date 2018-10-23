#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

cd build

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME
rm -rf .git
git init
git add -A
git commit -m 'update'

git push -f git@github.com:ryanschen/cnode-react.git master:gh-pages

cd -