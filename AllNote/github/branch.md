# Working with Github
To show graph
```
git log --all --decorate --oneline --graph  
```
Lists of branches 
```
git branch
```
Creating new branch 
```
git branch <branchname>
```
checking out / switching to a new branch 
```
git checkout <branchname>
```
Visualizing git  commit graph with branches 
```
git diff master..<branchname>
```
#### Git merging changes 
  -- fast forward merge 
  -- 3 way merge 
  ```
  git checkout master
  git merge <branchname>
  ```
  To show merged branch
  ```
  git branch --merged 
  ```
  To delete merged branch
  ```
  git branch -d <branchname>
  ```
  To delete forcefully non merged branch 
   ```
   git branch -D <branchname>
   ```
#### merge conflicts 
To abort merging 
```
git merge --abort
```
else to show conflicting files
```
git status
```
open file and edit perforce conflict way then 
```
git commit 
```

#### Backing out local changes and storing it for later
```
git stash
git stash list 
git stash apply <label>
```
