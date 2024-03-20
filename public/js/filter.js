document.addEventListener("DOMContentLoaded", function () {
    const clickdiv = document.querySelectorAll(".filter");
    
    clickdiv.forEach(filter => {
        filter.addEventListener("click", () => {
            const data = filter.querySelector("p");
            if (data) {
                const category = encodeURIComponent(data.innerText.trim()); // Encode category value
                window.location.href = `/listings/filter/${category}`;
                console.log("click", category);
            }
        });
    });
});
