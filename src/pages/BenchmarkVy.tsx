import {Tabs} from 'antd';
import {BarChartOutlined, FormOutlined} from '@ant-design/icons';
import {FormBenchmark} from "../components/FormBenchmark.tsx";
import {UIBenchmark} from "../components/UIBenchmark.tsx";

/**
 * BenchmarkVy Page
 * A playground for testing UI elements and Ant Design features.
 * Now supports multiple benchmark tabs.
 */
export const BenchmarkVy = () => {
  const items = [
    {
      key: 'form',
      label: (
        <span>
          <FormOutlined/>
          Form Benchmark
        </span>
      ),
      children: <FormBenchmark/>,
    },
    {
      key: 'ui',
      label: (
        <span>
          <BarChartOutlined/>
          UI Benchmark
        </span>
      ),
      children: <UIBenchmark/>,
    },
  ];

  return (
    <div style={{maxWidth: 800, margin: '0 auto'}}>
      <Tabs defaultActiveKey="form" items={items}/>
    </div>
  );
};
