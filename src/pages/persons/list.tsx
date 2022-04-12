import {CrudFilters, IResourceComponentsProps} from "@pankod/refine-core";

import {
    Button,
    Card,
    Collapse,
    DeleteButton,
    EditButton,
    Form,
    FormProps,
    getDefaultSortOrder,
    Icons,
    Input,
    List,
    ShowButton,
    Space,
    Table,
    TextField,
    useTable
} from "@pankod/refine-antd";

import {ICompany, IPerson} from "interfaces";
import * as React from "react";
import {useTranslation} from "react-i18next";


export interface IPersonFilterOption {
    documentId: string;
    cardId: string;
    surname: string;
    //  status: string;
    //   createdAt: [Dayjs, Dayjs];
}


export const PersonList: React.FC<IResourceComponentsProps> = () => {
    const [t] = useTranslation();
    const {tableProps, sorter, searchFormProps} = useTable<IPerson>({

        onSearch: (params) => {
            const filters: CrudFilters = [];
            const {documentId, cardId, surname} = params as IPersonFilterOption;

            if (surname && surname.length > 0) {
                filters.push({
                    field: "surname",
                    operator: "contains",
                    value: surname,
                });
            }

            if (cardId && cardId.length > 0) {
                filters.push({
                    field: "cardId",
                    operator: "contains",
                    value: cardId,
                });
            }

            if (documentId && documentId.length > 0) {
                filters.push({
                    field: "documentId",
                    operator: "contains",
                    value: documentId,
                });
            }

            return filters;
        },
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
    });

    return (
        <List>
            {/*<Collapse >*/}
            {/*<Collapse.Panel key={"1"} header={"Filtry"}>*/}
            <Card title={t('filters')}>
                <Filter formProps={searchFormProps}/>
            </Card>
            {/*</Collapse.Panel>*/}
            {/*</Collapse>*/}
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="cardId"
                    key="cardId"
                    title={t('card')}
                    render={(value) => <TextField value={value}/>}
                    defaultSortOrder={getDefaultSortOrder("cardId", sorter)}
                    sorter
                />
                <Table.Column
                    dataIndex="name"
                    key="name"
                    title={t('name')}
                    render={(value) => <TextField value={value}/>}
                    defaultSortOrder={getDefaultSortOrder("name", sorter)}
                    sorter
                />
                <Table.Column
                    dataIndex="surname"
                    key="surname"
                    title={t('surname')}
                    render={(value) => <TextField value={value}/>}
                    defaultSortOrder={getDefaultSortOrder("surname", sorter)}
                    sorter
                />
                <Table.Column
                    dataIndex="age"
                    key="age"
                    title={t('age')}
                    render={(value) => <TextField value={value}/>}
                    defaultSortOrder={getDefaultSortOrder("age", sorter)}
                    sorter
                />
                <Table.Column
                    dataIndex="documentId"
                    key="documentId"
                    title={t('document')}
                    render={(value) => <TextField value={value}/>}
                    defaultSortOrder={getDefaultSortOrder("documentId", sorter)}
                    sorter
                />
                <Table.Column
                    dataIndex="notes"
                    key="notes"
                    title={t('notes')}
                    render={(value) => <TextField value={value.length > 20 ? value.substr(0, 20) + "..." : value}/>}
                    defaultSortOrder={getDefaultSortOrder("notes", sorter)}
                    sorter
                />
                <Table.Column<ICompany>
                    title={t('actions')}
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
    const [t]= useTranslation();
    // const { selectProps: categorySelectProps } = useSelect<ICategory>({
    //     resource: "categories",
    // });

    return (
        <Form layout="vertical" {...formProps}>
            <Form.Item label={t('card-id')} name="cardId">
                <Input
                    placeholder={t('card-id')}
                    prefix={<Icons.SearchOutlined/>}
                />
            </Form.Item>
            <Form.Item label={t('surname')} name="surname">
                <Input
                    placeholder={t('surname')}
                    prefix={<Icons.SearchOutlined/>}
                />
            </Form.Item>

            <Form.Item label={t('document-id')} name="documentId">
                <Input
                    placeholder={t('document-id')}
                    prefix={<Icons.SearchOutlined/>}
                />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" type="primary">
                    {t('filter')}
                </Button>
            </Form.Item>
        </Form>
    );
};

