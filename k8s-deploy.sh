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
#echo '-------------------------------'
#echo '=====>use-context artemis<====='
#echo '-------------------------------'
#kubectl config set-cluster mycluster.icp --server=https://9.30.250.159:8001 --insecure-skip-tls-verify=true
#kubectl config set-context mycluster.icp-context --cluster=mycluster.icp
#kubectl config set-credentials admin --token=eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF0X2hhc2giOiJ4ZERZVzB1Q0ZCWDFucjJLdlhOei1BIiwiaXNzIjoiaHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCIsImF1ZCI6IjVjNTcyNjM2OGU5NmY0ZDdjN2I1MDQ3YWFkNTFjOWM0IiwiZXhwIjoxNTE5MzcyNTM0LCJpYXQiOjE1MTkzMjkzMzR9.KILZwuWi0EMD5MxZBOi-BA0CD4oW4HrxYcT2u7nOzUZloFOKIJkGcv5WvDZ139urHdemXi8i1__SvoMj5KKou_Gm6ZEzPPYqHyFhEXxSzAMX9LOReziBO-RcPC7yOEEfFp378ZcjtiK2VVg6zWZeW3dGkz07EJjFX5l8eC958UXt8aQWXj-bHI4grGx0WmhnSIdoQq4VneD-46iBDnh9caQt9IkbF6izjTXrSfurE4lWnxkfTO6vTIuydA2nLhIUNNo30iAghj07geRPtO2TSYyw3pFbeTdumQdG1_X0xTolI1v9NaFcduxFO9tRGyAigCTiF_gH0R1WHndXliJKjA
#kubectl config set-context mycluster.icp-context --user=admin --namespace=banksy-ns
#kubectl config use-context mycluster.icp-context
#echo '------------------------------------'
#echo '=====>delete shoe-store-deploy<====='
#echo '------------------------------------'
kubectl delete pod shoe-store-deploy
#sleep 25
#echo '------------------------------------'
#echo '=====>create shoe-store-deploy<====='
#echo '------------------------------------'
#kubectl create -f k8s-config-deploy.json
echo '---------------------------------'
echo '=====>delete shoe-store-pod<====='
echo '---------------------------------'
kubectl delete pod shoe-store-pod
sleep 35
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