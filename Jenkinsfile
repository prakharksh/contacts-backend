pipeline {
    agent { node {
        label 'docker-alpine-node' 
    }
    }
    options {
        // Override default workspace
        ws('/home/jenkins/app/workspace/contacts_job')
    }
    stages {
        stage('Checkout') {
            steps {
                git(
            url: 'https://github.com/prakharksh/contacts-backend.git',
            branch : 'main',
            credentialsId: '0a0e8906-1718-4e47-861b-f20d1d95dd90'
        )
            }
        }
        stage('build'){
            steps{
                
                echo "build done"
            }
        }
        stage('test'){
            steps{
                
                echo "test done"
            }
        }
        stage('deploy'){
            steps{
                
                echo "deploy done"
            }
        }
    }
}
