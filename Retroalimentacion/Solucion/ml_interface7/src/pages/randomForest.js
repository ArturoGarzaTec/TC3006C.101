import { Col, Row, Form, Card, Typography, Input, Select, Button, Divider} from "antd"
import PageLayout from "/src/components/layout"

const {Text} = Typography;

export default function randomForest () {
    const { Option } = Select;

    const onFinish = (values) => {
        console.log('Valores de formulario prueba:', values);
    };

    return (
        <PageLayout>
            <Row justify="center" align="stretch" style={{ minHeight: "75vh" }}>
                <Col span={24} style={{ maxWidth: "45%", display: "flex", flexDirection: "column" }}>
                    <Card style={{ width: "100%", height: "90%", padding: "20px" }}>
                        <Form layout = "vertical" name="inputForm" onFinish={onFinish}>
                        <Row gutter={[16, 16]}>
							<Col span={8}>
                                <Form.Item 
                                    name="pclass" 
                                    label="Pclass"
                                >
                                    <Input />
                                </Form.Item> 
                                <Form.Item 
                                    name="fam" 
                                    label="Fam"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span = {8}>
                                <Form.Item 
                                    name="age" 
                                    label="Age"
                                >
                                    <Input /> 
                                </Form.Item>
                                <Form.Item 
                                    name="fare" 
                                    label="Fare"
                                >
                                <Input />
                            </Form.Item>
                            </Col>
                            <Col span={8}>
                            <Form.Item 
                                name="sex" 
                                label="Sex"
                            >
                                <Select
                                    placeholder = "Select Sex"
                                    dropdownStyle={{ textAlign: "center" }}
                                    options={[
											{
												value: 1,
												label: <span>Male</span>,
												
											},
											{
												value: 0,
												label: <span>Female</span>,
											},
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item 
                                name="embarked" 
                                label="Embarked"
                            >
                                <Input />
                            </Form.Item>
                            </Col>
                            </Row>
                            <Row justify="center" align="middle">
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" style={{ width: '100px', borderRadius: '6px' }}>
                                            Run
                                        </Button>
                                    </Form.Item>
                            </Row>
                            <Divider style={{ borderTop: '2px solid #D3D3D3' }}></Divider>
                        </Form>
                        <Row justify="center">
                            <Col span={3} style={{ textAlign: 'left' }}>
                                <Text strong style={{ fontSize: '18px' }}>Survived</Text>
                            </Col>
                            <Col span={12} style={{ textAlign: 'right' }}>
                                <Text strong style={{ fontSize: '18px' }}>Accuracy</Text>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </PageLayout>
    );
}