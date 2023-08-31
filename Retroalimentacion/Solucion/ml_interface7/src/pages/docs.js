import { Col, Row, Form, Card, Typography} from "antd"
import PageLayout from "/src/components/layout"

const {Text} = Typography;

export default function docs () {
    return (
        <PageLayout>
            <Row justify="center" align="stretch" style={{ minHeight: "75vh" }}>
                <Col span={24} style={{ maxWidth: "45%", display: "flex", flexDirection: "column" }}>
                        <Col>
                            <Row justify = "center" style={{ margin: "20px" }}>
                                <Text>
                                    PDF de la Documentacion     
                                </Text>
                            </Row>
                        </Col>
                </Col>
            </Row>
        </PageLayout>
    )
}