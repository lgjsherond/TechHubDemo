import { check, sleep } from 'k6';
import { Kubernetes } from 'k6/x/kubernetes';

export default function(){
    const kubernetes=new Kubernetes({

    });

    const nss = kubernetes.namespaces.list()
    console.log(`${nss.length} Namespaces found:`)
    const info = nss.map(function (ns) {
        return {
        name: ns.name,
        }
    })
  console.log(JSON.stringify(info, null, 2))

  sleep(5);

  const name = "wileytechhuboctober";

  kubernetes.namespaces.apply(getNamespaceYaml(name));
  const ns_list = kubernetes.namespaces.list().map(function(ns){
      return ns.name;
  })
  sleep(1);
  check(ns_list, {'Namespace was created': (n) => n.indexOf(name) != -1});

    // const namespace="TechHub";

    // console.log(`namespaces :`+getNameSpaceList(kubernetes));
    // console.log('New namespaces :'+getPodNameList(kubernetes,namespace));

}

function getNamespaceYaml(name) {
    return `kind: Namespace
apiVersion: v1
metadata:
  name: ` + name + `
  labels:
    name: ` + name + `
`;
}

function getNameSpaceList(kubernetes){
    return kubernetes.namespace.list().map(function(ns){
        return ns.name
    });
}

function getPodNameList(kubernetes,namespace){
    return kubernetes.pods.list(namespace).map(function(pod){
        return pod.name
    })
}