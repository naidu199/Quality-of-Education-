document.addEventListener("DOMContentLoaded", function () {
	const loginBtn = document.getElementById("loginBtn");
	const loginPopup = document.getElementById("loginPopup");
	const closeBtn = document.getElementById("closeBtn");

	loginBtn.addEventListener("click", function () {
		loginPopup.style.display = "block";
	});

	closeBtn.addEventListener("click", function () {
		loginPopup.style.display = "none";
	});

	window.addEventListener("click", function (event) {
		if (event.target === loginPopup) {
			loginPopup.style.display = "none";
		}
	});
});
