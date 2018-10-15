echo '---------------------------------'
echo '=====>run fashion-store'
echo '---------------------------------'

echo '=====>docker rm'
docker stop fashion-store
docker rm fashion-store
sleep 2

echo '=====>docker build'
docker build --no-cache -t fashion-store .

echo '=====>docker run'
docker run -d --restart always --name fashion-store -p 8080:8080 -e "NODE_ENV=local" fashion-store

echo '---------------------------------'
echo '=====>fashion-store running'
echo '---------------------------------'
