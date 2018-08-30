echo '-------------------------------'
echo '=====>deploy fashion-store<====='
echo '-------------------------------'
echo '=====>delete fashion-store-pod<====='
kubectl delete pod --namespace=ci-dev-ns fashion-store-pod
echo '=====> waiting for pod to be deleted'
# while resource still exists wait
rc=$(eval 'kubectl get pods -n ci-dev-ns fashion-store-pod')
while [ ! -z "$rc" ] 
do
    rc=$(eval 'kubectl get pods -n ci-dev-ns fashion-store-pod')
done
echo '=====>create fashion-store-pod<====='
kubectl create -f ./helm/templates/pod-dev.yaml
echo '=====>delete fashion-store-svc<====='
kubectl delete svc --namespace=ci-dev-ns fashion-store-svc
# while resource still exists wait
rc=$(eval 'kubectl get svc -n ci-dev-ns fashion-store-svc')
while [ ! -z "$rc" ] 
do
    rc=$(eval 'kubectl get svc -n ci-dev-ns fashion-store-svc')
done
echo '=====>create fashion-store-svc<====='
kubectl create -f ./helm/templates/svc-dev.yaml
echo '---------------------------------'
echo '=====>fashion-store deployed<====='
echo '---------------------------------'
