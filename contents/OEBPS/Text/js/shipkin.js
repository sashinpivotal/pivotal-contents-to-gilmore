(function () {
  let sidebar = document.getElementById("sidebar");
  let headerHeight = document.getElementById("content").offsetTop;


  if (sidebar != null) {
    positionSidebar();

    window.addEventListener("scroll", positionSidebar);
    window.addEventListener("touchmove", positionSidebar);
  }

  document.querySelectorAll("[data-url-field]").forEach(fillFeedbackUrl);
  document.querySelectorAll("[data-toggle]").forEach(bindToggle);

  function positionSidebar() {
    if (document.querySelector("html").scrollTop > headerHeight) {
      sidebar.classList.add("top");
    } else {
      sidebar.classList.remove("top");
    }
  }

  function fillFeedbackUrl(element) {
    let urlField = element.getAttribute("data-url-field");
    let href = element.getAttribute("href");

    element.setAttribute("href", href + "?" + urlField + "=" + window.location)
  }

  function bindToggle(element) {
    let id = element.dataset.toggle;
    element.addEventListener("click", function (e) {
      e.preventDefault();

      let target = document.getElementById(id);

      element.classList.toggle("collapsed");
      target.classList.toggle("show");
    })
  }

  class SidebarHeadings {
    constructor() {
      this.headings = {};

      let sidebarEntries = Array.from(document.querySelectorAll("#sidebar a")).slice(2);
      let headingIds = sidebarEntries.map(function (e) {
        return e.href.split("#")[1]
      });

      let self = this;

      headingIds.forEach(function (id) {
        let element = document.getElementById(id);

        let bodyRect = document.body.getBoundingClientRect(),
          elemRect = element.getBoundingClientRect(),
          offset = elemRect.top - bodyRect.top;

        self.headings[offset.toFixed(0)] = id;
      });
    }

    highlight() {
      let closestHeadingPosition = Object.keys(this.headings).find(function (headingPosition) {
        return headingPosition > window.scrollY;
      });

      let closestHeading = this.headings[closestHeadingPosition];

      if (closestHeading === undefined) {
        return;
      }

      document.querySelectorAll('#sidebar a').forEach(function (element) {
        element.classList.remove("highlight")
      });
      document.querySelector('#sidebar a[href="#' + closestHeading + '"]').classList.add("highlight");
    }
  }

  let sidebarHeadings = new SidebarHeadings();

  sidebarHeadings.highlight();

  document.onscroll = function () {
    sidebarHeadings.highlight();
  };
})();
