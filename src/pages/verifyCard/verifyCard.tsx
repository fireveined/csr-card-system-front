import { Button, Card, Form, Input, Table } from "@pankod/refine-antd"
import * as React from "react";
import { useRef, useState } from "react";
import { useApiUrl, useNavigation, useNotification } from "@pankod/refine-core";
import { axios } from "../../authProvider";
import { QrReader } from 'react-qr-reader';


interface ClientData {
    id: number;
    name: string;
    age: number;
    notes: string;
}

export const CardVerifyPage = () => {
    const apiUrl = useApiUrl();
    const [clients, setClients] = useState<ClientData[]>([]);
    const [checkedCardId, setCheckedCardId] = useState<string>("");
    const [QRScannerEnabled, setQRScannerEnabled] = useState<number>(0);
    const {push} = useNavigation();
    const {open} = useNotification();
    const cardIdInputRef = useRef(null);

    const getClients = async () => {
        const cardId = (document.querySelector("#cardId_field") as HTMLInputElement).value;
        try {
            const data = await axios.get(apiUrl + "/persons/verify/" + cardId)
            data.data.forEach((client: any) => client.key = client.id);
            setClients(data.data);
            setCheckedCardId(cardId);
            if (data.data.length) {
                localStorage.setItem("lastCheckedCardId", cardId)
            } else {
                localStorage.removeItem("lastCheckedCardId")
            }
        } catch (e: any) {
            console.error(e);
            open({
                message: e.toString(),
                description: "Niepoprawny kod",
                key: "qr-code" + Date.now(),
                type: "error"
            });
        }
    }

    const redirectToGivenHelpsList = () => {
        push("/sales?current=1&pageSize=10&sorter[0][field]=createdAt&sorter[0][order]=desc&filters[0][field]=cardId&filters[0][operator]=contains&filters[0][value]=" + checkedCardId)
    }


    const columns = [{
        title: 'Imię',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Wiek',
        dataIndex: 'age',
        key: 'age',
    }, {
        title: 'Notatki',
        dataIndex: 'notes',
        key: 'notes',
    }];

    const table = clients.length
        ? <div><br/><br/>
            <b> Osoby przypisane do karty numer {checkedCardId}</b>
            <Table columns={columns} dataSource={clients}/>
        </div>
        : (checkedCardId ? <b> Brak osób przypisanych do karty o numerze {checkedCardId}</b> : "");


    const checkGivenHelpsButton = clients.length ?
        <Button type={"primary"} onClick={redirectToGivenHelpsList}>Pokaż przedmioty wydane na tę kartę</Button> : "";


    return (
        <Card>
            <div>

                <Form layout="vertical">
                    <Form.Item
                        label="Numer karty"
                        name="cardId"
                        rules={[{required: true}]}>
                        <Input ref={cardIdInputRef} id={"cardId_field"}/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary"
                                onClick={getClients}>
                            Sprawdź przypisane osoby
                        </Button>
                    </Form.Item>

                    {(QRScannerEnabled === 0 && !clients.length) ? <Button type="primary"
                                                                           onClick={() => setQRScannerEnabled(1)}>
                        Włącz skaner QR kodów
                    </Button> : ""}

                    {checkGivenHelpsButton}
                </Form>
                {table}

                {QRScannerEnabled === 1 ? <QrReader
                    constraints={{facingMode: 'user'}}
                    scanDelay={700}
                    onResult={(result: any, error: any) => {
                        if (!!result && result.text && result.text !== checkedCardId) {
                            console.log((cardIdInputRef.current as any).input);
                            ((cardIdInputRef.current as any).input as HTMLInputElement).value = result.text;
                            getClients();
                            setQRScannerEnabled(2);
                        }

                        if (!!error && (error.message || error.name || "").toLowerCase() !== "e") {
                            console.error(error);
                            open({
                                message: error.toString(),
                                description: "Nie można uruchomić kamery",
                                key: "unique-id",
                                type: "error"
                            });
                        }
                    }}
                /> : ""}
            </div>
        </Card>
    );

};
