#!/bin/bash
# ？egrep 处理 - 时错误
# set -e

TARGET_BRANCH=$1
input_mr_title=$2

. .gitlab-private-token.sh
if [ $? != 0 ];then
echo "请检查 token 文件！"
exit 2
fi

if [ -z $TARGET_BRANCH ];then
echo "请输入目标分支名称！"
exit 2
fi

sourceBranch=$(git branch | grep \* | cut -d ' ' -f2)
# sourceBranch="F2ECHD-346-feat-1020" # 测试用

# 提前判断分支合并是否冲突
check_merge_status(){
local_git_status=$(git status|egrep -c "^Untracked|^Changes") # 1 表示存在未暂存文件
if [ $local_git_status == 1 ];then
return 1
fi
current_branch_temp=${sourceBranch}_temp
git checkout -b $current_branch_temp
test_merge_result=$(git merge origin/$TARGET_BRANCH|egrep -c "^CONFLICT") # 1 表示存在冲突
git reset --hard
git checkout $sourceBranch
git branch -D $current_branch_temp
return $test_merge_result
}
check_merge_status
if [ $? == 1 ];then
echo "中止，存在未暂存文件或与目标分支合并时存在冲突！"
exit 2
fi


GITLAB_URL='https://gitlab.dxy.net'
REMOTE_URL=$(git remote -v | grep push | awk '{print $2}')
PROJECT_NAME=$(echo $REMOTE_URL | cut -d ':' -f2 | cut -d '.' -f1) # f2e/dxymom-admin

API_URL=$GITLAB_URL/api/v4
PROJECT_URL=$GITLAB_URL/$PROJECT_NAME # https://gitlab.dxy.net/f2e/dxymom-admin
PROJECT_ID=$PID

urlencode() {
  local length="${#1}"
  for (( i = 0; i < length; i++ )); do
    local c="${1:i:1}"
    case $c in
      [a-zA-Z0-9.~_-]) printf "$c" ;;
    *) printf "$c" | xxd -p -c1 | while read x;do printf "%%%s" "$x";done
  esac
done
}
# echo $(urlencode $title)

targetBranch=$TARGET_BRANCH
# echo $TARGET_BRANCH
parse_source_branch=$(echo $sourceBranch | egrep -o "[0-9A-Z]+-\d+")
# echo $parse_source_branch

if [ -n "$parse_source_branch" ]; then
jira_issue_id=$parse_source_branch
fi

# 最近一次 log message

mr_desc="@libangrui @cph @yzdd "
# echo $mr_desc

# title=$(git log -1 --pretty=%B)
title=$sourceBranch
if [ -n $input_mr_title ];then
title="$title $input_mr_title"
fi
# echo $title
if [ -n "$jira_issue_id" ];then
title="resolve: ${jira_issue_id} $(echo $sourceBranch|cut -d '-' -f3-)"
  if [ -n $input_mr_title ];then
    title="$title $input_mr_title"
  fi
mr_desc="${mr_desc} https://jira.dxy.net/browse/${jira_issue_id}"
fi
# echo $title
echo "git push ..."
git push --set-upstream origin $sourceBranch

echo "Get merge request info ..."
echo "
  projectId: $PROJECT_ID
  sourceBranch: ${sourceBranch}
  targetBranch: ${targetBranch}
  remoteUrl: ${REMOTE_URL}
  title: ${title}
  description: ${mr_desc}
"

# create merge request
createMR() {
  title=$(urlencode "$title")
  mr_desc=$(urlencode "$mr_desc")
  data="source_branch=$sourceBranch&target_branch=$targetBranch&title=$title&id=$PROJECT_ID&remove_source_branch=true&squash=true&description=$mr_desc"
  echo $(curl --header PRIVATE-TOKEN:${PRIVATE_TOKEN} \
    --data $data \
    "$API_URL/projects/$PROJECT_ID/merge_requests" 2>/dev/null)
}

echo "Creating merge request ..."

merge_request_res=$(createMR)
# echo $merge_request_res
merge_request_success=$(echo $merge_request_res|egrep -c \"iid\"\:\\d)
if [ $merge_request_success == 1 ];then
merge_request_id=$(echo $merge_request_res | cut -d ',' -f2 | cut -d ':' -f2)
echo "Create merge request success! The merge_request_id is $merge_request_id"
echo "Click on the link below for more details: $PROJECT_URL/merge_requests/$merge_request_id"
else
echo "
Create merge request Fail!
Detail: $merge_request_res
"
fi