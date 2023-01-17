#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
pnpm build

# 进入生成的文件夹
cd dist

# deploy to github pages

if [ -z "$GITHUB_TOKEN" ]; then
  msg='deploy'
  githubUrl=git@github.com:javascriptfield/dcos.git
else
  msg='来自github actions的自动部署'
  githubUrl=https://javascriptfield:${GITHUB_TOKEN}@github.com/javascriptfield/docs.git
  git config --global user.name "javascriptfield"
  git config --global user.email "15190562801@163.com"
fi
git init
git add -A
git commit -m "${msg}"
git push -f $githubUrl master:gh-pages # 推送到github gh-pages分支

cd -
rm -rf dist
