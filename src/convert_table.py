import pandas as pd
import numpy as np

import argparse


def main(input_fn, output_fn):
	excelfile = pd.ExcelFile(input_fn)
	sheets = excelfile.sheet_names
	data = pd.read_excel(excelfile, sheet_name=sheets)

	for s in sheets:
		data[s]["category"] = s

	data_combined = pd.concat([data[s] for s in sheets])
	data_combined = data_combined.reset_index()

	data_combined.to_json(output_fn, orient="records", indent=4)


if __name__ == "__main__":
	parser = argparse.ArgumentParser(description="Convert the spreadsheet to a JSON for the site.")
	parser.add_argument("input", type=str, help="Path to input spreadsheet as an excel file")
	parser.add_argument("output", type=str, help="Path to output JSON file")
	args = parser.parse_args()
	main(args.input, args.output)
