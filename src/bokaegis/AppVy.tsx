import {Button, Modal, Tag} from "antd";
import React from "react";
import {GameServer} from "../model/gameServer.ts";
import {gameServers} from "../data/data.ts";
import {CloseOutlined} from "@ant-design/icons";

interface AppVyProps {
    application: GameServer
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export function AppVy({application, open, setOpen}: AppVyProps) {
    return (
        <>
            <Modal className={"modal"}
                   centered={true} width={2000}
                   open={open} onCancel={() => setOpen(false)}
                   //closeIcon={<Button icon={<CloseOutlined />}/>}
                   footer={null}>
                    <div className={"modal-header"}>
                        <div className={"modal-content"}></div>
                        <div className={"modal-content"}></div>
                    </div>
                    <div className={"modal-info"}>
                        <div className={"modal-content"}><span/></div>
                        <div className={"modal-content"}><span/></div>
                        <div className={"modal-content"}><span/></div>

                    </div>
            </Modal>
        </>
    )
}