let display = document.getElementById("display");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value;
        let result = eval(expression);
        display.value = result;
    } catch {
        display.value = "Error";
    }
}

document.addEventListener("keydown", function(event) {
    let key = event.key;

    if (
        (key >= "0" && key <= "9") ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "." ||
        key === "%"
    ) {
        appendValue(key);
    }

    if (key === "Enter") {
        calculate();
    }

    if (key === "Escape") {
        clearDisplay();
    }

    if (key === "Backspace") {
        deleteLast();
    }
});