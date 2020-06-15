const selected_cols = [
	"name",
	"application",
	"geographical",
	"resolution",
	"source",
];

let container = document.getElementById("table-area");
toTitlecase = s => s.split(' ').map(w => w[0].toUpperCase() + w.substr(1)).join(' ');

function setupTable(table_data, is_wide=false) {

	let colTitles = selected_cols.map(c => toTitlecase(c.replace(/_/g, " ")));

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
		selected_cols.forEach(colname => {
			let el = document.createElement("td");
			let val = table_data[i][colname];
			if (typeof val == "undefined" || val == null) {
				el.innerHTML = "";
			} else if (colname == "source") {
				let link = document.createElement("a");
				link.innerHTML = val;
				link.href = val;
				el.appendChild(link);
			} else {
				el.innerHTML = val;
			}
			row.appendChild(el);
		});
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
	data_raw.push(JSON.stringify(data[i]).toLowerCase());
}

let search_button = document.getElementById("search-button");
let search_input = document.getElementById("search-text");

function search(e) {
	e.preventDefault();

	let search_text = search_input.value.toLowerCase();
	let data_filtered = [];
	for (let i = 0; i < data.length; i++) {
		let found = data_raw[i].includes(search_text);
		if (found) {
			data_filtered.push(data[i]);
		}
	}

	container.innerHTML = "";
	setupTable(data_filtered, is_wide=true);
}

search_button.addEventListener("click", search);
search_input.addEventListener("keyup", e => {
	if (e.keyCode === 13) {
		e.preventDefault();
		search(e);
	}
});
