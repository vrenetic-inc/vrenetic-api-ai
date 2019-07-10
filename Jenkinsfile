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
  }
}
