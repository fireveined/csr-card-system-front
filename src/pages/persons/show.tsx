import { IResourceComponentsProps, useShow } from "@pankod/refine-core";

import { Show, Typography } from "@pankod/refine-antd";

import { IPerson } from "interfaces";

const {Title, Text, Paragraph} = Typography;

export const PersonShow: React.FC<IResourceComponentsProps> = () => {
    const {queryResult} = useShow<IPerson>();
    const {data, isLoading} = queryResult;
    const record = data?.data;
    console.log(record);
    return (
        <Show isLoading={isLoading}>
            <Title level={5}>ID</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Numer Karty</Title>
            <Text>{record?.cardId}</Text>

            <Title level={5}>Imię</Title>
            <Text>{record?.name}</Text>

            <Title level={5}>Nazwisko</Title>
            <Text>{record?.surname}</Text>

            <Title level={5}>Numer Dokumentu</Title>
            <Text>{record?.documentId}</Text>

            <Title level={5}>Wiek</Title>
            <Text>{record?.age}</Text>

            <Title level={5}>Telefon</Title>
            <Text>{record?.phone}</Text>

            <Title level={5}>Notatki</Title>
            <Text>{record?.notes}</Text>

            <Title level={5}>Dodano do systemu</Title>
            <Text>{record?.createdAt ? new Date(record?.createdAt).toLocaleString() : ""}</Text>

        </Show>
    );
};
