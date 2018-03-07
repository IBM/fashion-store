echo '----------------------------'
echo '=====>build shoe-store<====='
echo '----------------------------'
docker build --no-cache -t shoe-store .
echo '--------------------------'
echo '=====>tag shoe-store<====='
echo '--------------------------'
# docker tag shoe-store 192.168.99.100:30500/banksy-ns/shoe-store:latest
docker tag shoe-store 192.168.99.100:30500/banksy-ns/shoe-store:latest
echo '-----------------------------'
echo '=====>login to registry<====='
echo '-----------------------------'
#docker login -u admin -p passw0rd 192.168.99.100:30500/banksy-ns
docker login -u admin -p passw0rd 192.168.99.100:30500/banksy-ns
echo '---------------------------'
echo '=====>push shoe-store<====='
echo '---------------------------'
#docker push 192.168.99.100:30500/banksy-ns/shoe-store:latest
docker push 192.168.99.100:30500/banksy-ns/shoe-store:latest
#echo '------------------------------------'
#echo '=====>delete shoe-store-deploy<====='
#echo '------------------------------------'
#kubectl delete deployment --namespace=banksy-ns shoe-store-deploy
#sleep 35
#echo '------------------------------------'
#echo '=====>create shoe-store-deploy<====='
#echo '------------------------------------'
#kubectl create -f ./helm/templates/deployment.json
echo '---------------------------------'
echo '=====>delete shoe-store-pod<====='
echo '---------------------------------'
kubectl delete pod --namespace=banksy-ns shoe-store-pod
sleep 25
echo '---------------------------------'
echo '=====>create shoe-store-pod<====='
echo '---------------------------------'
kubectl create -f ./helm/templates/pod.yaml
#kubectl create -f <(istioctl kube-inject -f ./helm/templates/pod.yaml)
echo '---------------------------------'
echo '=====>delete shoe-store-svc<====='
echo '---------------------------------'
kubectl delete svc --namespace=banksy-ns shoe-store-svc
sleep 1
echo '---------------------------------'
echo '=====>create shoe-store-svc<====='
echo '---------------------------------'
kubectl create -f ./helm/templates/svc.yaml
echo '-------------------------------'
echo '=====>shoe-store deployed<====='
echo '-------------------------------'
