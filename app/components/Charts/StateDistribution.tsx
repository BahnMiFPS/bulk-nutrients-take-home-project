'use client';
import { useMemo } from 'react';
import { Title, Text, Card, Flex, BarList, Bold } from '@tremor/react';

import { ICleanedProduct } from '../../interfaces/global_interfaces';

interface IStateDistributionProps {
  data: ICleanedProduct[];
}

interface TStateSampleData {
  name: string;
  value: number;
}

// Aggregates data by state and counts occurrences
const turnDataIntoChartData = (data: ICleanedProduct[]): TStateSampleData[] => {
  const stateCount = data.reduce<Record<string, number>>((acc, curr) => {
    const state = curr.State;
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(stateCount)
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
