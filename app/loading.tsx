import { Card, Col, Grid, Text, Title } from '@tremor/react';

export default function Loading() {
  return (
    <main className="absolute w-full h-full top-16 p-4 md:p-10 mx-auto">
      <Grid numItemsMd={1} numItemsLg={3} className="gap-4">
        <Col numColSpan={1} numColSpanLg={2}>
          <Card className="h-[500px]">
            <Title>Flavour Breakdown</Title>
          </Card>
        </Col>
        <Card className="h-[500px]">
          <Title>State Sample Distribution</Title>
        </Card>
        <Col>
          <Card className="h-[300px]">
            <Title>Samples Sent by Day of the Week</Title>
          </Card>
        </Col>
        <Card className="h-[300px]">
          <Title>Top 5 Most Popular Product Requested</Title>
        </Card>
        <Card className="h-[300px]">
          <Text>Approximate Duplicates Found</Text>
        </Card>
      </Grid>
    </main>
  );
}
