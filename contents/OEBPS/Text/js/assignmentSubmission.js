class AssignmentSubmission {
  constructor() {
    this.getCredentialsFromCourseServer(
      this.getCohortId(),
      this.isReview(),
      this.submitAssignment
    );
  }
  createCorsRequest(method, url) {
    let xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      xhr.open(method, url, true);
      xhr.setRequestHeader("Content-Type", "application/json")
    } else if (typeof XDomainRequest != "undefined") {
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      xhr = null;
    }
    return xhr;
  }

  makeCorsRequest(xhr, url, jsonBody) {
    xhr.send(JSON.stringify(jsonBody));
  }

  getCredentialsFromCourseServer(cohortId, review, callback) {
    let credsHostname = review === true ? "courses-review.education.pivotal.io" : "courses.education.pivotal.io";
    let url = "https://" + credsHostname + "/credentials/" + cohortId;
    let xhr = this.createCorsRequest("GET", url);
    let self = this;
    xhr.callback = callback;
    xhr.onload = function () {
      this.callback.apply(self, [this, review]);
    };

    xhr.send();
  }

  isReview() {
    let parsedHostname = document.location.hostname;
    return (parsedHostname === "localhost" || parsedHostname.indexOf("review") !== -1);
  }

  getCohortId() {
    return document.location.pathname.split("/")[2];
  }

  submitAssignment(xhr, review) {
    let assignmentsHostname = review === true ? "assignments-review.education.pivotal.io" : "assignments.education.pivotal.io";

    let responseJSON = JSON.parse(xhr.responseText);

    let assignmentCode = this.getAssignmentCode();
    let url = "https://" + assignmentsHostname + "/assignments/" + assignmentCode + "/submissions";

    let jsonBody = {
      "courseCode": responseJSON.courseCode,
      "studentEmail": responseJSON.userEmail,
      "success": true
    };

    let submissionXhr = this.createCorsRequest('POST', url);
    this.makeCorsRequest(submissionXhr, url, jsonBody);
  }

  getAssignmentCode() {
    let assignment = document.getElementById("assignment-submit-button").dataset.assignment;
    return (typeof assignment === "undefined" ? "" : assignment);
  }
};

(function () {
  let assignmentSubmitButton = document.getElementById("assignment-submit-button");
  if (assignmentSubmitButton) {
    assignmentSubmitButton.addEventListener("click", handleAssignmentSubmissionClicked);
  }

  function handleAssignmentSubmissionClicked() {
    new AssignmentSubmission();
  }
})();
