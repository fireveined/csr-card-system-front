import {IResourceComponentsProps} from "@pankod/refine-core";

import {Edit, Form, Input, InputNumber, Typography, useForm} from "@pankod/refine-antd";

import "react-mde/lib/styles/css/react-mde-all.css";

import {ICompany} from "interfaces";
import {TextArea} from "react-mde";
import {useTranslation} from "react-i18next";

export const PersonEdit: React.FC<IResourceComponentsProps> = () => {
    const {Title} = Typography;
    const {formProps, saveButtonProps} = useForm<ICompany>();
    const [t] = useTranslation();
    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">

                <Form.Item
                    label={t('card-id')}
                    name="cardId"
                    rules={[{required: true}]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label={t('name')}
                    name="name"
                    rules={[{required: true}]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label={t('surname')}
                    name="surname">
                    <Input/>
                </Form.Item>

                <Form.Item
                    label={t('document-id')}
                    name="documentId">
                    <Input/>
                </Form.Item>

                /* TODO: number validation*/
                <Form.Item
                    label={t('age')}
                    name="age">
                    <InputNumber/>
                </Form.Item>

                <Form.Item
                    label={t('phone-number')}
                    name="phone">
                    <Input/>
                </Form.Item>

                <Form.Item
                    label={t('notes')}
                    name="notes">
                    <Input.TextArea/>
                </Form.Item>
            </Form>
        </Edit>
    );
};
