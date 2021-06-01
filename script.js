var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        createTable()
    }
};
xhttp.open("GET", "library.xml", true);
xhttp.send();


function createTable() {
    var table = document.createElement('table');
    table.style.width = '100%';
    table.setAttribute('border', '1');
    table.setAttribute('cellpadding', '7');

    var thead = document.createElement("thead")
    var tr = thead.insertRow();
    tr.setAttribute("bgcolor", "#E6E6E6");
    tr.setAttribute("align", "center");
    tr.setAttribute("style", "font-weight: bold;");
    // var td = tr.insertCell();
    addCell(tr, "Название книги");
    addCell(tr, "Жанр");
    addCell(tr, "Тема");
    addCell(tr, "Авторы");
    addCell(tr, "Редакция");
    addCell(tr, "Всего экземпляров");
    addCell(tr, "Выданных экземпляров");
    thead.appendChild(tr);
    table.appendChild(thead);
    
    // "Название книги"
    // "Жанр"
    // "Тема"
    // "Авторы"
    // "Редакция"
    // "Всего экземпляров"
    // "Выданных экземпляров"

    var tbdy = document.createElement('tbody');

    var xmlDoc = xhttp.responseXML;
    
    var books = xmlDoc.getElementsByTagName("book");

    function addCell(tr, value) {
        if (!isNaN(+value)) {
            value = numberToWord(value);
        }

        var td = tr.insertCell();
        td.setAttribute('value', value)
        td.textContent = value;
    };

    for(var bIndex = 0; bIndex < books.length; bIndex++) {
        tr = tbdy.insertRow();
        var title = books[bIndex].getElementsByTagName("title")[0].textContent;
        var genre = books[bIndex].getElementsByTagName("genre")[0].textContent;
        var theme = books[bIndex].getElementsByTagName("theme")[0].textContent;
        var authors = books[bIndex].getElementsByTagName("authors")[0].childNodes;
        var editorialOffice = books[bIndex].getElementsByTagName("editorialOffice")[0].textContent;
        var numbersOfCopiesTotal = books[bIndex].getElementsByTagName("total")[0].textContent;
        var numbersOfCopiesIssued = books[bIndex].getElementsByTagName("issued")[0].textContent;


        addCell(tr, title);
        addCell(tr, genre);
        addCell(tr, theme);

        var authorsList = [];
        for(var i = 0; i < authors.length; i++) {
            var value = authors[i].textContent.trim();
            if(value.length) {
                authorsList.push(value);
            }
        }

        addCell(tr, authorsList.join(", "));
        addCell(tr, editorialOffice);
        addCell(tr, numbersOfCopiesTotal);
        addCell(tr, numbersOfCopiesIssued);

        tbdy.appendChild(tr);
    }
    table.appendChild(tbdy);
    document.body.appendChild(table);
}

function numberToWord(number) {
    var res = "";
    var units = ["ноль", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"]
    if(number.length == 1) {
        return units[number];
    }
    var special = ["десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"]
    var dozens = ["двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"]
    if(number.length == 2) {
        if(number[0] == '1') {
            return special[number[1]];
        }
        var dozen = number[0] - 2;
        res = dozens[dozen];
        number = number.substring(1);
        return res + " " + numberToWord(number);
    }
}
