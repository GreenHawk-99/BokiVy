import {Button, Input, Select, Space, Tour, TourProps} from "antd";
import {AppstoreOutlined, InfoCircleOutlined} from "@ant-design/icons";
import React, {useRef, useState} from "react";
import {TourAppVy} from "./TourAppVy.tsx";


interface SearchAppVyProps {
    listSize: number;
    setListSize:Function;
}

export function SearchAppVy({listSize,setListSize}: SearchAppVyProps) {
    const [open, setOpen] = useState<boolean>(false);

    const sizePool: number[] = [2, 4, 6, 8, 12, 16, 20];

    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    const sizeHandler = () => {
        const currentIndex = sizePool.indexOf(listSize);
        const nextIndex = (currentIndex + 1) % sizePool.length;

        const currentSize = sizePool[nextIndex];

        setListSize(currentSize);
        console.log("SP: "+sizePool)
        console.log("SPL: "+sizePool.length)
        console.log("NI: "+nextIndex)
        console.log("CI: "+currentSize)
    }

    const handleChange = (value: string) => {
        setListSize(value)
    };

    const steps: TourProps['steps'] = [
        {
            title: 'Upload File',
            description: 'Put your files here.',
            target: () => ref1.current,
        },
        {
            title: 'Save',
            description: 'Save your changes.',
            target: () => ref2.current,
        },
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => ref3.current,
        },
    ];

    return (
        <>
            <Space.Compact style={{alignItems: "center"}}>
                <Button type={"primary"} ref={ref1} style={{marginBlock: "1vh"}}
                        onClick={sizeHandler}><AppstoreOutlined/></Button>
                <Input.Search ref={ref2} placeholder={"Search an application"}/>
                <Select ref={ref3} style={{width: "8vw"}} defaultValue={listSize.toString() + " (Default)"}
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
                <Button type={"primary"} onClick={() => setOpen(true)}><InfoCircleOutlined /></Button>
            </Space.Compact>
            <Tour open={open} onClose={() => setOpen(false)} steps={steps}
                  indicatorsRender={(current, total) => (
                      <span>
                          {current + 1} / {total}
                      </span>
                  )} />
        </>
    );
}