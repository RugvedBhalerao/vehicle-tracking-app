pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'rugved28/vehicle-tracking-app'  // Name of your Docker image in Docker Hub
        IMAGE_TAG = "${DOCKER_IMAGE}:latest"  // Tag image with build ID
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
                    echo "Building Docker image: ${IMAGE_TAG}"
                    docker.build("${IMAGE_TAG}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        // Login to Docker Hub using docker login command
                        echo "Logging in to Docker Hub"
                        sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"

                        // Push the built image to Docker Hub
                        echo "Pushing Docker image: ${IMAGE_TAG} to Docker Hub"
                        sh "docker push ${IMAGE_TAG}"
                    }
                }
            }
        }
    }

    post {
        always {
            // Clean up Docker images from Jenkins after the job is finished
            echo "Cleaning up Docker image: ${IMAGE_TAG}"
            sh "docker rmi ${IMAGE_TAG}" // Remove image after push
        }
    }
}
