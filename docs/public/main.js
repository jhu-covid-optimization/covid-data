const selected_cols = [
	"name",
	"description",
	"category",
	"application",
	"geographical",
	"resolution",
	"source",
];

const filter_cols = [
	"category",
	"application",
	"geographical",
	"resolution",
];

data.sort((a,b) => a.name >= b.name ? 1 : -1);

let container = document.getElementById("table-area");
toTitlecase = s => s.split(' ').map(w => w[0].toUpperCase() + w.substr(1)).join(' ');

function setupTable(table_data, is_wide=false, replace_body=false) {

	let colTitles = selected_cols.map(c => toTitlecase(c.replace(/_/g, " ")));

	let table = document.createElement("table");
	table.id = "main-table";
	table.className = "table is-hoverable is-fullwidth";

	let tablehead = document.createElement("thead");
	let tablebody = document.createElement("tbody");

	tablebody.className = "is-family-monospace";

	let header = document.createElement("tr");
	colTitles.forEach(colname => {
		let el = document.createElement("th");
		let elSpan = document.createElement("span");

		elSpan.className = "th-span";
		elSpan.dataset.colname = colname;
		elSpan.dataset.sortActive = false;
		elSpan.dataset.sortDir = null;
		elSpan.addEventListener("click", sortColumn);

		elSpan.innerHTML = colname;
		elSpan.appendChild(createSortIcon());

		el.appendChild(elSpan);
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

	if (replace_body) {
		const temp = document.getElementById("main-table");
		temp.tBodies[0].replaceWith(tablebody);
		return;
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

function setupFilterForm() {
	let form = document.createElement("div");
	let filterByLabel = document.createElement("label");
	let filterBySelect = document.createElement("select");
	let filterButton = document.createElement("button");
	let resetButton = document.createElement("button");

	let op1 = document.createElement("option");
	op1.text = "None";
	op1.value = "none";
	op1.selected = true;
	filterBySelect.appendChild(op1);
	createOptions(filter_cols.map(toTitlecase), filterBySelect);
	filterBySelect.id = "filter-by-select";

	filterBySelect.addEventListener("change", updateFilterBy);

	let filterBySelectWrapper = document.createElement("span");
	filterBySelectWrapper.className = "select is-fullwidth";
	filterBySelectWrapper.appendChild(filterBySelect);

	filterByLabel.innerHTML = "Filter by:";
	filterByLabel.htmlFor = "filter-by-select";
	filterByLabel.className = "label";

	filterButton.innerHTML = "Filter";
	filterButton.type = "button";
	filterButton.className = "button is-info is-fullwidth";
	filterButton.id = "filter-button";
	filterButton.addEventListener("click", filterTable);

	resetButton.innerHTML = "Reset";
	resetButton.type = "button";
	resetButton.className = "button is-info is-fullwidth";
	resetButton.id = "reset-button";
	resetButton.addEventListener("click", resetTable);

	let filterByField = wrapField(filterByLabel, filterBySelectWrapper, 3);
	let filterButtonField = wrapField(filterButton, null, 3);
	let resetButtonField = wrapField(resetButton, null, 3);

	filterByField.id = "filter-by-field";
	filterButtonField.id = "filter-button-field";
	filterButtonField.style = "display: flex; flex-direction: column; justify-content: flex-end;";
	resetButtonField.style  = "display: flex; flex-direction: column; justify-content: flex-end;";

	form.appendChild(filterByField);
	form.appendChild(filterButtonField);
	form.appendChild(resetButtonField);
	form.className = "field is-horizontal";

	const temp = document.getElementById("table-area");
	temp.parentElement.insertBefore(form, temp);
}

function updateFilterBy() {
	let temp = document.getElementById("filter-value-field");
	if (temp !== null) {
		temp.remove();
	}

	const filterby = document.getElementById("filter-by-select").value.toLowerCase();
	if (filterby === "none") return;

	let filterValueSelect = document.createElement("select");
	let filterValueLabel = document.createElement("label");

	filterValueSelect.id = "filter-value-select";

	filterValueLabel.innerHTML = "Value:";
	filterValueLabel.htmlFor = "filter-value-select";
	filterValueLabel.className = "label";

	let filterValueSelectWrapper = document.createElement("span");
	filterValueSelectWrapper.className = "select is-fullwidth";
	filterValueSelectWrapper.appendChild(filterValueSelect);

	let filterValueField = wrapField(filterValueLabel, filterValueSelectWrapper, 3);
	filterValueField.id = "filter-value-field";

	let filterByField = document.getElementById("filter-by-field");
	filterByField.parentElement.insertBefore(filterValueField, filterByField.nextSibling);

	let allValues = data.map(d => d[filterby]);
	let uniqueValues = allValues.filter(function(item, pos){
		return allValues.indexOf(item) == pos; 
	});
	uniqueValues = uniqueValues.filter(x => (x != null && x != "not available"));
	let options = uniqueValues.sort().map(toTitlecase);
	createOptions(options, filterValueSelect);
}

function wrapField(firstField, secondField=null, fieldWidth=null) {
	let fieldContainer = document.createElement("div");
	fieldContainer.className = "field";
	fieldContainer.appendChild(firstField);
	if (secondField !== null) {
		fieldContainer.appendChild(secondField);
	}
	if (fieldWidth !== null) {
		fieldContainer.classList.add("column", "is-"+fieldWidth);
	}
	return fieldContainer;
}

function createOptions(opts, select) {
	for (let i in opts) {
		let option = document.createElement("option");
		option.text = opts[i];
		option.value = opts[i];
		select.appendChild(option);
	}
}

function filterTable() {
	const filterby = document.getElementById("filter-by-select").value.toLowerCase();
	if (filterby === "none") {
		container.innerHTML = "";
		setupTable(data, is_wide=true);
		return;
	};

	const filterValue = document.getElementById("filter-value-select").value.toLowerCase();

	let filteredData = [];
	for (let i = 0; i < data.length; i++) {
		if (String(data[i][filterby]).toLowerCase() == filterValue) {
			filteredData.push(data[i]);
		}
	}

	container.innerHTML = "";
	setupTable(filteredData, is_wide=true);
}

function resetTable() {
	container.innerHTML = "";
	setupTable(data, is_wide=true);

	document.getElementById("filter-by-select").selectedIndex = 0;
	updateFilterBy();
}

function createSortIcon() {
	let iconContainer = document.createElement("div");
	iconContainer.className = "sort-icon-container";

	let upButton = document.createElement("img");
	let downButton = document.createElement("img");

	upButton.src = "public/caret-up-outline.svg";
	downButton.src = "public/caret-down-outline.svg";

	upButton.className = "sort-icon sort-icon-up";
	downButton.className = "sort-icon sort-icon-down";

	iconContainer.appendChild(upButton);
	iconContainer.appendChild(downButton);

	return iconContainer;
}

function sortColumn(e) {
	let colHeaderElement = e.currentTarget;

	for (let t of colHeaderElement.parentElement.parentElement.children) {
		let temp = t.firstChild;
		if (temp != colHeaderElement) {
			temp.dataset.sortActive = false;
			temp.dataset.sortDir = null;
			temp.lastChild.firstChild.style.opacity = 100;
			temp.lastChild.lastChild.style.opacity = 100;
		}
	}

	if (colHeaderElement.dataset.sortActive == "true") {
		if (colHeaderElement.dataset.sortDir == "up") {
			colHeaderElement.dataset.sortDir = "down";
			colHeaderElement.lastChild.firstChild.style.opacity = 0;
			colHeaderElement.lastChild.lastChild.style.opacity = 100;
		} else {
			colHeaderElement.dataset.sortDir = "up";
			colHeaderElement.lastChild.firstChild.style.opacity = 100;
			colHeaderElement.lastChild.lastChild.style.opacity = 0;
		}
	} else {
		colHeaderElement.dataset.sortActive = true;
		colHeaderElement.dataset.sortDir = "up";
		colHeaderElement.lastChild.firstChild.style.opacity = 100;
		colHeaderElement.lastChild.lastChild.style.opacity = 0;
	}

	const sortCol = colHeaderElement.dataset.colname.toLowerCase();
	let values = data.map(d => d[sortCol]);
	let ind = argsort(values);
	let sortedData = ind.map(i => data[i]);

	if (colHeaderElement.dataset.sortDir == "down") {
		sortedData = sortedData.reverse();
	}

	setupTable(sortedData, is_wide=true, replace_body=true);
}

argsort = arr => arr.map((x,i) => [i,x]).sort((a,b) => String(a[1]).toLowerCase() >= String(b[1]).toLowerCase() ? 1 : -1).map(x => x[0]);

setupFilterForm();
