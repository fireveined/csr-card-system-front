import { useCallback, useEffect, useState } from "react";
import { IResourceComponentsProps, useApiUrl } from "@pankod/refine-core";

import { Create, Form, Input, Select, useForm } from "@pankod/refine-antd";

import "react-mde/lib/styles/css/react-mde-all.css";

import { ICompany } from "interfaces";
import { axios } from "../../authProvider";

interface ClientData {
    id: number;
    name: string;
    age: number;
    notes: string;
}


export const SaleCreate: React.FC<IResourceComponentsProps> = () => {
    const {formProps, saveButtonProps} = useForm<ICompany>();
    const [firstDisplay, setFirstDisplay] = useState(true);
    const [clients, setClients] = useState<ClientData[]>([]);
    const apiUrl = useApiUrl();

    const getClients = async (cardId: string) => {
        const data = await axios.get(apiUrl + "/persons/verify/" + cardId)
        data.data.forEach((client: any) => client.key = client.id);
        setClients(data.data);
    }


    const onCardIdInputChange = () => {
        const cardId = (document.querySelector("#cardId_field") as HTMLInputElement).value;
        if (cardId?.length === 5) {
            getClients(cardId);
        } else {
            setClients([]);
        }
    }

    if(firstDisplay){
        setTimeout(() => onCardIdInputChange(), 200);
        setFirstDisplay(false);
    }
    // const { selectProps: companySelectProps } = useSelect<ICompany>({
    //   resource: "companies",
    //   optionLabel: "name",
    // });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">

                <Form.Item
                    label="Numer karty"
                    name="cardId"
                    initialValue={localStorage.getItem("lastCheckedCardId")}
                    rules={[{required: true}]}
                    extra={
                        <span>{clients.length ? "Osoby przypisane do karty: " + clients.map(client => client.name).join(", ") : "Brak osób przypisanych do tej karty"}</span>}>
                    <Input maxLength={5} id={"cardId_field"} onChange={onCardIdInputChange}/>

                </Form.Item>


                <Form.Item
                    label="Typ"
                    name="type"
                    rules={[{required: true}]}>
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


                <Form.Item
                    label="Dodatkowe notatki"
                    name="notes">
                    <Input.TextArea/>
                </Form.Item>


            </Form>
        </Create>
    );
};
