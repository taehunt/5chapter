document.querySelectorAll(".tab").forEach((tab) => {
	tab.addEventListener("click", () => {
	  const target = tab.getAttribute("data-target");
  
	  document.querySelectorAll(".tab-content").forEach((section) => {
		section.style.display = "none";
	  });
  
	  document.getElementById(target).style.display = "block";
	});
  });
  