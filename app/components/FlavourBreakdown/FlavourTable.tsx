'use client';
import {
  ProgressBar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow
} from '@tremor/react';

import { formatPercentage } from '../../utils/utils';
import { IFlavourBreakdown } from '../Charts/FlavourBreakdown';

interface IFlavourTableProps {
  data: IFlavourBreakdown[];
  totalValue: number;
  tableCSS?: string;
  isModalTable?: boolean;
}

export function FlavourTable({
  data,
  totalValue,
  tableCSS,
  isModalTable = false
}: IFlavourTableProps) {
  return (
    <Table className={tableCSS}>
      <TableHead className="mb-8">
        <TableRow>
          <TableHeaderCell
            className={`text-left ${
              isModalTable ? 'bg-white dark:bg-black' : ''
            }`}
          >
            Name
          </TableHeaderCell>
          <TableHeaderCell
            className={`text-left  ${
              isModalTable ? 'bg-white dark:bg-black' : ''
            }`}
          >
            Requests
          </TableHeaderCell>
          <TableHeaderCell
            className={`text-left z-40  ${
              isModalTable ? 'bg-white dark:bg-black' : ''
            }`}
          >
            % of total
          </TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.name}>
            <TableCell className="text-left">{item.name}</TableCell>
            <TableCell className="text-left">{item.count}</TableCell>
            <TableCell className="text-left">
              <ProgressBar
                showAnimation={true}
                value={(item.count / totalValue) * 100}
                tooltip={`${formatPercentage(item.count, totalValue)}`}
                label={`${formatPercentage(item.count, totalValue)}`}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
