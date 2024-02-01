'use client';

import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { BarChart, Card, Flex, Title } from '@tremor/react';
import { CalendarDaysIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { ICleanedProduct } from '../../interfaces/global_interfaces';
import SelectMenu, { TSelectOption } from '../SelectMenu';

type Day =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

interface ChartData {
  day: Day;
  Samples: number;
}

interface ISampleByDayProps {
  data: ICleanedProduct[];
}

const days: Day[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

type FilterValue = 'date' | 'samples';

function getWeekday(dateString: string): Day {
  const date = new Date(dateString);
  return days[date.getDay()];
}

const chartData: Record<Day, number> = {
  Sunday: 0,
  Monday: 0,
  Tuesday: 0,
  Wednesday: 0,
  Thursday: 0,
  Friday: 0,
  Saturday: 0
};

const turnDataIntoChartData = (data: ICleanedProduct[]): ChartData[] => {
  data.forEach((item: ICleanedProduct) => {
    chartData[getWeekday(item.Date)] += 1;
  });

  return Object.entries(chartData).map(([day, Samples]) => ({
    day: day as Day,
    Samples
  }));
};

const options: TSelectOption[] = [
  { value: 'date', label: 'Sort by Date', icon: CalendarDaysIcon },
  { value: 'samples', label: 'Sort by Samples', icon: ChartBarIcon }
];

export function WeekdaySample({ data }: ISampleByDayProps) {
  const [filterValue, setFilterValue] = useState<FilterValue>('date');

  const chartData = useMemo(() => {
    return turnDataIntoChartData(data);
  }, [data]);

  const displayData = useMemo(() => {
    return [...chartData].sort((a, b) => {
      if (filterValue === 'date')
        return days.indexOf(a.day) - days.indexOf(b.day);
      return b.Samples - a.Samples;
    });
  }, [chartData, filterValue]);

  return (
    <Card className="h-full">
      <Flex>
        <div className="">
          <Title>Samples Sent by Day of the Week</Title>
        </div>
        <SelectMenu
          value={filterValue}
          setValue={setFilterValue as Dispatch<SetStateAction<string>>}
          options={options}
          defaultValue={options[0].value}
          enableClear={false}
        />
      </Flex>
      <Flex justifyContent="center" alignItems="center" className="h-full mb-4">
        <BarChart
          data={displayData}
          index="day"
          categories={['Samples']}
          showAnimation={true}
          showGridLines={true}
        />
      </Flex>
    </Card>
  );
}
