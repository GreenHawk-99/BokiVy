import {Button, Flex, Input, Segmented, Space, Tour, TourProps} from "antd";
import {AppstoreAddOutlined, AppstoreOutlined, InfoCircleOutlined, TableOutlined} from "@ant-design/icons";
import {useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {ViewType} from "../type/component.ts";
import {SkapaServerModal} from "./SkapaServerModal.tsx";


interface MultifaltProps {
  onSearch: (value: string) => void;
  viewType: ViewType;
  setViewType: (view: ViewType) => void;
}

/**
 * Multifält komponent för sökning och inställningar på servervisningssidan
 * @param onSearch
 * @param viewType
 * @param setViewType
 */
export const Multifalt = ({onSearch, viewType, setViewType}: MultifaltProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const {t} = useTranslation();
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref4 = useRef(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const steps: TourProps['steps'] = [
    {
      title: t('multifalt.tour.createServer.title'),
      description: t('multifalt.tour.createServer.description'),
      target: () => ref1.current,
    },
    {
      title: t('multifalt.tour.search.title'),
      description: t('multifalt.tour.search.description'),
      target: () => ref2.current,
    },
    {
      title: t('multifalt.tour.viewType.title'),
      description: t('multifalt.tour.viewType.description'),
      target: () => ref4.current,
    },
  ];

  return (
    <>
      <Flex justify={"space-between"} align={"center"} style={{width: '100%', marginBottom: "2vh"}}>

        <Space.Compact style={{alignItems: "center"}}>
          <Button type={"primary"} ref={ref1} style={{marginBlock: "1vh"}}
                  onClick={showModal}><AppstoreAddOutlined/></Button>
          <div ref={ref2}>
            <Input.Search allowClear placeholder={t('multifalt.searchPlaceholder')} onSearch={onSearch}
                          onChange={(e) => onSearch(e.target.value)}/>
          </div>
          <Button type={"primary"} onClick={() => setOpen(true)}><InfoCircleOutlined/></Button>
        </Space.Compact>
        <div ref={ref4}>
          <Segmented
            value={viewType}
            onChange={(value) => setViewType(value as ViewType)}
            options={[
              {value: 'cart', icon: <AppstoreOutlined/>, label: t('multifalt.viewType.card')},
              {value: 'table', icon: <TableOutlined/>, label: t('multifalt.viewType.table')},
            ]}
          />
        </div>
      </Flex>
      <SkapaServerModal open={isModalOpen} onCancel={() => setIsModalOpen(false)} />
      <Tour open={open} onClose={() => setOpen(false)} steps={steps}
            indicatorsRender={(current, total) => (
              <span>
                {current + 1} / {total}
              </span>
            )}/>
    </>
  );
}