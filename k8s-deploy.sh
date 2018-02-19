echo '----------------------------'
echo '=====>build shoe-store<====='
echo '----------------------------'
docker build --no-cache -t shoe-store .
echo '--------------------------'
echo '=====>tag shoe-store<====='
echo '--------------------------'
docker tag shoe-store registry.ng.bluemix.net/banksy-ns/shoe-store:latest
echo '---------------------------'
echo '=====>push shoe-store<====='
echo '---------------------------'
docker push registry.ng.bluemix.net/banksy-ns/shoe-store:latest
echo '---------------------------------'
echo '=====>delete shoe-store-pod<====='
echo '---------------------------------'
kubectl delete pod shoe-store-pod
sleep 25
echo '---------------------------------'
echo '=====>create shoe-store-pod<====='
echo '---------------------------------'
kubectl create -f k8s-config-pod.json
echo '---------------------------------'
echo '=====>delete shoe-store-svc<====='
echo '---------------------------------'
kubectl delete svc shoe-store-svc
sleep 1
echo '---------------------------------'
echo '=====>create shoe-store-svc<====='
echo '---------------------------------'
kubectl create -f k8s-config-svc.json
echo '-------------------------------'
echo '=====>shoe-store deployed<====='
echo '-------------------------------'