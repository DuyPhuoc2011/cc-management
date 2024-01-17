pipeline {
    agent any
    environment {
        // PATH_PROJECT = '/var/lib/jenkins/workspace/cc-management-pipeline'
        DOCKER_HUB = 'duyphuoc'
        DOCKER_REPOSITORY = 'cc-management'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        SERVICE_NAME = 'react'
        DOCKER_TAG = "${DOCKER_HUB}/${DOCKER_REPOSITORY}:${SERVICE_NAME}-${env.BRANCH_NAME}-${env.GIT_COMMIT.substring(0, 7)}"
    }
    
    stages {
        stage('Checkout source') {
            steps {
                echo "Checking out source code"
                checkout scm
            }
        }

        stage('Build and push image') {
            when { 
                expression { 
                    env.GIT_BRANCH == 'origin/staging' || env.BRANCH_NAME == 'origin/prod'
                }
            }
            steps {
                script {
                    echo "Building image ${DOCKER_TAG}"
                    env.IMAGE_TAG = ${DOCKER_TAG}
                    sh "docker build --no-cache -t ${DOCKER_TAG} . \
                        && echo ${DOCKERHUB_CREDENTIALS_USR} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin \
                        && docker push ${DOCKER_TAG} \
                        && docker rmi ${DOCKER_TAG}"
                }
            }
        }
    }
}
