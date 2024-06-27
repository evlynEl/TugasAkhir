const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(number);
};

const dolar = (number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "USD",
    }).format(number);
};

function ShowPassword(input, icon) {
    var input = document.getElementById(input);
    var icon = document.getElementById(icon);
    if (input.type === "password") {
        input.type = "text";
        icon.innerHTML = "visibility";
    } else {
        input.type = "password";
        icon.innerHTML = "visibility_off";
    }
}

function Greeting() {
    const time = new Date().getHours();
    let greeting;
    if (6 <= time && time <= 10) {
        greeting = "Selamat Pagi";
    } else if (11 <= time && time <= 14) {
        greeting = "Selamat Siang";
    } else if (15 <= time && time < 18) {
        greeting = "Selamat Sore";
    } else {
        greeting = "Selamat Malam";
    }
    // console.log(time);
    document.getElementById("greeting").innerHTML = greeting;
    document.getElementById("greeting1").innerHTML = greeting;
}
function Detail(x, y) {
    if (document.getElementById(x).style.display == "none") {
        console.log("showDetail");
        document.getElementById(x).style.display = "block";
        document.getElementById(y).innerHTML = "";
        document.getElementById(y).innerHTML = "expand_less";
    } else {
        document.getElementById(x).style.display = "none";
        document.getElementById(y).innerHTML = "expand_more";
    }
}
// function untuk open new tab
function OpenNewTab(url) {
    window.open(url, "_blank").focus();
}

// function untuk open new window create customer

var newWindow;
// Open a new window
function openNewWindow(url) {
    newWindow = window.open(url, "_blank", "fullscreen=yes");
}

// Close the current window
function closeWindow() {
    if (newWindow) newWindow.close();
    else window.close();
}

// textbox search
function filterFunction(input, dropdown) {
    var input, filter, ul, li, a, i;
    input = document.getElementById(input);
    filter = input.value.toUpperCase();
    div = document.getElementById(dropdown);
    a = div.getElementsByTagName("p");
    if (filter.length > 0) {
        for (i = 0; i < a.length; i++) {
            txtValue = a[i].textContent || a[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                a[i].style.display = "";
                div.style.display = "";
            } else {
                a[i].style.display = "none";
                // div.style.display = "none";
            }
        }
    } else {
        for (i = 0; i < a.length; i++) {
            txtValue = a[i].textContent || a[i].innerText;
            a[i].style.display = "none";
            div.style.display = "none";
        }
    }
}

//
function ChangeValue(input, dropdown, value) {
    input = document.getElementById(input);
    input.value = value;
    div = document.getElementById(dropdown);
    div.style.display = "none";
    a = div.getElementsByTagName("p");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        a[i].style.display = "none";
    }
    console.log("yay");
}

//Penjelasan setinputfilter function: https://jsfiddle.net/KarmaProd/tgn9d1uL/4/
function setInputFilter(textbox, inputFilter, errMsg) {
    [
        "input",
        "keydown",
        "keyup",
        "mousedown",
        "mouseup",
        "select",
        "contextmenu",
        "drop",
        "focusout",
    ].forEach(function (event) {
        textbox.addEventListener(event, function (e) {
            if (inputFilter(this.value)) {
                // Accepted value
                if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.classList.remove("input-error");
                    this.setCustomValidity("");
                }
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                // Rejected value - restore the previous one
                this.classList.add("input-error");
                this.setCustomValidity(errMsg);
                this.reportValidity();
                this.value = this.oldValue;
                this.setSelectionRange(
                    this.oldSelectionStart,
                    this.oldSelectionEnd
                );
            } else {
                // Rejected value - nothing to restore
                this.value = "";
            }
        });
    });
}

function updateTitle(menuName) {
    document.getElementById('dynamicTitle').innerHTML = menuName;
}
