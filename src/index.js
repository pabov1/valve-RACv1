filterRecord = () => {
    let input = document.getElementById("searchItem").value.toUpperCase();
    let ul = document.getElementById("myul");
    let li = ul.getElementsByTagName("li");
    let p = document.getElementById("found");
    for (var i = 0; i < li.length; i++) {
        var a = li[i].getElementsByTagName("a")[0];
        var text = a.innerText;
        if (text.toUpperCase().indexOf(input) > -1) {
            li[i].style.display = "";
            p.style.display = "none";
        } else {
            li[i].style.display = "none";
            p.style.display = "block";
        }
    }
};

filterTable = () => {
    let filter = document.getElementById("searchItems").value.toUpperCase();
    let table = document.getElementById("tables");
    let tr = table.getElementsByTagName("tr");
    let p = document.getElementById("founder");
    for (var i = 0; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            var text = td.innerText || td.textContent;
            if (text.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                p.style.display = "none";
            } else {
                tr[i].style.display = "none";
                p.style.display = "block";
            }
        }
    }
};
