// JavaScript source code
var meals = document.getElementsByClassName("meals");
var cart = document.getElementById("cart").children[0];
var subtotal = document.getElementById("total");
var send = document.getElementById("send");
var P = 0, G = 0, U = 0, E = 0, H = 0, S = 0, GL = 0, B = 0, money = 0;
for (var i = 0; i < meals.length; i++) {
    meals[i].addEventListener("click", calc);
}
function calc() {
    var tag;
    var text;
    var amount;
    console.log(this.parentNode.id);
    if (this.id == "P" || this.parentNode.id == "PF") {
        tag = document.getElementById("PF");
        text = document.getElementById("PFA");
        if (document.getElementById("PF") == null) {
            var tag = document.createElement("div");
            var text = document.createElement("input");
            text.type = "text";
            text.id = "PFA";
            text.value = 0;
            text.addEventListener("change", calc);
            tag.innerText = "排骨菜飯";
            tag.id = "PF";
            tag.appendChild(text);
            cart.appendChild(tag);
        }
        text.value = parseInt(text.value) + 1;
        if (this.type == "text") {
            text.value = parseInt(text.value) - 1;
        }
        P = parseInt(text.value);
    }
    else if (this.id == "G" || this.parentNode.id == "GF") {
        tag = document.getElementById("GF");
        text = document.getElementById("GFA");
        if (document.getElementById("GF") == null) {
            var tag = document.createElement("div");
            var text = document.createElement("input");
            text.type = "text";
            text.id = "GFA";
            text.value = 0;
            text.addEventListener("change", calc);
            tag.innerText = "雞腿菜飯";
            tag.id = "GF";
            tag.appendChild(text);
            cart.appendChild(tag);
        }
        text.value = parseInt(text.value) + 1;
        if (this.type == "text") {
            text.value = parseInt(text.value) - 1;
        }
        G = parseInt(text.value);
    }
    else if (this.id == "U" || this.parentNode.id == "UF") {
        tag = document.getElementById("UF");
        text = document.getElementById("UFA");
        if (document.getElementById("UF") == null) {
            var tag = document.createElement("div");
            var text = document.createElement("input");
            text.type = "text";
            text.id = "UFA";
            text.value = 0;
            text.addEventListener("change", calc);
            tag.innerText = "魚排菜飯";
            tag.id = "UF";
            tag.appendChild(text);
            cart.appendChild(tag);
        }
        text.value = parseInt(text.value) + 1;
        if (this.type == "text") {
            text.value = parseInt(text.value) - 1;
        }
        U = parseInt(text.value);
    }
    else if (this.id == "E" || this.parentNode.id == "EF") {
        tag = document.getElementById("EF");
        text = document.getElementById("EFA");
        if (document.getElementById("EF") == null) {
            var tag = document.createElement("div");
            var text = document.createElement("input");
            text.type = "text";
            text.id = "EFA";
            text.value = 0;
            text.addEventListener("change", calc);
            tag.innerText = "一大特餐";
            tag.id = "EF";
            tag.appendChild(text);
            cart.appendChild(tag);
        }
        text.value = parseInt(text.value) + 1;
        if (this.type == "text") {
            text.value = parseInt(text.value) - 1;
        }
        E = parseInt(text.value);
    }
    else if (this.id == "H" || this.parentNode.id == "HF") {
        tag = document.getElementById("HF");
        text = document.getElementById("HFA");
        if (document.getElementById("HF") == null) {
            var tag = document.createElement("div");
            var text = document.createElement("input");
            text.type = "text";
            text.id = "HFA";
            text.value = 0;
            text.addEventListener("change", calc);
            tag.innerText = "紅燒牛肉";
            tag.id = "HF";
            tag.appendChild(text);
            cart.appendChild(tag);
        }
        text.value = parseInt(text.value) + 1;
        if (this.type == "text") {
            text.value = parseInt(text.value) - 1;
        }
        H = parseInt(text.value);
    }
    else if (this.id == "S" || this.parentNode.id == "SF") {
        tag = document.getElementById("SF");
        text = document.getElementById("SFA");
        if (document.getElementById("SF") == null) {
            var tag = document.createElement("div");
            var text = document.createElement("input");
            text.type = "text";
            text.id = "SFA";
            text.value = 0;
            text.addEventListener("change", calc);
            tag.innerText = "生鮮魚片";
            tag.id = "SF";
            tag.appendChild(text);
            cart.appendChild(tag);
        }
        text.value = parseInt(text.value) + 1;
        if (this.type == "text") {
            text.value = parseInt(text.value) - 1;
        }
        S = parseInt(text.value);
    }
    else if (this.id == "GL" || this.parentNode.id == "GLF") {
        tag = document.getElementById("GLF");
        text = document.getElementById("GLFA");
        if (document.getElementById("GLF") == null) {
            var tag = document.createElement("div");
            var text = document.createElement("input");
            text.type = "text";
            text.id = "GLFA";
            text.value = 0;
            text.addEventListener("change", calc);
            tag.innerText = "咖哩雞塊";
            tag.id = "GLF";
            tag.appendChild(text);
            cart.appendChild(tag);
        }
        text.value = parseInt(text.value) + 1;
        if (this.type == "text") {
            text.value = parseInt(text.value) - 1;
        }
        GL = parseInt(text.value);
    }
    else {
        tag = document.getElementById("BF");
        text = document.getElementById("BFA");
        if (document.getElementById("BF") == null) {
            var tag = document.createElement("div");
            var text = document.createElement("input");
            text.type = "text";
            text.id = "BFA";
            text.value = 0;
            text.addEventListener("change", calc);
            tag.innerText = "扁魚白菜";
            tag.id = "BF";
            tag.appendChild(text);
            cart.appendChild(tag);
        }
        text.value = parseInt(text.value) + 1;
        if (this.type == "text") {
            text.value = parseInt(text.value) - 1;
        }
        B = parseInt(text.value);
    }

    money = P * 70 + G * 80 + U * 85 + E * 80 + H * 100 + S * 90 + GL * 70 + B * 70;
    subtotal.innerText = "共計 " + money + " 元";
}
send.onclick = function () {
    $("#dialog").dialog("open");
    var msg = "";
    if (P != 0) {
        msg += "排骨菜飯" + P + "份" + "<br>";
    }
    if (G != 0) {
        msg += "雞腿菜飯" + G + "份" + "<br>"
    }
    if (U != 0) {
        msg += "魚排菜飯" + U + "份" + "<br>";
    }
    if (E != 0) {
        msg += "一大特餐" + E + "份" + "<br>";
    }
    if (H != 0) {
        msg += "紅燒牛肉" + H + "份" + "<br>";
    }
    if (S != 0) {
        msg += "生鮮魚片" + S + "份" + "<br>";
    }
    if (GL != 0) {
        msg += "咖哩雞塊" + GL + "份" + "<br>";
    }
    if (B != 0) {
        msg += "扁魚白菜" + B + "份" + "<br>";
    }
    msg += "共計 " + money + " 元";

    $("#dialog").html(msg);

};
$("#dialog").dialog({
    autoOpen: false,
    title: "消費總結",
    modal: true
});