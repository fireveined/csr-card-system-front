import { IResourceComponentsProps, useShow } from "@pankod/refine-core";

import { Show, Typography } from "@pankod/refine-antd";

import { ISale } from "interfaces";

const {Title, Text, Paragraph} = Typography;

export const SaleShow: React.FC<IResourceComponentsProps> = () => {
    const {queryResult} = useShow<ISale>();
    const {data, isLoading} = queryResult;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Numer karty</Title>
            <Text>{record?.cardId}</Text>
            <Title level={5}>Typ</Title>
            <Text>{record?.type}</Text>
            <Title level={5}>Data dodania</Title>
            <Text>{new Date(record?.createdAt || "").toLocaleString()}</Text>

        </Show>
    );
};
