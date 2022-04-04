import React from "react";
import { useLogin } from "@pankod/refine-core";
import {
    Row,
    Col,
    AntdLayout,
    Card,
    Typography,
    Form,
    Input,
    Button,
    Checkbox
} from "@pankod/refine-antd";
import "./styles.css";

const { Text, Title } = Typography;

export interface ILoginForm {
    username: string;
    password: string;
    remember: boolean;
}

export const Login: React.FC = () => {
    const [form] = Form.useForm<ILoginForm>();

    const { mutate: login } = useLogin<ILoginForm>();

    const CardTitle = (
        <Title level={3} className="title">
            Zaloguj
        </Title>
    );

    return (
        <AntdLayout className="layout">
            <Row
                justify="center"
                align="middle"
                style={{
                    height: "100vh"
                }}
            >
                <Col xs={22}>
                    <div className="container">
                        <div className="imageContainer">
                            <img src="./logo.png" alt="Refine Logo" style={{width: 50}}/>
                        </div>
                        <Card title={CardTitle} headStyle={{ borderBottom: 0 }}>
                            <Form<ILoginForm>
                                layout="vertical"
                                form={form}
                                onFinish={(values) => {
                                    login(values);
                                }}
                                requiredMark={false}
                                initialValues={{
                                    remember: false
                                }}
                            >
                                <Form.Item
                                    name="username"
                                    label="Nazwa użytkownika"
                                    rules={[{ required: true }]}
                                >
                                    <Input size="large" placeholder="Nazwa użytkownika" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label="Hasło"
                                    rules={[{ required: true }]}
                                    style={{ marginBottom: "12px" }}
                                >
                                    <Input type="password" placeholder="●●●●●●●●" size="large" />
                                </Form.Item>

                                <Button type="primary" size="large" htmlType="submit" block>
                                    Zaloguj
                                </Button>
                            </Form>

                        </Card>
                    </div>
                </Col>
            </Row>
        </AntdLayout>
    );
};
