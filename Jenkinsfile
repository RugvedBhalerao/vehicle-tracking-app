pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'rugved28/vehicle-tracking-app'  // Name of your Docker image in Docker Hub
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from GitHub
                git credentialsId: 'github-token', url: 'https://github.com/RugvedBhalerao/vehicle-tracking-app.git', branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image using the Dockerfile in the repo
                    docker.build("${DOCKER_IMAGE}:${BUILD_ID}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Login to Docker Hub and push the built image
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-credentials') {
                        docker.image("${DOCKER_IMAGE}:${BUILD_ID}").push()
                    }
                }
            }
        }
    }

    post {
        always {
            // Clean up Docker images from Jenkins after the job is finished
            sh "docker rmi ${DOCKER_IMAGE}:${BUILD_ID}"
        }
    }
}