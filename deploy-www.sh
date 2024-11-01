#!/bin/bash
host=ubuntu@n7tzu.org
path=/x/egg/egg_home
container=egg_home
rm -Rf www_egg_home.tgz dist/* 
cmd.exe /c npm run build
cd dist
tar -zcvf ../www_egg_home.tgz *
cd ..
scp www_egg_home.tgz $host:$path
ssh $host rm -Rf $path/build
ssh $host mkdir $path/build
ssh $host tar zxvf $path/www_egg_home.tgz -C $path/build
ssh $host docker restart $container
curl --data '{"purge_everything":true}' -X POST -H "Authorization: Bearer PvraE3JNDtLO0eaheDHvje7tKWdvccR8uK7V6bcd" https://api.cloudflare.com/client/v4/zones/10bd363babb1729b6d2ae88b83d0e1ea/purge_cache
