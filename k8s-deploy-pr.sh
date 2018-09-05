echo '-------------------------------'
echo '=====>deploy fashion-store<====='
echo '-------------------------------'
echo '=====>delete fashion-store-pod<====='
kubectl delete pod --namespace=ci-pr-ns fashion-store-pod
echo '=====> waiting for pod to be deleted'
# while resource still exists wait
rc=$(eval 'kubectl get pods -n ci-pr-ns fashion-store-pod')
while [ ! -z "$rc" ] 
do
    rc=$(eval 'kubectl get pods -n ci-pr-ns fashion-store-pod')
done
echo '=====>create fashion-store-pod<====='
kubectl create -f ./helm/templates/pod-pr.yaml
echo '=====>delete fashion-store-svc<====='
kubectl delete svc --namespace=ci-pr-ns fashion-store-svc
# while resource still exists wait
rc=$(eval 'kubectl get svc -n ci-pr-ns fashion-store-svc')
while [ ! -z "$rc" ] 
do
    rc=$(eval 'kubectl get svc -n ci-pr-ns fashion-store-svc')
done
echo '=====>create fashion-store-svc<====='
kubectl create -f ./helm/templates/svc-pr.yaml
echo '---------------------------------'
echo '=====>fashion-store deployed<====='
echo '---------------------------------'
