echo '-------------------------------'
echo '=====>build fashion-store<====='
echo '-------------------------------'

docker build --no-cache -t fashion-store .

echo '-----------------------------'
echo '=====>tag fashion-store<====='
echo '-----------------------------'

docker tag fashion-store:latest ip-banksy-repo1-docker-local.artifactory.swg-devops.com/banksy/fashion-store/citi:latest

echo '-----------------------------'
echo '=====>login to registry<====='
echo '-----------------------------'
docker login -u 'fintech@us.ibm.com' -p 'pw' https://ip-banksy-repo1-docker-local.artifactory.swg-devops.com
sleep 5

echo '------------------------------'
echo '=====>push fashion-store<====='
echo '------------------------------'

docker push ip-banksy-repo1-docker-local.artifactory.swg-devops.com/banksy/fashion-store/citi:latest

echo '------------------------------------'
echo '=====>delete fashion-store-pod<====='
echo '------------------------------------'
kubectl delete pod --namespace=citi-ns fashion-store-pod
sleep 25

echo '------------------------------------'
echo '=====>create fashion-store-pod<====='
echo '------------------------------------'

kubectl create -f ./helm/templates/pod-nike.yaml

echo '------------------------------------'
echo '=====>delete fashion-store-svc<====='
echo '------------------------------------'
kubectl delete svc --namespace=citi-ns fashion-store-svc
sleep 1

echo '------------------------------------'
echo '=====>create fashion-store-svc<====='
echo '------------------------------------'

kubectl create -f ./helm/templates/svc-nike.yaml

echo '----------------------------------'
echo '=====>fashion-store deployed<====='
echo '----------------------------------'
