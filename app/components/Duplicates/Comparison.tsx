'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title
} from '@tremor/react';
import { IDuplicate } from '../../interfaces/global_interfaces';
import { formatDate } from '../../utils/utils';

interface IComparisonTableProps {
  viewingDuplicate?: IDuplicate[];
}

export function Comparison({ viewingDuplicate }: IComparisonTableProps) {
  if (!viewingDuplicate?.length) return null;

  return (
    <>
      <Title>Comparing Fields: {viewingDuplicate[0]?.Fields?.join(', ')}</Title>
      <Table className={`mt-4 `}>
        <TableHead>
          <TableRow>
            <TableHeaderCell className="text-left bg-white dark:bg-black">
              Parameters
            </TableHeaderCell>
            {viewingDuplicate.map((_, index) => (
              <TableHeaderCell
                className="text-left bg-white dark:bg-black"
                key={index}
              >
                Request {index + 1}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(viewingDuplicate[0] ?? {}).map(([key, _]) => {
            if (key === 'Fields') return null;
            return (
              <TableRow key={key}>
                <TableCell
                  className={`text-left font-bold ${
                    viewingDuplicate[0]?.Fields?.includes(key as any)
                      ? 'text-red-600'
                      : ''
                  }`}
                >
                  {key}
                </TableCell>
                {viewingDuplicate.map((duplicate, index) => (
                  <TableCell className="text-left" key={index}>
                    {key === 'Date' && typeof duplicate[key] === 'string'
                      ? formatDate(duplicate[key])
                      : duplicate[key as keyof IDuplicate]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
