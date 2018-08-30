echo '--------------------------------'
echo '=====>deploy fashion-store<====='
echo '--------------------------------'
echo '=====>delete fashion-store-pod<====='
kubectl delete pod --namespace=ci-test-ns fashion-store-pod
echo '=====> waiting for pod to be deleted'
# while resource still exists wait
rc=$(eval 'kubectl get pods -n ci-test-ns fashion-store-pod')
while [ ! -z "$rc" ] 
do
    rc=$(eval 'kubectl get pods -n ci-test-ns fashion-store-pod')
done
echo '=====>create fashion-store-pod<====='
kubectl create -f ./helm/templates/pod-master.yaml
echo '=====>delete fashion-store-svc<====='
kubectl delete svc --namespace=ci-test-ns fashion-store-svc
# while resource still exists wait
rc=$(eval 'kubectl get svc -n ci-test-ns fashion-store-svc')
while [ ! -z "$rc" ] 
do
    rc=$(eval 'kubectl get svc -n ci-test-ns fashion-store-svc')
done
echo '=====>create fashion-store-svc<====='
kubectl create -f ./helm/templates/svc-master.yaml
echo '----------------------------------'
echo '=====>fashion-store deployed<====='
echo '----------------------------------'
