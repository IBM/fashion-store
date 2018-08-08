#!groovy

// Set Build Discarder property on branches to save the disk and disable concurrent builds
properties([buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '90', numToKeepStr: '10')), disableConcurrentBuilds(), [$class: 'RebuildSettings', autoRebuild: false, rebuildDisabled: false]]);

env.EXECUTOR='taas-swarm'

env.DOCKER_IMAGE_NAME='fashion-store'

env.ART_DOCKER_REGISTRY_HOSTNAME='ip-banksy-repo1-docker-local'
env.ART_DOCKER_REGISTRY_DOMAIN_NAME='artifactory.swg-devops.com'
env.ART_DOCKER_REGISTRY_SUBFOLDER='banksy'
env.ART_DOCKER_REPO= "${ART_DOCKER_REGISTRY_HOSTNAME}.${ART_DOCKER_REGISTRY_DOMAIN_NAME}/${ART_DOCKER_REGISTRY_SUBFOLDER}"

env.JENKINS_ARTIFACTORY_CREDENTIAL='fintech.artifactory.api.key'

env.GITHUB_ORG_NAME='Banksy'
env.GITHUB_REPO_NAME='fashion-store-website'

node("$EXECUTOR") {

  setEnvironment();

  stage("Checkout SCM") {
    checkout scm;
  }

  def server
  def rtDocker
  def imageTag

  stage("Artifactory Configuration") {
    server = Artifactory.server( 'na.artifactory.swg-devops.com' )
    buildInfo = Artifactory.newBuildInfo()
    rtDocker = Artifactory.docker server: server

    env.ART_DOCKER_IMAGE_TAG = "${ART_DOCKER_REPO}/${DOCKER_IMAGE_NAME}:${ART_DOCKER_TAG_NAME}"
  }

  withCredentials([usernamePassword(credentialsId: "$JENKINS_ARTIFACTORY_CREDENTIAL", passwordVariable: 'ART_PW', usernameVariable: 'ART_USER')]) {

    stage("Build Docker Image") {
      //TODO add :${env.BUILD_NUMBER}"
      docker.build( "${ART_DOCKER_IMAGE_TAG}")
    }

    stage("Push Docker Image") {
      rtDocker.push( "${ART_DOCKER_IMAGE_TAG}", "${ART_DOCKER_REPO}" )
      server.publishBuildInfo buildInfo
    }

    setBuildStatus("Build complete", "SUCCESS");
  }
}


void buildStep(String message, Closure closure) {
  stage(message){
   try {
     setBuildStatus(message, "PENDING");
     closure();
   } catch (Exception e) {
     setBuildStatus(message, "FAILURE");
     throw e
   }
  }
}

void setBuildStatus(String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.ibm.com/$GITHUB_ORG_NAME/$GITHUB_REPO_NAME"],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins-docker-executor-build/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
}

void setEnvironment() {
  if (env.BRANCH_NAME == 'master') {
    env.IS_PRODUCTION = 'true'
    env.ART_DOCKER_TAG_NAME='master-latest'
  }
  else if (env.BRANCH_NAME == 'dev') {
    env.IS_STAGING = 'true'
    env.ART_DOCKER_TAG_NAME='dev-latest'
  }
  else {
    env.IS_PRODUCTION = 'false'
    // e.g. PR-104-1 for a Pull Request
    env.ART_DOCKER_TAG_NAME='pr-latest'
  }
}
