'use client';
import { ElementType, Fragment, useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  Badge,
  Button,
  Card,
  Divider,
  Flex,
  Metric,
  Subtitle,
  Text
} from '@tremor/react';
import { Dialog, Transition } from '@headlessui/react';
import { MultiSelect, MultiSelectItem } from '@tremor/react';

import {
  ICleanedProduct,
  IDuplicate
} from '../../interfaces/global_interfaces';

import { findDuplicates } from '../../utils/findDuplicates';
import { Comparison, DuplicateTable } from '../Duplicates';

interface DuplicatesViewProps {
  data: ICleanedProduct[];
}

const defaultKeys: (keyof ICleanedProduct)[][] = [
  // Same postcode, ordering same product on the same day (4 duplicates)
  ['Date', 'Sample', 'Postcode'],
  // Same postcode and FirstName ordering same product on different days (6 duplicates)
  ['FirstName', 'Sample', 'Postcode'],
  // Same first name, last name (9 duplicates)
  ['LastName', 'FirstName'],
  //   ['LastName', 'Sample', 'Postcode'], (0 duplicate)
  ['LastName', 'FirstName', 'Sample']
  // (0 duplicate)
  // Add more combinations as needed
];

type TMultiSelectOption = {
  value: keyof ICleanedProduct;
  label: keyof ICleanedProduct;
  icon?: ElementType<any>;
};

const multiSelectOptions: TMultiSelectOption[] = [
  // Can add more options here
  // { value: 'all', label: 'All' }
  { value: 'Date', label: 'Date' },
  { value: 'FirstName', label: 'FirstName' },
  { value: 'LastName', label: 'LastName' },
  { value: 'Postcode', label: 'Postcode' },
  { value: 'State', label: 'State' },
  { value: 'Sample', label: 'Sample' },
  { value: 'Product', label: 'Product' },
  { value: 'Flavour', label: 'Flavour' }
];
export function DuplicatesView({ data }: DuplicatesViewProps) {
  const [viewingDuplicate, setViewingDuplicate] = useState<
    IDuplicate[] | undefined
  >(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [keysToCheck, setKeysToCheck] = useState(defaultKeys);
  const [selectedOption, setSelectedOption] = useState<
    TMultiSelectOption[] | string[]
  >([]);

  const openModal = (viewingDuplicate: IDuplicate[]) => {
    setViewingDuplicate(viewingDuplicate);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  const handleSubmitKeys = () => {
    // validate keys
    setSelectedOption([]);
    if (selectedOption.length === 0) return;

    const alreadyExists = keysToCheck.some(
      (fields) => fields.sort().join('') === selectedOption.sort().join('')
    );
    if (alreadyExists) return;

    const newKeys = [...keysToCheck, selectedOption];
    setKeysToCheck(newKeys as (keyof ICleanedProduct)[][]);
  };

  const handleRemoveKeys = (keys: (keyof ICleanedProduct)[]) => {
    const newKeys = keysToCheck.filter((key) => key.join('') !== keys.join(''));
    setKeysToCheck(newKeys);
  };

  const duplicates = findDuplicates(data, keysToCheck);

  return (
    <Card className="">
      <Flex justifyContent="between" alignItems="start">
        <div className="">
          <Text>Approximate Duplicates Found</Text>
          <Flex
            justifyContent="start"
            className="space-x-1"
            alignItems="baseline"
          >
            <Metric>{duplicates.length}</Metric>
            <Text>/ {data.length}</Text>
          </Flex>
        </div>
        <Flex className="max-w-[100px] gap-2 flex-col justify-end items-end md:flex-row md:items-center">
          <MultiSelect
            title="Add keys to compare"
            value={selectedOption as string[]}
            onValueChange={(value) => {
              setSelectedOption(value as string[]);
            }}
          >
            {multiSelectOptions.map((option) => (
              <MultiSelectItem key={option.value} value={option.value} />
            ))}
          </MultiSelect>
          <Button onClick={handleSubmitKeys} size="xs" icon={PlusIcon}>
            Add
          </Button>
        </Flex>
      </Flex>
      <Flex flexDirection="col" alignItems="start" className="my-4">
        <Subtitle>Comparing Fields</Subtitle>
        <div className="h-[100px] overflow-y-auto">
          {keysToCheck.map((keys) => (
            <Badge
              key={keys.join('')}
              className="mr-2 mt-2 hover:opacity-75 cursor-pointer"
              icon={XMarkIcon}
              onClick={() => handleRemoveKeys(keys)}
            >
              {keys.join(', ')}
            </Badge>
          ))}
        </div>
      </Flex>
      <Divider />
      <DuplicateTable duplicates={duplicates} openModal={openModal} />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform overflow-hidden ring-tremor p-6 text-left align-middle shadow-tremor transition-all rounded-xl dark:bg-black bg-white">
                  <div className="relative mt-3">
                    <Comparison viewingDuplicate={viewingDuplicate} />
                  </div>
                  <Button
                    icon={XMarkIcon}
                    className="mt-5 w-full bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
                    onClick={closeModal}
                  >
                    Close
                  </Button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Card>
  );
}
