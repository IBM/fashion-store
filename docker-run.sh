date

echo '---------------------------'
echo '=====>fashion-store-website - step 1'
echo '---------------------------'
docker stop fashion-store-website
sleep 2

docker rm fashion-store-website
sleep 3

echo '---------------------------'
echo '=====>fashion-store-website - step 2'
echo '---------------------------'

docker build --no-cache -t fashion-store-website .
sleep 2

echo '---------------------------'
echo '=====>fashion-store-website - step 3'
echo '---------------------------'

docker run -d --restart always --name fashion-store-website -p 8080:8080 -e "NODE_ENV=local" fashion-store-website
sleep 2

date
