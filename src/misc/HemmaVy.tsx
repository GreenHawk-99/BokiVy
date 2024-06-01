import {Card, Flex, List} from "antd";
import {hemmaCards} from "../data/data.ts";
import Meta from "antd/es/card/Meta";

export function HemmaVy() {

    return (
        <div>
            <Flex justify={"center"}>
                <div className={"logo logo-header"} split-by={"letter"} letter-animation={"breath"}>BOKIVY</div>
            </Flex>
            {/*<Row className={"hemma"}>
                <Col span={8} className={"test"}></Col>
                <Col span={8} className={"test"}></Col>
                <Col span={8} className={"test"}></Col>
                <Col span={8} className={"test"}></Col>
                <Col span={8} className={"test"}></Col>
                <Col span={8} className={"test"}></Col>
            </Row>*/}
            <div>
                <List style={{paddingInline:"10vh",paddingBlock:"4vh"}} grid={{column: 3}} dataSource={hemmaCards}
                      renderItem={(item) => (
                          <List.Item style={{padding:"20px",marginBlock:"0"}}>
                              <Card className={"hemma-card"} cover={<img alt={"exemple"} src={item.image}/>}>
                                  <Meta title={item.name} description={item.description} />
                              </Card>
                          </List.Item>
                      )}/>
            </div>
        </div>
    )
}