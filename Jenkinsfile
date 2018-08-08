#!groovy

// Set Build Discarder property on branches to save the disk and disable concurrent builds
properties([buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '90', numToKeepStr: '10')), disableConcurrentBuilds(), [$class: 'RebuildSettings', autoRebuild: false, rebuildDisabled: false]]);

// Environment Variables for Jenkinsfile to create a Jenkins Docker Slave Image
// EXECUTOR = Docker Label in your Jenkins Docker Template you want to run this build in Jenkins Docker Cloud defined at (https://yourjenkins/configure).  If using the IBM Jenkins service will be something like taas-swarm
// DOCKER_IMAGE_NAME = Name of your Docker Image you will create
// ART_DOCKER_REGISTRY_HOSTNAME = Artifactory Repository Docker Registry you received after onboarding
// ART_DOCKER_REGISTRY_DOMAIN_NAME = DOMAIN o the hosted Artifactory Instance (ie. artifactory.swg-devops.com for IBM centralized service)
// JENKINS_ARTIFACTORY_CREDENTIAL = create a Global Username / Password variable on your Jenkins master and give it an ID (ie. our example is bcherrin.artifactory.api.key).
//                                  Your USERNAME in the Jenkins Credential will be your IBM intranet password of a user who is in the Write Access Bluegroup to your Artifactory Docker Registry
//                                  Your PASSWORD in the Jenkins Credential will be the API Key you created for that IBM user in IBM Artifactory.
// GITHUB_ORG_NAME = The value in the URL to your GitHub organization (https://github.ibm.com/<GITHUB_ORG_NAME>)
// GITHUB_REPO_NAME = The value in the URL to your GitHub repository (https://github.ibm.com/<GITHUB_ORG_NAME>/<GITHUB_REPO_NAME>/)

env.EXECUTOR='taas-swarm'
env.DOCKER_IMAGE_NAME='fashion-store-website'
env.ART_DOCKER_REGISTRY_SUBFOLDER='banksy'
env.ART_DOCKER_REGISTRY_HOSTNAME='ip-banksy-repo1-docker-local'
env.ART_DOCKER_REGISTRY_DOMAIN_NAME='artifactory.swg-devops.com'
env.JENKINS_ARTIFACTORY_CREDENTIAL='fintech.artifactory.api.key'
env.GITHUB_ORG_NAME='Banksy'
env.GITHUB_REPO_NAME='fashion-store-website'

node("$EXECUTOR") {

  //Check which branch initiated the GitHub push to start this job
  if (env.BRANCH_NAME == 'master') {
     env.IS_PRODUCTION = 'true'
  }
  else if (env.BRANCH_NAME == 'dev') {
     env.IS_STAGING = 'true'
  }
  else {
     env.IS_PRODUCTION = 'false'
  }
  //GitHub Clone repository to the Swarm Service container running the job
  stage("GitHub Clone Docker Image Repository") {
    checkout scm;
  }

  // Obtain an Artifactiry instance, configured in Manage Jenkins --> Configure System:
  def server = Artifactory.server 'na.artifactory.swg-devops.com'
  // If the docker daemon host is not specified, "/var/run/dokcer.sock" is used as a default value:
  def rtDocker = Artifactory.docker server: server

  //Grab Artifactory credentials Jenkins Service provides you for performing a docker login
  //For users this requires you to create a Global Username / Password variable on your Jenkins master and give it an ID (ie. our example is bcherrin.artifactory.api.key)
  withCredentials([usernamePassword(credentialsId: "$JENKINS_ARTIFACTORY_CREDENTIAL", passwordVariable: 'ART_PW', usernameVariable: 'ART_USER')]) {

    buildStep("Build & Publish Docker Image") {
      // Build Docker Image and Push to Artifactory Registry
      if (env.IS_PRODUCTION == 'true') {
        sh """
           docker login "$ART_DOCKER_REGISTRY_HOSTNAME.$ART_DOCKER_REGISTRY_DOMAIN_NAME" -u "$ART_USER" -p "$ART_PW";
           cd "$WORKSPACE/";
           docker build -t "$DOCKER_IMAGE_NAME":latest .;
           docker tag "$DOCKER_IMAGE_NAME":latest "$ART_DOCKER_REGISTRY_HOSTNAME.$ART_DOCKER_REGISTRY_DOMAIN_NAME/$ART_DOCKER_REGISTRY_SUBFOLDER/$DOCKER_IMAGE_NAME":latest;
           docker push "$ART_DOCKER_REGISTRY_HOSTNAME.$ART_DOCKER_REGISTRY_DOMAIN_NAME/$ART_DOCKER_REGISTRY_SUBFOLDER/$DOCKER_IMAGE_NAME":latest;
           """

           // Push a docker image to Artifactory (here we're pushing hello-world:latest). The push method also expects
           // Artifactory repository name (<target-artifactory-repository>).
           // Please make sure that <artifactoryDockerRegistry> is configured to reference the <target-artifactory-repository> Artifactory repository. In case it references a different repository, your build will fail with "Could not find manifest.json in Artifactory..." following the push.
           //
           def buildInfo = rtDocker.push "$ART_DOCKER_REGISTRY_HOSTNAME.$ART_DOCKER_REGISTRY_DOMAIN_NAME/$ART_DOCKER_REGISTRY_SUBFOLDER/$DOCKER_IMAGE_NAME:latest", "$ART_DOCKER_REGISTRY_HOSTNAME"

           // Publish the build-info to Artifactory:
           server.publishBuildInfo buildInfo
      }
      else if (env.IS_STAGING == 'true') {
        sh """
          docker login "$ART_DOCKER_REGISTRY_HOSTNAME.$ART_DOCKER_REGISTRY_DOMAIN_NAME" -u "$ART_USER" -p "$ART_PW";
          cd "$WORKSPACE/";
          docker build -t "$DOCKER_IMAGE_NAME":dev-latest .;
          docker tag "$DOCKER_IMAGE_NAME":dev-latest "$ART_DOCKER_REGISTRY_HOSTNAME.$ART_DOCKER_REGISTRY_DOMAIN_NAME/$ART_DOCKER_REGISTRY_SUBFOLDER/$DOCKER_IMAGE_NAME":dev-latest;
          docker push "$ART_DOCKER_REGISTRY_HOSTNAME.$ART_DOCKER_REGISTRY_DOMAIN_NAME/$ART_DOCKER_REGISTRY_SUBFOLDER/$DOCKER_IMAGE_NAME":dev-latest;
        """

        // Push a docker image to Artifactory (here we're pushing hello-world:latest). The push method also expects
        // Artifactory repository name (<target-artifactory-repository>).
        // Please make sure that <artifactoryDockerRegistry> is configured to reference the <target-artifactory-repository> Artifactory repository. In case it references a different repository, your build will fail with "Could not find manifest.json in Artifactory..." following the push.
        //
        def buildInfo = rtDocker.push "$ART_DOCKER_REGISTRY_HOSTNAME.$ART_DOCKER_REGISTRY_DOMAIN_NAME/$ART_DOCKER_REGISTRY_SUBFOLDER/$DOCKER_IMAGE_NAME:dev-latest", "$ART_DOCKER_REGISTRY_HOSTNAME"

        // Publish the build-info to Artifactory:
        server.publishBuildInfo buildInfo
      }

      // Verify we can successfully:
      // 1.) docker login to Artifactory Docker registry
      // 2.) Build the Docker Image after some local branch change set
      // NOTE: DOES NOT push to Artifactory registry for local branches,  We just want to make sure the development branch changes don't break our image build
      else {
        sh """
          docker login "$ART_DOCKER_REGISTRY_HOSTNAME.$ART_DOCKER_REGISTRY_DOMAIN_NAME" -u "$ART_USER" -p "$ART_PW";
          cd "$WORKSPACE/";
          docker build -t "$DOCKER_IMAGE_NAME:$BRANCH_NAME" .;
          docker tag "$DOCKER_IMAGE_NAME:$BRANCH_NAME" "$ART_DOCKER_REGISTRY_HOSTNAME.$ART_DOCKER_REGISTRY_DOMAIN_NAME/$ART_DOCKER_REGISTRY_SUBFOLDER/$DOCKER_IMAGE_NAME:$BRANCH_NAME";
        """

        // Push a docker image to Artifactory (here we're pushing hello-world:latest). The push method also expects
        // Artifactory repository name (<target-artifactory-repository>).
        // Please make sure that <artifactoryDockerRegistry> is configured to reference the <target-artifactory-repository> Artifactory repository. In case it references a different repository, your build will fail with "Could not find manifest.json in Artifactory..." following the push.
        //
        //def buildInfo = rtDocker.push "$ART_DOCKER_REGISTRY_HOSTNAME.$ART_DOCKER_REGISTRY_DOMAIN_NAME/$ART_DOCKER_REGISTRY_SUBFOLDER/$DOCKER_IMAGE_NAME:$BRANCH_NAME", "$ART_DOCKER_REGISTRY_HOSTNAME"

        // Publish the build-info to Artifactory:
        //server.publishBuildInfo buildInfo
      }
    }
  }
  setBuildStatus("Build complete", "SUCCESS");
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
