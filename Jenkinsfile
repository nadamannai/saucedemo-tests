pipeline {
    agent any

    options {
        timestamps()
    }

    stages {

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies on Windows...'
                bat '''
                    python -m pip install --upgrade pip
                    pip install -r requirements.txt
                    playwright install
                '''
            }
        }

        stage('Run Tests In Parallel') {
            parallel {

                stage('Robot Framework Test') {
                    steps {
                        echo 'Running Robot Framework test'
                        bat 'robot robot-tests\\login.robot'
                    }
                }

                stage('Selenium Tests') {
                    steps {
                        echo 'Running Selenium tests'
                        bat 'pytest selenium-tests'
                    }
                }

                stage('Playwright Tests') {
                    steps {
                        echo 'Running Playwright tests'
                        bat 'pytest playwright-tests'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Archiving test results'
            archiveArtifacts artifacts: '**/*.xml, **/*.html', fingerprint: true
        }

        success {
            echo 'All parallel tests passed ✅'
        }

        failure {
            echo 'Some tests failed ❌'
        }
    }
}
