import React, {useState, useEffect} from "react"
import { Col, Row, Form, Card, Typography, Input, Select, Button, Divider} from "antd"
import PageLayout from "/src/components/layout"
import styles from '../style/layout.module.css'
import {
    FileExcelOutlined,
} from "@ant-design/icons";

const {Text} = Typography;

export default function randomForest () {

    const onFinish = (values) => {
        console.log('Valores de formulario prueba:', values);
    };

    return (
        <PageLayout>
            <Row justify="center" align="stretch" style={{ minHeight: "75vh" }}>
                <Col span={24} style={{ maxWidth: "45%", display: "flex", flexDirection: "column" }}>
                    <Card className = {styles.cards} style={{ width: "100%", height: "90%", padding: "20px" }}>
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
                                    <Select
                                    placeholder = "Select Fare"
                                    dropdownStyle={{ textAlign: "center" }}
                                    options={[
											{
												value: 1,
												label: <span>1</span>,
											},
											{
												value: 2,
												label: <span>2</span>,
											},
                                            {
												value: 3,
												label: <span>3</span>,
											},
                                            {
												value: 4,
												label: <span>4</span>,
											},
                                            {
												value: 5,
												label: <span>5</span>,
											},
                                            
                                    ]}
                                />
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
                                    <Form.Item>
                                        <Button type="default" style={{backgroundColor: "#008000", marginLeft: "7rem" }}>
                                            <Text style={{ color: "white" }}> Import </Text>
                                            <FileExcelOutlined style = {{color: "white"}}></FileExcelOutlined>
                                        </Button>
                                    </Form.Item>
                            </Row>
                        </Form>
                        <Divider style={{ borderTop: '2px solid #D3D3D3' }}></Divider>
                        <Row justify = "center">
                            <Text> Results </Text>
                        </Row>
                        <Row justify="center">
                            <Col span = {12} >
                                <Row justify= "center">
                                    <Text strong style={{ textAlign: 'center', fontSize: '18px' }}>Survived</Text>
                                </Row>
                                <Row justify = "center">
                                    <Text strong style={{ fontSize: '30px' }}>1</Text>
                                </Row>
                            </Col>
                            <Col span={12} >
                                <Row justify = 'center'>
                                    <Text strong style={{ textAlign: "center", fontSize: '18px' }}>Accuracy</Text>
                                </Row>
                                <Row justify = "center">
                                    <Text strong style={{ fontSize: '30px' }}>0.87</Text>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </PageLayout>
    );
}