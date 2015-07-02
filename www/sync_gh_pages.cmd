@echo off
start cmd.exe /k git checkout gh-pages
git rebase master 
git push origin gh-pages
git checkout master