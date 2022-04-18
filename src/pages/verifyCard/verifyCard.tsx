
import {Button, Card, Form, Image, Input, Table} from "@pankod/refine-antd"
import * as React from "react";
import {useRef, useState} from "react";
import {useApiUrl, useNavigation, useNotification} from "@pankod/refine-core";
import {axios} from "../../authProvider";
import {QrReader} from 'react-qr-reader';
import "./styles.css";
import {useTranslation} from "react-i18next";


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
    const [t, i18n] = useTranslation();

    const getClients = async () => {
        const cardId = (document.querySelector("#cardId_field") as HTMLInputElement).value;
        if (!cardId || cardId.length !== 5) {
            open({
                message: t('card-hint'),
                description: t('error'),
                key: "qr-code" + Date.now(),
                type: "error"
            });
            return;
        }

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
        title: t('name'),
        dataIndex: 'name',
        key: 'name',
    }, {
        title: t('age'),
        dataIndex: 'age',
        key: 'age',
    }, {
        title: t('notes'),
        dataIndex: 'notes',
        key: 'notes',
    }];

    const table = clients.length
        ? <div><br/><br/>
            <b> {t('people-on-the-card')}Osoby przypisane do karty numer {checkedCardId}</b>
            <Table columns={columns} dataSource={clients}/>
        </div>
        : (checkedCardId ? <b> {t('lack-of-people-on-the-card')}Brak osób przypisanych do karty o numerze {checkedCardId}</b> : "");


    const checkGivenHelpsButton = clients.length ?
        <Button type={"primary"} onClick={redirectToGivenHelpsList}>{t('show-received-items')}Pokaż przedmioty wydane na tę kartę</Button> : "";


    return (
        <Card>
            <div>

                <Form layout="vertical">
                    <Form.Item
                        label={t('card-id')}
                        name="cardId"
                        rules={[{required: true}]}
                        extra={t('card-hint')}>
                        <Input ref={cardIdInputRef} id={"cardId_field"}/>
                    </Form.Item>
                    <div className="form-row">
                        <Button htmlType="submit" type="primary"
                                onClick={getClients}>
                            {t('check-people-on-the-card')}
                        </Button>
                        <Form.Item>
                        </Form.Item>
                        {QRScannerEnabled === 1 &&
                            <Button className="qr-reader-close-button" onClick={()=> setQRScannerEnabled(0)}>{t('close-qr-scanner')}</Button>}
                    </div>
                    {(QRScannerEnabled === 0 && !clients.length) ? <Button type="primary"
                                                                           onClick={() => setQRScannerEnabled(1)}>
                        {t('open-qr-scanner')}
                    </Button> : ""}

                    {checkGivenHelpsButton}
                </Form>
                {table}

                {QRScannerEnabled === 1 ? <QrReader
                    constraints={{facingMode: 'environment'}}
                    scanDelay={700}
                    videoStyle={{height:'80%'}}
                    onResult={(result: any, error: any) => {
                        if (!!result && result.text && result.text !== checkedCardId) {
                            console.log((cardIdInputRef.current as any).input);
                            ((cardIdInputRef.current as any).input as HTMLInputElement).value = result.text;
                            getClients();
                            setQRScannerEnabled(2);
                        }

                        if (!!error && (error.message || error.name || "").toLowerCase().length > 4) {
                            console.error(error);
                            open({
                                message: error.toString(),
                                description: t('qr-scanner-opening-error'),
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
