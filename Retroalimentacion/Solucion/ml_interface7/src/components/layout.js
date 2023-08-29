import {useState, useEffect} from "react"
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useRouter } from "next/router";
const { Header, Content, Footer } = Layout;

export default function PageLayout () {
    const router = useRouter();
	const [current, setCurrent] = useState("Random Forest");
	
    const menuItems = [
		{ key: "Docs", texto: "Docs" },
		{ key: "Random Forest", texto: "Random Forest" },
	];
    const onClickMenu = (e) => {
		setCurrent(e.key);
		if (e.key == "Docs") router.push("/docs");
	};

	useEffect(() => {
		setCurrent("Random Forest");
	}, []);
    
    return (
    <Layout>
        <Header
            style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            }}
        >
            <div/>
            <Menu
            mode="horizontal"
            style={{ display: "flex", alignItems: 'center'}}
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
            className="site-layout"
            style={{
            padding: '0 50px',
            }}
        >
            <Breadcrumb
            style={{
                margin: '16px 0',
            }}
            >
            <Breadcrumb.Item>{current}</Breadcrumb.Item>
            </Breadcrumb>
            <div
            style={{
                padding: 24,
                height: 380,
                backgroundColor: '#F0F0F0',
            }}
            >
            </div>
        </Content>
        <Footer
            style={{
            textAlign: 'center',
            }}
        >
            Equipo 7 ©2023
        </Footer>
        </Layout>
    )
}