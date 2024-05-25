import {Button, Input, Modal, Select, Space, Tour, TourProps} from "antd";
import {AppstoreAddOutlined, InfoCircleOutlined} from "@ant-design/icons";
import React, {useRef, useState} from "react";

interface SearchAppVyProps {
    listSize: number;
    setListSize:React.Dispatch<React.SetStateAction<number>>;
}

export function SearchAppVy({listSize,setListSize}: SearchAppVyProps) {
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
            title: 'Create a server [WIP]',
            description: 'Still in development but you will be able to create your server on the device via this button.',
            target: () => ref1.current,
        },
        {
            title: 'Research an server [WIP]',
            description: 'For now a small number of server wil be hosted so no need to have right now the search bar',
            target: () => ref2.current,
        },
        {
            title: 'Change the card display',
            description: 'Select the number of card you want in a row',
            target: () => ref3.current,
        },
    ];

    return (
        <>
            <Space.Compact style={{alignItems: "center"}}>
                <Button disabled={true} type={"primary"} ref={ref1} style={{marginBlock: "1vh"}}
                onClick={showModal}><AppstoreAddOutlined /></Button>
                <div ref={ref2}>
                    <Input.Search disabled={true} placeholder={"Search an application"}/>
                </div>
                <div ref={ref3}>
                    <Select style={{width: "8vw"}} defaultValue={listSize}
                            onChange={handleChange}
                            options={[
                                {value: 2},
                                {value: 4},
                                {value: 6, label: "6 (Default)"},
                                {value: 8},
                                {value: 12},
                                {value: 16},
                                {value: 20}
                            ]}/>
                </div>
                <Button type={"primary"} onClick={() => setOpen(true)}><InfoCircleOutlined /></Button>
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
                  )} />
        </>
    );
}