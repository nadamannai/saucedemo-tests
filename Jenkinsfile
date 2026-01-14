pipeline {
    agent any

    options {
        timestamps()
    }

    stages {

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh '''
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
                        sh 'robot robot_tests/login.robot'
                    }
                }

                stage('Selenium Tests') {
                    steps {
                        echo 'Running Selenium tests'
                        sh 'pytest selenium_tests/'
                    }
                }

                stage('Playwright Tests') {
                    steps {
                        echo 'Running Playwright tests'
                        sh 'pytest playwright_tests/'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Archiving test results'
            archiveArtifacts artifacts: '**/output.xml, **/log.html, **/report.html', fingerprint: true
        }

        success {
            echo 'All parallel tests passed ✅'
        }

        failure {
            echo 'Some tests failed ❌'
        }
    }
}
