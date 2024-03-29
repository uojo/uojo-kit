#!/bin/bash
git fetch -p
filter_rule="(HEAD|master|develop)"
branch_remote_count=`git branch --remote|egrep -c -v ${filter_rule}`
echo "远程分支数：$branch_remote_count"

branch_master_merged=`git branch --remote --merged origin/master`
# git branch --remote --merged origin/master|egrep -o "\/[^ ]+"|cut -c 2-|egrep -v "(HEAD|master)"|grep -c "\.+"
branch_filter_rlt=$(echo $branch_master_merged|egrep -o "\/[^ ]+"|cut -c 2-|egrep -v ${filter_rule})

# echo $branch_filter_rlt
# echo '----------'

branch_filter_count=$(echo $branch_filter_rlt|grep -c ".*")
echo "待删除的远程分支数：$branch_filter_count"
if [ $branch_filter_count -eq 0 ];then
echo "无需操作~"
else
echo "开始执行批量删除操作 ..."
branch_batch_delete_result=$(echo $branch_filter_rlt|xargs git push --delete origin )
echo $branch_batch_delete_result
fi