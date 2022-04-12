import {Refine} from "@pankod/refine-core";
import {Layout, notificationProvider} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/styles.min.css";
import nestjsxCrudDataProvider from "@pankod/refine-nestjsx-crud";

import {PersonCreate, PersonEdit, PersonList, PersonShow,} from "./pages/persons";
import {SaleCreate, SaleEdit, SaleShow, SalesList} from "pages/sales";
import {authProvider, axios, mockedAuthProvider} from "./authProvider";
import {ac} from "./ac";
import {CustomSider} from "./components/Sider";
import {Header} from "./components/Header";
import {Login} from "./pages/login";
import {API_URL} from "./config";
import {CardVerifyPage} from "./pages/verifyCard/verifyCard";
import {useTranslation} from "react-i18next";

function App() {
//
// const translations: any = {
//     "Create Klienci": "Dodaj klienta",
//     "Kliencis": "Lista klientów",
//     "Save": "Dodaj",
//     "Create Udzielona pomoc": "Dodaj udzieloną pomoc",
//     "Udzielona pomocs": "Lista udzielonej pomocy",
// }
//     const i18nProvider = {
//         translate: (key: string, params: object) => {
//             if(translations[params.toString()]){
//                 return translations[params.toString()];
//             }
//             if((params.toString()) === "Kliencis"){
//                 return "Klienci";
//             }
//             console.log(key, params);
//             return params.toString();
//         },
//         changeLocale: (lang: string) => Promise.resolve(),
//         getLocale: () =>  "en",
//     };

    const [t] = useTranslation()
    const dataProvider = nestjsxCrudDataProvider(API_URL, axios);

    return (
        <Refine
            routerProvider={{
                ...routerProvider, routes: [{
                    exact: true,
                    element: <CardVerifyPage/>,
                    path: "/verify-card",
                    layout: true
                }]
            }}
            notificationProvider={notificationProvider}
            // i18nProvider={i18nProvider}
            Layout={Layout}
            dataProvider={dataProvider}
            authProvider={mockedAuthProvider}
            LoginPage={Login}
            Sider={CustomSider}
            syncWithLocation={true}
            Header={Header}
            accessControlProvider={{
                can: async ({resource, action}) => {
                    let can: boolean = false;
                    const stringifyUser = localStorage.getItem('refine-user');
                    if (stringifyUser) {
                        const {roles} = JSON.parse(stringifyUser);

                        [roles].forEach((role: string) => {
                            switch (action) {
                                case 'list':
                                    can = ac.can(role).read(resource).granted;
                                    break;
                                case 'show':
                                    can = ac.can(role).read(resource).granted;
                                    break;
                                case 'create':
                                    can = ac.can(role).create(resource).granted;
                                    break;
                                case 'edit':
                                    can = ac.can(role).update(resource).granted;
                                    break;
                                case 'delete':
                                    can = ac.can(role).delete(resource).granted;
                                    break;
                            }
                        });
                    }
                    return Promise.resolve({can});
                },
            }}
            resources={[{
                name: "persons",
                list: PersonList,
                create: PersonCreate,
                edit: PersonEdit,
                show: PersonShow,
                options: {label: t('people')}
            }, {
                name: "sales",
                list: SalesList,
                create: SaleCreate,
                edit: SaleEdit,
                show: SaleShow,
                options: {label: t('aid-provided')}
            }]}
        />
    );
}

export default App;
