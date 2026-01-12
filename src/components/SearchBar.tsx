import {Button, Input, Modal, Select, Space, Tour, TourProps} from "antd";
import {AppstoreAddOutlined, InfoCircleOutlined} from "@ant-design/icons";
import React, {useRef, useState} from "react";

interface SearchAppVyProps {
  listSize: number;
  setListSize: React.Dispatch<React.SetStateAction<number>>;
  onSearch: (value: string) => void;
}

export function SearchBar({listSize, setListSize, onSearch}: SearchAppVyProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value: number) => {
    setListSize(value)
  };

  const steps: TourProps['steps'] = [
    {
      title: 'Create a server',
      description: 'You can create and host your own game server directly from here.',
      target: () => ref1.current,
    },
    {
      title: 'Search for a server',
      description: 'Quickly find a specific server by name or IP address.',
      target: () => ref2.current,
    },
    {
      title: 'Card Layout',
      description: 'Adjust the number of server cards displayed per row.',
      target: () => ref3.current,
    },
  ];

  return (
    <>
      <Space.Compact style={{alignItems: "center"}}>
        <Button type={"primary"} ref={ref1} style={{marginBlock: "1vh"}}
                onClick={showModal}><AppstoreAddOutlined/></Button>
        <div ref={ref2}>
          <Input.Search allowClear placeholder={"Search servers..."} onSearch={onSearch} onChange={(e) => onSearch(e.target.value)}/>
        </div>
        <div ref={ref3}>
          <Select style={{width: "8vw"}} defaultValue={listSize}
                  onChange={handleChange}
                  options={[
                    {value: 2},
                    {value: 4},
                    {value: 6},
                    {value: 8, label: "8 (Default)"},
                    {value: 12},
                    {value: 16},
                    {value: 20}
                  ]}/>
        </div>
        <Button type={"primary"} onClick={() => setOpen(true)}><InfoCircleOutlined/></Button>
      </Space.Compact>
      <Modal title="Create a server" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>Name</div>
        <div>Ip</div>
        <div>port</div>
        <div>max player</div>
      </Modal>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps}
            indicatorsRender={(current, total) => (
              <span>
                {current + 1} / {total}
              </span>
            )}/>
    </>
  );
}