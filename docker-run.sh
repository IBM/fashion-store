echo '---------------------------------'
echo '=====>run fashion-store'
echo '---------------------------------'
date
echo '=====>docker rm api-controller'
docker stop fashion-store
sleep 2
docker rm fashion-store
sleep 3
echo '=====>docker build'
sh docker-build.sh
echo '=====>docker run'
docker run -d --restart always --name fashion-store -p 8080:8080 -e "NODE_ENV=local" -e "PAYMENTSAPI=http://192.168.1.5:8400/open-banking/v1.1" fashion-store
date
echo '-------------------------------------'
echo '=====>fashion-store running'
echo '-------------------------------------'
