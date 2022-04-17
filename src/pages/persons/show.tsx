import { IResourceComponentsProps, useShow } from "@pankod/refine-core";

import { Show, Typography } from "@pankod/refine-antd";

import { IPerson } from "interfaces";
import {useTranslation} from "react-i18next";

const {Title, Text} = Typography;

export const PersonShow: React.FC<IResourceComponentsProps> = () => {
    const {queryResult} = useShow<IPerson>();
    const {data, isLoading} = queryResult;
    const [t] = useTranslation();
    const record = data?.data;
    console.log(record);

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>ID</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>{t('card-id')}</Title>
            <Text>{record?.cardId}</Text>

            <Title level={5}>{t('name')}</Title>
            <Text>{record?.name}</Text>

            <Title level={5}>{t('surname')}</Title>
            <Text>{record?.surname}</Text>

            <Title level={5}>{t('document-id')}</Title>
            <Text>{record?.documentId}</Text>

            <Title level={5}>{t('age')}</Title>
            <Text>{record?.age}</Text>

            <Title level={5}>{t('phone-number')}</Title>
            <Text>{record?.phone}</Text>

            <Title level={5}>{t('notes')}</Title>
            <Text>{record?.notes}</Text>

            <Title level={5}>{t('added-to-the-system')}Dodano do systemu</Title>
            <Text>{record?.createdAt ? new Date(record?.createdAt).toLocaleString() : ""}</Text>

        </Show>
    );
};
