import { useEffect, useState } from "react";
import { useList, useNavigation } from "@pankod/refine-core";
import { AntdLayout, AutoComplete, Icons, Input, Typography, } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router";
import debounce from "lodash/debounce";
import { IPerson } from "../interfaces";

const {Link} = routerProvider;
const {Text} = Typography;
const {SearchOutlined} = Icons;

export interface IOptionGroup {
    value: string;
    label: string | React.ReactNode;
}

export interface IOptions {
    label: string | React.ReactNode;
    options: IOptionGroup[];
}

const renderTitle = (title: string) => {
    return (
        <Text strong style={{fontSize: "16px"}}>
            {title}
        </Text>
    );
};

const renderItem = (title: string, resource: string, id: string, push: Function) => {
    return {
        value: title,
        label: (
            <a onClick={() => push(`/${resource}/show/${id}`)}>
                <Text>{title}</Text>
            </a>
        ),
    };
};

export const Header: React.FC = () => {
    const [value, setValue] = useState<string>("");
    const [options, setOptions] = useState<IOptions[]>([]);
    const {push} = useNavigation();

    const {refetch: refetchPersons} = useList<IPerson>({
        resource: "persons",
        config: {
            filters: [{
                operator: "or",
                value: [{field: "name", operator: "contains", value}, {
                    field: "surname",
                    operator: "contains",
                    value
                }, {field: "cardId", operator: "contains", value}]
            }],
        },
        queryOptions: {
            enabled: false,
            onSuccess: (data: any) => {
                const postOptionGroup = data.data.map((item: IPerson) =>
                    renderItem(item.cardId + " - " + item.name + " " + item.surname, "persons", item.id, push),
                );
                if (postOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle("Ludzie"),
                            options: postOptionGroup,
                        },
                    ]);
                }
            },
        },
    });

    useEffect(() => {
        setOptions([]);
        if (value.length > 2) {
            refetchPersons();
        }
    }, [value]);

    return (
        <AntdLayout.Header
            style={{
                padding: "0px 24px",
                backgroundColor: "#FFF",
            }}
        >
            <AutoComplete
                style={{width: "100%", maxWidth: "550px"}}
                options={options}
                filterOption={false}
                onSearch={debounce((value: string) => setValue(value), 500)}
            >
                <Input
                    size="large"
                    placeholder="Szukaj po numerze karty, imieniu lub nazwisku"
                    suffix={<SearchOutlined/>}
                />
            </AutoComplete>
        </AntdLayout.Header>
    );
};
