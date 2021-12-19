var works = document.getElementsByClassName("menu-list");
var drop = document.getElementsByClassName("dropdown-menu")[0];
console.log(works.length);
var bg = "";
for (var i = 0; i < works.length; i++) {
    console.log(i);
    works[i].addEventListener("mouseover", function (event) {
        // highlight the mouseover target
        console.log(this);
        for (var j = 0; j < works.length; j++) {
            console.log(works[j]);
            if (works[j] == this) {
                bg = "Cover-"+ j + ".png";
                console.log(bg);
                break;
            }
        }
        drop.style.backgroundImage = "url(" + bg + ")";

        // reset the color after a short delay
    }, false);
    works[i].addEventListener("mouseout", function (event) {
        // highlight the mouseover target
        bg = "";
        drop.style.backgroundImage = "url(" + bg + ")";
        console.log(bg);

        // reset the color after a short delay
    }, false);
}