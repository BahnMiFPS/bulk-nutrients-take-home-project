import { List, ListItem } from '@tremor/react';

import { IFlavourSample } from '../Charts/FlavourBreakdown';

interface ICustomTooltipPayload {
  color?: string;
  name: string;
  value: number;
  payload: {
    samples: IFlavourSample[];
  };
}

export const FlavourChartTooltip = ({
  payload,
  active
}: {
  payload: ICustomTooltipPayload[];
  active: boolean;
}) => {
  if (!active || !payload) return null;
  const categoryPayload = payload[0];
  if (!categoryPayload) return null;
  return (
    <div className="rounded-tremor-default p-2 text-tremor-default bg-tremor-background shadow-tremor-dropdown border border-tremor-border dark:border-dark-tremor-border dark:text-dark-tremor-default dark:bg-dark-tremor-background dark:shadow-dark-tremor-dropdown z-50">
      <div className="flex flex-1 space-x-2.5">
        <div
          className={`w-1.5 flex flex-col bg-${categoryPayload?.color}-500 rounded`}
        />
        <div className="w-full">
          <div className="flex items-center justify-between space-x-8">
            <p className="text-right text-tremor-content dark:text-dark-tremor-content whitespace-nowrap">
              {categoryPayload.name}
            </p>
            <p className="font-medium text-right whitespace-nowrap text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis">
              {categoryPayload.value} samples
            </p>
          </div>
        </div>
      </div>
      <List>
        {categoryPayload.payload.samples.map((sample) => (
          <ListItem key={sample.name}>
            <span>{sample.name}</span>
            <span>{sample.count} sample</span>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
