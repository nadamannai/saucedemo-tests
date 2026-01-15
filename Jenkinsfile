pipeline {
    agent any

    options {
        timestamps()
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Robot Framework Dependencies') {
            steps {
                dir('robot') {
                    bat '''
                    python -m pip install --upgrade pip
                    python -m pip install -r requirements-robot.txt
                    '''
                }
            }
        }

        stage('Run Robot Framework Tests') {
            steps {
                dir('robot') {
                    bat '''
                    python -m robot --outputdir results tests
                    '''
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'robot/results/**', fingerprint: true
                }
            }
        }

        stage('Install Selenium Python Dependencies') {
            when {
                expression { fileExists('selenium/requirements-selenium.txt') }
            }
            steps {
                dir('selenium') {
                    bat '''
                    python -m pip install -r requirements-selenium.txt
                    '''
                }
            }
        }

        stage('Run Selenium Python Tests') {
            when {
                expression { fileExists('selenium/tests') }
            }
            steps {
                dir('selenium') {
                    bat '''
                    python -m pytest tests
                    '''
                }
            }
        }

        stage('Install Playwright Dependencies') {
            steps {
                dir('playwright') {
                    bat '''
                    npm ci
                    npx playwright install
                    '''
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                dir('playwright') {
                    bat '''
                    npm test
                    '''
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'playwright/playwright-report/**', fingerprint: true
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
        }
        failure {
            echo 'Pipeline failed ❌'
        }
        success {
            echo 'Pipeline succeeded ✅'
        }
    }
}
