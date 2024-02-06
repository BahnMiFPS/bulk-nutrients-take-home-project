import { Col, Grid } from '@tremor/react';

import { ICleanedProduct, IProduct } from './interfaces/global_interfaces';

import { fetchApi } from './utils/fetchApi';
import { cleanFlavour } from './utils/cleanFlavour';
import { cleanState } from './utils/cleanState';

import {
  FlavourBreakdown,
  DuplicatesView,
  MostPopular,
  StateDistribution,
  WeekdaySample
} from './components/Charts';

export default async function Main() {
  const data = await fetchApi();

  const cleanedData = data.map(
    (item: IProduct): ICleanedProduct => ({
      ...item,
      Product: cleanFlavour(item.Sample, 'product'),
      Flavour: cleanFlavour(item.Sample, 'flavour'),
      State: cleanState(item.State)
    })
  );

  return (
    <main className="p-4 md:p-10 mx-auto">
      <Grid numItemsMd={1} numItemsLg={3} className="gap-4">
        <Col numColSpan={1} numColSpanMd={1} numColSpanLg={2}>
          <FlavourBreakdown data={cleanedData} />
        </Col>
        <StateDistribution data={cleanedData} />
        <Col>
          <WeekdaySample data={cleanedData} />
        </Col>
        <MostPopular data={cleanedData} />
        <DuplicatesView data={cleanedData} />
      </Grid>
    </main>
  );
}
