import { Card, Col, Grid, Text, Title } from '@tremor/react';
export default function Loading() {
  return (
    <>
      <div className="absolute top-0 w-screen bg-white dark:bg-[#0A0A0A] p-8 shadow-sm"></div>
      <main className="absolute w-screen h-screen top-16 md:p-10 mx-auto">
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
    </>
  );
}
