let btnCheck = document.getElementById("flexSwitchCheckDefault");
btnCheck.addEventListener("click", () => {
    let texinfo = document.getElementsByClassName("tax-info");
    for (const info of texinfo) {
        if (info.style.display != "inline") {
            info.style.display = "inline";

        } else {
            info.style.display = "none";

        }
    }


});
