import React from 'react';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  Category,
  Legend,
  Tooltip,
  ColumnSeries,
  DataLabel,
} from '@syncfusion/ej2-react-charts';

import {
  lineCustomSeries,
  LinePrimaryXAxis,
  LinePrimaryYAxis,
} from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

export default function LineChart() {
  const { currentMode } = useStateContext();
  const Patients2022 = [
    { month: 'Jan', Patients: 135 },
    { month: 'Feb', Patients: 128 },
    { month: 'Mar', Patients: 134 },
    { month: 'Apr', Patients: 132 },
    { month: 'May', Patients: 140 },
    { month: 'Jun', Patients: 132 },
    { month: 'Jul', Patients: 135 },
    { month: 'Aug', Patients: 155 },
    { month: 'Sep', Patients: 138 },
    { month: 'Oct', Patients: 130 },
    { month: 'Nov', Patients: 125 },
    { month: 'Dec', Patients: 132 },
  ];
  const Patients2023 = [
    { month: 'Jan', Patients: 10 },
    { month: 'Feb', Patients: 28 },
    { month: 'Mar', Patients: 34 },
    { month: 'Apr', Patients: 42 },
    { month: 'May', Patients: 50 },
    { month: 'Jun', Patients: 62 },
    { month: 'Jul', Patients: 85 },
    { month: 'Aug', Patients: 95 },
    { month: 'Sep', Patients: 148 },
    { month: 'Oct', Patients: 140 },
    { month: 'Nov', Patients: 135 },
    { month: 'Dec', Patients: 142 },
  ];
  const primaryxAxis = { valueType: 'Category' };
  const marker = {
    visible: true,
    height: 10,
    width: 10,
  };
  return (
    <ChartComponent
      id="line-chart"
      height="420px"
      primaryXAxis={primaryxAxis}
      primaryYAxis={LinePrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
    >
      <Inject
        services={[
          LineSeries,
          Category,
          Legend,
          Tooltip,
          ColumnSeries,
          DataLabel,
        ]}
      />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={Patients2022}
          xName="month"
          yName="Patients"
          name="Patients 2022"
          type="Line"
          marker={marker}
          width={2}
        />

        <SeriesDirective
          dataSource={Patients2023}
          xName="month"
          yName="Patients"
          name="Patients 2023"
          type="Line"
          marker={marker}
          width={2}
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
}
