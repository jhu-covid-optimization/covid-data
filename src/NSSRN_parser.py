import pandas as pd
import numpy as np
import re
import os
import argparse
from collections import defaultdict
from dataclasses import asdict, dataclass
from p_tqdm import p_map

@dataclass
class Label:
    start: int
    end: int
    name: str
    label: str = ''

def get_args():
    parser = argparse.ArgumentParser(description='Selects program mode')
    parser.add_argument('--datadir', help='Specify NSSRN survey data directory', type=str, required=True)
    parser.add_argument('--num-lines', help='Specify number of lines to parse at each node', type=int, default=500)
    args = parser.parse_args()
    return args

def get_label_positions(datadir, filename='RN08_CNTY_RecFmt and VarLabels_SPSS.txt'):
    OFFSET1 = 8 # skip first few SPSS lines
    OFFSET2 = 5 # skip lines between positions and label defintions
    OFFSET3 = -2 # skip last few SPSS lines
    with open(os.path.join(datadir, filename)) as f:
        lines = f.readlines()

    label_positions = defaultdict(Label)
    for i, line in enumerate(lines[OFFSET1:]):
        line = line.strip().split()
        if line[0] == '.':
            break
        label_positions[line[0]] = Label(int(line[1]), int(line[3]), line[0])

    for line in lines[i+OFFSET1+OFFSET2:OFFSET3]:
        line = line.strip().split()
        label_positions[line[0]].label = re.sub('"', '', ' '.join(line[1:])).strip()
    label_positions = pd.DataFrame([asdict(label) for label in label_positions.values()])

    return label_positions

def parse_lines(lines):
    entries = []
    for line in lines:
        entry = {}
        i = 0
        while i < len(line) - 1:
            end = label_positions.loc[label_positions.start == i, 'end'].iat[0] + 1
            entry[label_positions.loc[label_positions.start == i, 'name'].iat[0]] = line[i:end].strip()
            i = end
        entries.append(entry)

    return entries


def parse(datadir, label_positions, num_lines, filename='RN08_CNTY_data.DAT'):
    with open(os.path.join(datadir, filename)) as f:
        lines = f.readlines()

    data_split = np.array_split(lines, num_lines)
    entries_list = p_map(parse_lines, data_split)
    entries = pd.DataFrame([entry for entries in entries_list for entry in entries])

    return entries


def main():
    args = get_args()
    label_positions = get_label_positions(args.datadir)
    data = parse(args.datadir, label_positions, args.num_lines)
    data.to_csv(os.path.join(args.datadir, 'NSSRN_parsed.csv'), index=False)


if __name__ == '__main__':
    main()