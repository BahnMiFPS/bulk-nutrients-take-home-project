'use client';
import { useMemo } from 'react';
import { Title, Text, Card, Flex, BarList, Bold } from '@tremor/react';

import { ICleanedProduct } from '../../interfaces/global_interfaces';

interface IStateDistributionProps {
  data: ICleanedProduct[];
}

interface IStateSampleData {
  name: string;
  value: number;
}

// Aggregates data by state and counts occurrences
const turnDataIntoChartData = (data: ICleanedProduct[]): IStateSampleData[] => {
  const stateCount = data.reduce<Record<string, number>>((acc, curr) => {
    const state = curr.State;
    // if (!state) {
    //   console.log(state, acc, 'returning');
    //   return acc;
    // } // Skip if state is not available
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(stateCount)
    // Mapping the object into an array of objects with name and value so that it can be used in the BarList component
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export function StateDistribution({ data }: IStateDistributionProps) {
  // Memoizing the sorted data to optimize performance
  const sortedStateSampleData = useMemo(() => {
    return turnDataIntoChartData(data);
  }, [data]);

  return (
    <Card>
      <Title>State Sample Distribution</Title>
      <Flex className="mt-8">
        <Text>
          <Bold>States</Bold>
        </Text>
        <Text>
          <Bold>Number of Samples</Bold>
        </Text>
      </Flex>
      <BarList
        data={sortedStateSampleData}
        className="mt-4"
        showAnimation={true}
      />
    </Card>
  );
}
