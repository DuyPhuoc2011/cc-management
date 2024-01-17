pipeline {
    agent any
    
    stages {
        stage('Test') {
            when { 
                expression { 
                    env.BRANCH_NAME == 'origin/staging' || env.BRANCH_NAME == 'origin/prod'
                }
            }
            steps {
                echo 'Testing 1'
                sh "whoami && pwd"
                // Add your build steps here
            }
        }
    }
}
