@Library('vrenetic-jenkins-shared')
import com.vrenetic.*

pipeline {
  environment {
    registry = "vrenetic/vrenetic-api-ai"
    registryCredential = 'docker_vrenetic_hub'
  }
  agent {
      label 'jenkins-java-slave'
  }
  stages {
    stage('Set version') {
      steps {
        script {
            def packageJson = readJSON file: "src/package.json"
            version = packageJson.version
        }
      }
    }
    stage('Build docker image') {
      environment {
        NEXUS_CREDENTIALS = credentials('nexus_credentials')
        NEXUS_AUTH = "${env.NEXUS_CREDENTIALS_USR}:${env.NEXUS_CREDENTIALS_PSW}"
      }
      steps {
        echo "Building api docker image ${version}"
        script {
          setupDocker()
          dockerImage = docker.build("${registry}:${version}", "--build-arg NEXUS_USER_AND_PASS=${NEXUS_AUTH} .")
        }
      }
    }
    stage('Push') {
      steps {
        echo 'Push image to dockerhub'
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }
    stage('deploy to k8s-development') {
        agent {
            label 'vrenetic-deployer'
        }
        steps {
            withCredentials([file(credentialsId: 'kubectl_config', variable: 'FILE')]) {
                sh 'mkdir -p ${HOME}/.kube && cp $FILE $HOME/.kube/config'
            }
            sh "kubectl config use-context k8s-development.vrenetic.io"
            sh "helm init --client-only"
            withCredentials([string(credentialsId: 'vrenetic_helm_repo', variable: 'vreneticHelmRepo')]) {
                script {
                    sh "curl ${vreneticHelmRepo}/index.yaml -o /tmp/index.yaml"
                    chart_version = sh (
                        script: "cat /tmp/index.yaml|grep 'name: vrenetic-ai-service' -3|grep version |awk '{print \$2}'|sort -V |tail -n1",
                        returnStdout: true
                    ).trim()
                    sh "helm upgrade --install --force --version=${chart_version} --repo=${vreneticHelmRepo} --set=imageVersion=${version} --wait --timeout=300 --namespace=development ai-service-development vrenetic-ai-service"
                }
            }
        }
    }
  }
}
