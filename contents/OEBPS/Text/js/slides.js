(function () {

    let slides = document.querySelectorAll("[data-slide]");

    let slideKeys = Array.prototype.map.call(slides, function (e) {
        return e.dataset.slide;
    });

    let gong = document.getElementById("gong");

    let instructorModeCheckbox = document.getElementById("instructor-mode");

    instructorModeCheckbox.checked = isInstructorMode();
    instructorModeCheckbox.addEventListener("change", setInstructorMode);

    window.addEventListener("keyup", (function (event) {
        if (isInstructorMode() && !isTextInput(event.target)) {

            let key = event.code === "Slash" ? "?" : event.key;  // special treatment for help key, so it doesn't need shift held

            if (key === "0") {
                event.preventDefault();
                stopGong();
                gong.play()
            }
            else if (key === "x" || key === "Enter" || key === "Escape") {
                event.preventDefault();
                stopGong();
                hideSlides();
            }
            else if (slideKeys.includes(key)) {
                event.preventDefault();
                hideSlides();
                showSlide(key);
            }
        }
    }));

    function isTextInput(target) {
        return target.tagName === "INPUT" && target.type !== "checkbox";
    }

    function showSlide(key) {
        document.querySelectorAll('[data-slide="' + key + '"]').forEach(function (slideElement) {
            slideElement.style.display = "flex";
            slideElement.querySelectorAll("[data-time]").forEach(function (timeElement) {
                let minutesAhead = parseInt(timeElement.dataset.time, 10);
                timeElement.value = formatFutureTime(minutesAhead)
            });
        });
    }

    function formatFutureTime(minutesAhead) {
        let end = new Date();
        end.setMinutes(end.getMinutes() + minutesAhead);
        return hours(end) + ":" + minutes(end) + meridian(end);
    }

    function hideSlides() {
        slides.forEach(function (element) {
            element.style.display = "none";
        });
    }

    function stopGong() {
        gong.pause();
        gong.currentTime = 0;
    }

    function setInstructorMode() {
        localStorage.setItem("instructor-mode", instructorModeCheckbox.checked)
    }

    function isInstructorMode() {
        return localStorage.getItem("instructor-mode") === "true";
    }

    function minutes(time) {
        let minutes = time.getMinutes();

        return minutes < 10 ? "0" + minutes : minutes;
    }

    function hours(time) {
        return (time.getHours() - 1) % 12 + 1;
    }

    function meridian(time) {
        if (time.getHours() < 12) {
            return "am";
        } else {
            return "pm";
        }
    }
})();
