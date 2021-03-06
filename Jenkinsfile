pipeline {
  agent {
    docker {
     image 'node:lts-alpine3.10'
     args '-p 3000:3000'
    }
  }
  environment {
    CI = ''
    HOME = '.'
    npm_config_cache = 'npm-cache'
  }
  stages {
    stage('clear cache') {
      steps {
        sh 'npm cache clean --force'
      }
    }
    stage('Delete node_modules & package-lock.json') {
      steps {
        sh 'rm -rf node_modules package-lock.json'
      }
    }
    stage('Install Packages') {
      steps {
        sh 'npm install'
      }
    }
    stage('Create Build Artifacts') {
      steps {
        sh 'npm run build'
      }
    }
    stage('Production') {
    steps {
      withAWS(region:'us-east-1',credentials:'AWSCredentialsID') {
        s3Delete(bucket: 'robert-connell-batch-906-frontend', path:'**/*')
        s3Upload(bucket: 'robert-connell-batch-906-frontend', workingDir:'build', includePathPattern:'**/*');
        }
      }
    }
    stage('Post-Production') {
      steps {
        sh 'rm -rf node_modules npm-cache/_cacache'
      }
    }
   }
}