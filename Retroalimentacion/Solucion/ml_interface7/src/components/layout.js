import React, {useState, useEffect} from "react"
import { Breadcrumb, Layout, Menu, Typography} from 'antd';
import { useRouter } from "next/router";
import styles from '../style/layout.module.css';
const { Header, Content, Footer } = Layout;
const {Text} = Typography;

export default function PageLayout () {
    const router = useRouter();
	const [current, setCurrent] = useState("randomforest");
	
    const menuItems = [
		{ key: "randomforest", texto: "Random Forest" },
		{ key: "docs", texto: "Docs" },
	];

    const onClickMenu = (e) => {
		setCurrent(e.key);
		if (e.key == "docs") router.push("/docs");
	};

	useEffect(() => {
		setCurrent("randomforest");
	}, []);
    
    return (
    <Layout>
        <Header
            style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            alignItems: 'center',
            backgroundColor: 'white',
            }}
        >              
         <div/>
         <Text strong className = {styles.title}> EQ7 </Text>
            <Menu
            mode="horizontal"
            style={{ display: "flex", float: 'right'}}
            selectedKeys={[current]}>
            {menuItems.map((e) => (
                <Menu.Item
                    key={e.key}
                    style={{ margin: "0 20px" }}
                    onClick={onClickMenu}>
                    {e.texto}
                </Menu.Item>
            ))}
        </Menu>
        </Header>
        <Content
            className = {styles.content}
          
        >
            <Breadcrumb
            style={{
                margin: '16px 50px',
            }}
            >
            <Breadcrumb.Item>{current}</Breadcrumb.Item>
            </Breadcrumb>
        </Content>
        <Footer
            className = {styles.footer}
        >
            Equipo 7 ©2023
        </Footer>
        </Layout>
    )
}