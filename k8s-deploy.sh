echo '----------------------------'
echo '=====>build shoe-store<====='
echo '----------------------------'
docker build --no-cache -t shoe-store .
echo '--------------------------'
echo '=====>tag shoe-store<====='
echo '--------------------------'
docker tag shoe-store artemis1.fyre.ibm.com:5000/banksy-ns/shoe-store:latest
echo '-----------------------------'
echo '=====>login to registry<====='
echo '-----------------------------'
docker login -u admin -p passw0rd artemis1.fyre.ibm.com:5000/banksy-ns
echo '---------------------------'
echo '=====>push shoe-store<====='
echo '---------------------------'
docker push artemis1.fyre.ibm.com:5000/banksy-ns/shoe-store:latest
echo '------------------------------------'
echo '=====>delete shoe-store-deploy<====='
echo '------------------------------------'
kubectl delete deployment --namespace=banksy-ns shoe-store-deploy
sleep 35
echo '------------------------------------'
echo '=====>create shoe-store-deploy<====='
echo '------------------------------------'
kubectl create -f ./helm/templates/deployment.json
echo '---------------------------------'
echo '=====>delete shoe-store-pod<====='
echo '---------------------------------'
kubectl delete pod --namespace=banksy-ns shoe-store-pod
sleep 25
echo '---------------------------------'
echo '=====>create shoe-store-pod<====='
echo '---------------------------------'
kubectl create -f ./helm/templates/pod.json
echo '---------------------------------'
echo '=====>delete shoe-store-svc<====='
echo '---------------------------------'
kubectl delete svc --namespace=banksy-ns shoe-store-svc
sleep 1
echo '---------------------------------'
echo '=====>create shoe-store-svc<====='
echo '---------------------------------'
kubectl create -f ./helm/templates/svc.json
echo '-------------------------------'
echo '=====>shoe-store deployed<====='
echo '-------------------------------'