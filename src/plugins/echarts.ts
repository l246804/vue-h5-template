import * as Echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, GaugeChart, LineChart, PieChart } from 'echarts/charts'
import {
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'

Echarts.use([
  // Chart
  PieChart,
  BarChart,
  LineChart,
  GaugeChart,

  // Component
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,

  // Renderer
  CanvasRenderer,
])

export { Echarts }
