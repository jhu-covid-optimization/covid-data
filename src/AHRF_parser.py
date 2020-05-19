import pandas as pd
import numpy as np
import re
import os
import argparse

def get_args():
    parser = argparse.ArgumentParser(description='Selects program mode')
    parser.add_argument('--datadir', help='Specify NSSRN survey data directory', type=str, required=True)
    parser.add_argument('--num-lines', help='Specify number of lines to parse at each node', type=int, default=500)
    args = parser.parse_args()
    return args


def get_column_labels(datadir, filename='AHRF2018-19.sas'):
    with open(os.path.join(datadir, filename)) as f:
        lines = f.readlines()
        
    for i, line in enumerate(lines):
        if line.strip() == 'label':
            break
    lines = lines[i+1:-2]

    labels = {}
    for line in lines:
        line = line.split()
        labels[line[0].strip()] = re.sub('"', '', ' '.join(line[2:]).strip())

    return labels

def parse(datadir, labels, num_lines, filename='ahrf2019.sas7bdat'):
    df = pd.read_sas(os.path.join(datadir, filename), format='sas7bdat', encoding='latin1')
    df = df.rename(cols, axis=1)

    return df


def main():
    args = get_args()
    labels = get_column_labels(args.datadir)
    data = parse(args.datadir, labels, args.num_lines)
    data.to_csv(os.path.join(args.datadir, 'AHRF_2019.csv'), index=False)


if __name__ == '__main__':
    main()