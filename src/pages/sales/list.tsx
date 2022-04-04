import { CrudFilters, IResourceComponentsProps } from "@pankod/refine-core";
import {
    Button,
    Card,
    DeleteButton,
    EditButton,
    Form,
    FormProps,
    getDefaultSortOrder,
    Icons,
    Input,
    List,
    Select,
    ShowButton,
    Space,
    Table,
    TextField,
    useTable
} from "@pankod/refine-antd";

import { ISale } from "interfaces";

export interface ISaleFilteOptions {
    type: string;
    cardId: string;
    //  status: string;
    //   createdAt: [Dayjs, Dayjs];
}


export const SalesList: React.FC<IResourceComponentsProps> = () => {
    const {tableProps, sorter, searchFormProps} = useTable<ISale>({
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const {type, cardId} = params as ISaleFilteOptions;
            if (type && type.length > 0) {
                filters.push({
                    field: "type",
                    operator: "eq",
                    value: type,
                });
            }

            if (cardId && cardId.length > 0) {
                filters.push({
                    field: "cardId",
                    operator: "contains",
                    value: cardId,
                });
            }

            return filters;
        },
        initialSorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
    });

    // const { selectProps: companySelectProps } = useSelect<ICompany>({
    //   resource: "companies",
    // });

    return (
        <List>
            <Card title="Filtry">
                <Filter formProps={searchFormProps}/>
            </Card>
            <Table {...tableProps} rowKey="id">
                {/*<Table.Column*/}
                {/*dataIndex={["company", "name"]}*/}
                {/*title="Company"*/}
                {/*// filterDropdown={(props) => (*/}
                {/*//   <FilterDropdown {...props}>*/}
                {/*//     <Select*/}
                {/*//       style={{ minWidth: 200 }}*/}
                {/*//       mode="multiple"*/}
                {/*//       placeholder="Select Company"*/}
                {/*//       {...companySelectProps}*/}
                {/*//     />*/}
                {/*//   </FilterDropdown>*/}
                {/*// )}*/}
                {/*/>*/}

                <Table.Column
                    dataIndex="cardId"
                    key="cardId"
                    title="Karta"
                    render={(value) => <TextField value={value}/>}
                    defaultSortOrder={getDefaultSortOrder("cardId", sorter)}
                    sorter
                />

                <Table.Column
                    dataIndex="type"
                    key="type"
                    title="Typ"
                    render={(value) => <TextField value={value}/>}
                    defaultSortOrder={getDefaultSortOrder("type", sorter)}
                    sorter
                />
                <Table.Column
                    dataIndex="createdAt"
                    key="createdAt"
                    title="Data"
                    render={(value) => <TextField value={new Date(value).toLocaleString()}/>}
                    defaultSortOrder={getDefaultSortOrder("createdAt", sorter)}
                    sorter
                />
                <Table.Column
                    dataIndex="notes"
                    key="notes"
                    title="Notatki"
                    render={(value) => <TextField value={value}/>}
                    defaultSortOrder={getDefaultSortOrder("notes", sorter)}
                    sorter
                />
                <Table.Column<ISale>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton hideText size="small" recordItemId={record.id}/>
                            <DeleteButton hideText size="small" recordItemId={record.id}/>
                            <ShowButton hideText size="small" recordItemId={record.id}/>
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};


const Filter: React.FC<{ formProps: FormProps }> = ({formProps}) => {
    // const { selectProps: categorySelectProps } = useSelect<ICategory>({
    //     resource: "categories",
    // });

    return (
        <Form layout="vertical" {...formProps}>
            <Form.Item label="Numer karty" name="cardId" initialValue={localStorage.getItem("lastCheckedCardId")}>
                <Input
                    placeholder="Numer karty"
                    prefix={<Icons.SearchOutlined/>}
                />
            </Form.Item>
            <Form.Item label="Typ" name="type">
                <Select
                    allowClear
                    options={[
                        {
                            label: "Ubrania",
                            value: "ubrania",
                        },
                        {
                            label: "Jedzenie",
                            value: "jedzenie",
                        },
                    ]}
                    placeholder="Typ"
                />
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit" type="primary">
                    Filtruj
                </Button>
            </Form.Item>
        </Form>
    );
};
