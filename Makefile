env:
	docker-compose kill
	docker-compose rm --all --force
	docker-compose build
	docker-compose up
	
	# @echo "\n Docker environment missing, run: eval \"\$$(docker-machine env default)\"\n"

#######################
## Local dev targets ##
#######################
# build:
# 	docker build -t  dfs.server .
# dfs_1:
# 	docker run -it --rm --name dfs_1 dfs.server
# dfs_2:
# 	docker run -it --rm --name dfs_2 dfs.server
# dfs_3:
# 	docker run -it --rm --name dfs_3 dfs.server
# dfs_4:
# 	docker run -it --rm --name dfs_4 dfs.server