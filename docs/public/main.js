let container = document.getElementById("table-area");

toTitlecase = s => s.split(' ').map(w => w[0].toUpperCase() + w.substr(1)).join(' ');

function setupTable(table_data, is_wide=false) {

	let cols = Object.keys(table_data[0])
	let colTitles = cols.map(c => toTitlecase(c.replace(/_/g, " ")));

	let table = document.createElement("table");
	table.className = "table is-hoverable is-fullwidth";

	let tablehead = document.createElement("thead");
	let tablebody = document.createElement("tbody");

	tablebody.className = "is-family-monospace";

	let header = document.createElement("tr");
	colTitles.forEach(colname => {
		let el = document.createElement("th");
		el.innerHTML = colname;
		header.appendChild(el);
	});
	tablehead.appendChild(header);

	for (let i = 0; i < table_data.length; i++) {
		let row = document.createElement("tr");
		for (let j = 0; j < cols.length; j++) {
			let el = document.createElement("td");
			let d = table_data[i][cols[j]];
			if (typeof d == "undefined") {
				el.innerHTML = "";
			} else if (d == null) {
				el.innerHTML = "";
			} else {
				el.innerHTML = d;
			}
			row.appendChild(el);
		}
		tablebody.appendChild(row);
	}

	let tableContainer = container;
	if (is_wide) {
		tableContainer = document.createElement("div");
		tableContainer.className = "table-container";
		container.appendChild(tableContainer);
	}

	table.appendChild(tablehead);
	table.appendChild(tablebody);
	tableContainer.appendChild(table);
}

setupTable(data, is_wide=true);

let data_raw = [];
for (let i = 0; i < data.length; i++) {
	data_raw.push(JSON.stringify(data[i]));
}

let search_button = document.getElementById("search-button");
let search_input = document.getElementById("search-text");
search_button.addEventListener("click", function(e) {
	e.preventDefault();

	let search_text = search_input.value;
	let data_filtered = [];
	for (let i = 0; i < data.length; i++) {
		let found = data_raw[i].includes(search_text);
		if (found) {
			data_filtered.push(data[i]);
		}
	}

	container.innerHTML = "";
	setupTable(data_filtered, is_wide=true);
});
