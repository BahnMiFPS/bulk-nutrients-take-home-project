'use client';
import { useMemo, useState } from 'react';
import { Card, DonutChart, Flex, Legend, Title } from '@tremor/react';
import { ICleanedProduct } from '../../interfaces/global_interfaces';
import SelectMenu, { TSelectOption } from '../SelectMenu';
import { formatPercentage } from '../../utils/utils';

type TProductCount = {
  name: string;
  count: number;
};

interface IMostPopularProps {
  data: ICleanedProduct[];
}

const selectOptions: TSelectOption[] = [
  // Can add more options here
  // { value: 'all', label: 'All' }
  { value: '5', label: 'Top 5' },
  { value: '10', label: 'Top 10' },
  { value: '15', label: 'Top 15' }
];

const turnDataIntoDonutData = (
  data: ICleanedProduct[],
  filterValue: string
): TProductCount[] => {
  // reduce method:
  const productCount = data.reduce<Record<string, number>>((acc, item) => {
    acc[item.Product] = (acc[item.Product] || 0) + 1;
    return acc;
  }, {});

  let result = Object.entries(productCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  result = result.slice(0, Number(filterValue) || 5);

  return result;
};

export function MostPopular({ data }: IMostPopularProps) {
  const [filterValue, setFilterValue] = useState<string>('5');
  // const displayData = useMemo(() => {
  //   return turnDataIntoDonutData(data, filterValue);
  // }, [data, filterValue]);

  const displayData = turnDataIntoDonutData(data, filterValue);

  const totalValue = displayData.reduce((acc, item) => acc + item.count, 0);

  const legendCategories = displayData.map(
    (item) => `${item.name} (${formatPercentage(item.count, totalValue)})`
  );

  const customTooltip = ({
    payload,
    active
  }: {
    payload: any[];
    active: boolean;
  }) => {
    if (!active || !payload) return null;
    const categoryPayload = payload[0];
    if (!categoryPayload) return null;
    return (
      <div className="rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border dark:border-dark-tremor-border  dark:text-dark-tremor-default dark:bg-dark-tremor-background dark:shadow-dark-tremor-dropdown z-50">
        <div className="flex flex-1 space-x-2.5">
          <div
            className={`w-1.5 flex flex-col bg-${categoryPayload?.color}-500 rounded`}
          />
          <div className="w-full">
            <div className="flex items-center justify-between space-x-8">
              <p className="text-right text-tremor-content whitespace-nowrap dark:text-dark-tremor-content">
                {categoryPayload.name} (
                {formatPercentage(categoryPayload.value, totalValue)})
              </p>
              <p className="font-medium text-right whitespace-nowrap text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis">
                {categoryPayload.value} samples
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <Flex flexDirection="row">
        <Title className="">
          Top {filterValue || 5} Most Popular Product Requested
        </Title>

        <SelectMenu
          value={filterValue}
          setValue={setFilterValue}
          options={selectOptions}
        />
      </Flex>

      <DonutChart
        label={`${totalValue} samples`}
        showTooltip={true}
        showAnimation={true}
        customTooltip={customTooltip}
        className="h-[400px] min-w-[200px] mt-6"
        data={displayData}
        category="count"
        index="name"
      />
      <Legend
        className="flex items-center justify-center mt-6  "
        categories={legendCategories}
      />
    </Card>
  );
}
