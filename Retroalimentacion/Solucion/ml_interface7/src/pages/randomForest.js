import React, { useState, useRef } from "react";
import { Col, Row, Form, Card, Typography, Input, Select, Button, Divider } from "antd";
import PageLayout from "/src/components/layout";
import styles from '../style/layout.module.css';
import { FileExcelOutlined } from "@ant-design/icons";
import Router, { useRouter } from "next/router";

const { Text } = Typography;

export default function randomForest() {
    const [jsonData, setJsonData] = useState([]);
    const fileInputRef = useRef(null);
    const router = useRouter();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            const csvText = e.target.result;
            const dataArray = parseCsvToArray(csvText);
            setJsonData(dataArray);
            console.log(dataArray)
        };

        reader.readAsText(file);
        
    };

    const parseCsvToArray = (csvText) => {
        const lines = csvText.split('\n');
        const header = lines[0].split(',');
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            const entry = {};

            for (let j = 0; j < header.length; j++) {
                entry[header[j]] = values[j];
            }

            data.push(entry);
        }

        return data;
    };


    const onFinish = (values) => {
        const formData = {
            Pclass: parseInt(values.pclass, 10),
            Age: parseInt(values.age, 10),
            Sex: parseInt(values.sex, 10),
            Fam: parseInt(values.fam, 10),
            Fare: parseInt(values.fare, 10),
            Embarked: parseInt(values.embarked, 10),
        };

        const formDataJson = JSON.stringify(formData);
        console.log('JSON:', formDataJson);
    };

    return (
        <PageLayout>
            <Row justify="center" align="stretch" style={{ minHeight: "75vh" }}>
                <Col span={24} style={{ maxWidth: "45%", display: "flex", flexDirection: "column" }}>
                    <Card className={styles.cards} style={{ width: "100%", height: "90%", padding: "20px" }}>
                        <Form layout="vertical" name="inputForm" onFinish={onFinish}>
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
                                <Col span={8}>
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
                                            placeholder="Select Fare"
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
                                            placeholder="Select Sex"
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
                                    <Button type="default" onClick={() => fileInputRef.current.click()} style={{ backgroundColor: "#008000", marginLeft: "7rem" }}>
                                        <Text style={{ color: "white" }}> Import </Text>
                                        <FileExcelOutlined style={{ color: "white" }}></FileExcelOutlined>
                                    </Button>
                                </Form.Item>
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={handleFileInputChange}
                                    style={{ display: 'none' }}
                                    ref={fileInputRef}
                                />
                            </Row>
                        </Form>
                        <Divider style={{ borderTop: '2px solid #D3D3D3' }}></Divider>
                        <Row justify="center">
                            <Text> Results </Text>
                        </Row>
                        <Row justify="center">
                            <Col span={12}>
                                <Row justify="center">
                                    <Text strong style={{ textAlign: 'center', fontSize: '18px' }}>Survived</Text>
                                </Row>
                                <Row justify="center">
                                    <Text strong style={{ fontSize: '30px' }}>1</Text>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row justify="center">
                                    <Text strong style={{ textAlign: "center", fontSize: '18px' }}>Table</Text>
                                </Row>
                                <Row justify="center">
                                    <Button type="default" style={{ margin: '10px' }} onClick={() => router.push("tableResults")}>File</Button>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </PageLayout>
    );
}
