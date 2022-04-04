import { IResourceComponentsProps } from "@pankod/refine-core";

import { Create, Form, Input, Typography, useForm, InputNumber  } from "@pankod/refine-antd";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IPerson } from "interfaces";

export const PersonCreate: React.FC<IResourceComponentsProps> = () => {
    const {Title} = Typography;
    const {formProps, saveButtonProps} = useForm<IPerson>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">

                <Form.Item
                    label="Numer karty"
                    name="cardId"
                    rules={[{required: true}]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Imię"
                    name="name"
                    rules={[{required: true}]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Nazwisko"
                    name="surname">
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Numer dokumentu"
                    name="documentId">
                    <Input/>
                </Form.Item>

                /* TODO: number validation*/
                <Form.Item
                    label="Wiek"
                    name="age">
                    <InputNumber/>
                </Form.Item>


                <Form.Item
                    label="Numer telefonu"
                    name="phone">
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Dodatkowe notatki"
                    name="notes">
                    <Input.TextArea/>
                </Form.Item>

            </Form>
        </Create>
    );
};
