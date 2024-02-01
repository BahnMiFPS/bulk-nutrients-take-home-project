'use client';
import React, { Fragment, useState } from 'react';
import { Button, Flex } from '@tremor/react';
import { Dialog, Transition } from '@headlessui/react';
import {
  ArrowUturnDownIcon,
  ArrowUturnUpIcon
} from '@heroicons/react/24/outline';

import { IFlavourBreakdown } from '../Charts/FlavourBreakdown';

import { FlavourTable } from './FlavourTable';

interface IFlavourDataPanelProps {
  displayData: IFlavourBreakdown[];
  totalValue: number;
  children: React.ReactNode;
}

export function FlavourDataPanel({
  displayData,
  totalValue,
  children
}: IFlavourDataPanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <Flex flexDirection="col" className="w-full items-start ">
      {children}
      <FlavourTable
        data={displayData.slice(0, 5)}
        totalValue={totalValue}
        tableCSS="w-full"
      />
      <div className="w-full inset-x-0 bottom-0 right-0 flex justify-center bg-gradient-to-t from-white dark:from-black pt-2 pb-2 absolute rounded-b-lg z-21">
        <Button
          icon={ArrowUturnDownIcon}
          className="bg-white shadow-md border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
          onClick={openModal}
        >
          Expand
        </Button>
      </div>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900   bg-opacity-25" />
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
                <Dialog.Panel
                  className="w-full max-w-xl transform overflow-hidden ring-tremor bg-white dark:bg-black dark:text-white
                                    p-6 text-left align-middle shadow-tremor transition-all rounded-xl"
                >
                  <div className="relative mt-3">
                    {children}
                    <FlavourTable
                      data={displayData}
                      totalValue={totalValue}
                      tableCSS="h-[400px]"
                      isModalTable={true}
                    />
                  </div>
                  <Button
                    icon={ArrowUturnUpIcon}
                    className="mt-5 w-full border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
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
    </Flex>
  );
}
