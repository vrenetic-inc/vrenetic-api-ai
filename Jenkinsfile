pipeline {
  agent any
  stages {
    stage('Testing') {
      parallel {
        stage('Testing') {
          steps {
            echo 'Test'
          }
        }
        stage('Testing2') {
          steps {
            sleep 15
          }
        }
      }
    }
    stage('') {
      steps {
        echo 'dsfgsdfg'
      }
    }
  }
}
