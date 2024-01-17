pipeline {
    agent any
    
    stages {
        stage('Test') {
            when { 
                expression { 
                    env.GIT_BRANCH == 'origin/staging' || env.BRANCH_NAME == 'origin/prod'
                }
            }
            steps {
                echo 'Testing 2'
                sh "whoami && pwd"
                // Add your build steps here
            }
        }
    }
}
