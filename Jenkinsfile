pipeline {
    agent any
    stages {
       stage('Scm checkout'){
        git branch: 'main', credentialsId: 'git-creds', url: 'https://github.com/yorknguyen/react-app-jenkins.git'
		
    }
    stage('NPM install'){
        def npmHome = tool name: 'node-3', type: 'nodejs'
    }
   stage('Initialize'){
        def dockerHome = tool 'myDocker'
        env.PATH = "${dockerHome}/bin:${env.PATH}"
    }
    stage('Build Docker Image'){
     sh 'docker build -t 3008199611/gmc_react .'
   }
   stage('Push Docker Image'){
      withCredentials([string(credentialsId: 'docker-pwd', variable: 'dockerHubPwd')]) {
        sh "docker login -u 3008199611/gmc_react -p ${dockerHubPwd}"
     }
     sh 'docker push gmc_react/my-app'
   }
   stage('Run Container on Dev Server'){
     def dockerRun = 'docker run -d -p 3000:80 --name gmc_react  3008199611/gmc_react'
     sshagent(['dev-server']) {
       sh "ssh -o StrictHostKeyChecking=no ec2-user@172-31-17-7 ${dockerRun}"
     }
   }
    }
}

