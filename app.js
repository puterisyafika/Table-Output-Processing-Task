(function () {
    var DELIMITER = ',';
    var NEWLINE = '\n';
    var fileInput = document.getElementById('file');
    var table1 = document.getElementById('table1');
    var table2 = document.getElementById('table2');

    if (!fileInput) {
        return;
    }

    fileInput.addEventListener('change', function () {
        if (fileInput.files && fileInput.files.length > 0) {
            parseCSV(fileInput.files[0]);
        }
    });

    function parseCSV(file) {
        if (!file || !FileReader) {
            return;
        }

        var reader = new FileReader();

        reader.onload = function (e) {
            var csvData = e.target.result;
            toTable(csvData, table1);
            toTable2(csvData, table2);
        };

        reader.readAsText(file);
    }

    function toTable(text, table) {
        if (!text || !table) {
            return;
        }

        // Clear table
        while (table.lastElementChild) {
            table.removeChild(table.lastElementChild);
        }

        var rows = text.split(NEWLINE);
        var headers = rows.shift().split(DELIMITER);
        var htr = document.createElement('tr');

        headers.forEach(function (h) {
            var th = document.createElement('th');
            th.textContent = h;
            htr.appendChild(th);
        });

        table.appendChild(htr);

        rows.forEach(function (r) {
            r = r.trim();
            if (!r) {
                return;
            }

            var cols = r.split(DELIMITER);
            var rtr = document.createElement('tr');

            cols.forEach(function (c) {
                var td = document.createElement('td');
                td.textContent = c.trim();
                rtr.appendChild(td);
            });

            table.appendChild(rtr);
        });
    }

    function toTable2(text, table) {
        if (!text || !table) {
            return;
        }

        // Clear table
        while (table.lastElementChild) {
            table.removeChild(table.lastElementChild);
        }

        var rows = text.split(NEWLINE);
        var headers = rows.shift().split(DELIMITER);

        var data = {};
        rows.forEach(function (row) {
            row = row.trim();
            if (!row) {
                return;
            }

            var cols = row.split(DELIMITER);
            data[cols[0]] = parseFloat(cols[1]);
        });

        var categories = [
            { name: 'Alpha', formula: () => (data['A5'] + data['A20'])},
            { name: 'Beta', formula: () => (data['A15'] / data['A7'])},
            { name: 'Charlie', formula: () => (data['A13'] * data['A12']) }
        ];

        var htr = document.createElement('tr');
        var thCategory = document.createElement('th');
        thCategory.textContent = 'Category';
        var thValue = document.createElement('th');
        thValue.textContent = 'Value';
        htr.appendChild(thCategory);
        htr.appendChild(thValue);
        table.appendChild(htr);

        categories.forEach(function (category) {
            var rtr = document.createElement('tr');
            var tdCategory = document.createElement('td');
            tdCategory.textContent = category.name;
            var tdValue = document.createElement('td');
            tdValue.textContent = category.formula();
            rtr.appendChild(tdCategory);
            rtr.appendChild(tdValue);
            table.appendChild(rtr);
        });
    }
})();
