'use client';
import { useMemo, useState } from 'react';
import { Card, DonutChart, Flex, Legend, Title, Subtitle } from '@tremor/react';

import { ICleanedProduct } from '../../interfaces/global_interfaces';
import { getAllProducts, turnDataIntoFlavourData } from '../../utils/flavour';

import {
  FlavourChartTooltip,
  FlavourDataPanel,
  FlavourSearchSelect
} from '../FlavourBreakdown';
import { formatPercentage } from '../../utils/utils';

export interface IFlavourSample {
  name: string;
  count: number;
}

export interface IFlavourBreakdown {
  name: string;
  count: number;
  samples: IFlavourSample[];
}

interface IFlavourBreakdownProps {
  data: ICleanedProduct[];
}

export function FlavourBreakdown({ data }: IFlavourBreakdownProps) {
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(
    undefined
  );
  const allProducts = getAllProducts(data);

  const displayData = useMemo(() => {
    return turnDataIntoFlavourData(data, selectedProduct);
  }, [data, selectedProduct]);

  const totalValue = displayData.reduce((acc, item) => acc + item.count, 0);

  const legendCategories = displayData
    .map((item) => `${item.name} (${formatPercentage(item.count, totalValue)})`)
    .slice(0, 5);

  const productTitle = selectedProduct ? selectedProduct : 'All Products';

  return (
    <Card className="h-full">
      <Title>Flavour Breakdown Of {productTitle}</Title>
      <Subtitle>Total of {totalValue} sample requests</Subtitle>

      <Flex className="mt-6 flex-col 2xl:flex-row gap-6 items-center justify-center">
        <Flex flexDirection="col" className="xl:w-2/5">
          <DonutChart
            data={displayData.slice(0, 5)}
            showAnimation={true}
            category="count"
            variant="pie"
            index="name"
            className="mt-6 "
            customTooltip={FlavourChartTooltip}
          />
          <Title className="mt-6">Top 5 Flavours Of {productTitle}</Title>
          <Legend
            categories={legendCategories}
            className="mt-6 flex-1 flex md:flex-row md:flex-wrap"
          />
        </Flex>
        <FlavourDataPanel totalValue={totalValue} displayData={displayData}>
          <FlavourSearchSelect
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            allProducts={allProducts}
          />
        </FlavourDataPanel>
      </Flex>
    </Card>
  );
}
