'use client';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow
} from '@tremor/react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import { IDuplicate } from '../../interfaces/global_interfaces';

interface IDuplicateTableProps {
  duplicates: IDuplicate[][];
  openModal: (data: IDuplicate[]) => void;
}
export function DuplicateTable({
  duplicates,
  openModal
}: IDuplicateTableProps) {
  return (
    <Table className={`px-0 mt-4 h-[300px]`}>
      <TableHead className={`px-0`}>
        <TableRow>
          <TableHeaderCell
            className={`text-left px-0 bg-tremor-background dark:bg-dark-tremor-background`}
          >
            Fields To Compare
          </TableHeaderCell>
          <TableHeaderCell
            className={`text-left px-0 bg-tremor-background dark:bg-dark-tremor-background`}
          >
            Customer Name
          </TableHeaderCell>
          <TableHeaderCell
            className={`text-right font-bold px-0 bg-tremor-background dark:bg-dark-tremor-background`}
          ></TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {duplicates.map((duplicate, index) => (
          <TableRow key={index}>
            <TableCell className="text-left px-0">
              {duplicate[0]?.Fields.join(', ')}
            </TableCell>
            <TableCell className="text-left px-0">
              {duplicate[0]?.FirstName + ' ' + duplicate[0]?.LastName}
            </TableCell>
            <TableCell className="text-right px-0">
              <Button
                className="mr-2"
                size="xs"
                variant="light"
                icon={ArrowRightIcon}
                iconPosition="right"
                onClick={() => openModal(duplicate)}
              >
                View more
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
