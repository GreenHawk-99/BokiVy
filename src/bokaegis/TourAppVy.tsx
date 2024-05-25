import React, {useRef, useState} from "react";
import {Button, Divider, Space, Tour, TourProps} from "antd";
import {EllipsisOutlined, InfoCircleOutlined} from "@ant-design/icons";

interface TourAppVyProps {
    ref1: Function,
    ref2: Function,
    ref3: Function,
}

export function TourAppVy({ref1,ref2,ref3}: TourAppVyProps) {
    const [open, setOpen] = useState<boolean>(false);


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
            <Button type={"primary"} onClick={() => setOpen(true)}><InfoCircleOutlined/></Button>
            <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
        </>
    )
}