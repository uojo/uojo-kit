#!/bin/bash
function barch_delete(){
  branch_del_msg=$(git branch -D $1 2>&1)
  exec_code=$?
  if [ $exec_code -eq 0 ];then
  echo "删除成功，分支：$1"
  else
  echo "删除失败，分支：$1 > $branch_del_msg"
  fi
}

function batch_delete_branch_merged(){
  branchs_merged_count=`git branch --merged|grep -c $1`
  echo "已匹配分支数：$branchs_merged_count"
  branchs_merged=`git branch --merged|grep $1`
  echo $branchs_merged
  # 遍历执行删除分支指令
  for branch in $branchs_merged;do
  barch_delete $branch
  done
}
# batch_delete_branch_merged "\s\st\d" # 正则匹配

branch_name_current=`git branch | grep "*"`
git checkout master
batch_delete_branch_merged "-v master"
git checkout ${branch_name_current/* /}