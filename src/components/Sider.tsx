import React, {useState} from "react";
import {useLogout, useNavigation, useTitle} from "@pankod/refine-core";
import {AntdLayout, Grid, Icons, Menu, useMenu} from "@pankod/refine-antd";
import {antLayoutSider, antLayoutSiderMobile, SiderLanguageButton} from "./styles";
import {useTranslation} from "react-i18next";

export const CustomSider: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [t, i18n] = useTranslation()
    const Title = useTitle();
    const {mutate: logout} = useLogout();
    const {menuItems, selectedKey} = useMenu();
    const breakpoint = Grid.useBreakpoint();
    const {push} = useNavigation();
    console.log(selectedKey)
    const isMobile = !breakpoint.lg;
    console.log(menuItems);

    function changeLanguage(language: string) {
        i18n.changeLanguage(language)
    }

    return (
        <AntdLayout.Sider
            collapsible
            collapsedWidth={isMobile ? 0 : 80}
            collapsed={collapsed}
            breakpoint="lg"
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
            style={isMobile ? antLayoutSiderMobile : antLayoutSider}
        >
            <div style={{display: "flex", marginTop: 15}}>
                <img style={{width: 50, margin: "0 auto"}} src={"logo.png"}/>
            </div>

            {Title && <Title collapsed={collapsed}/>}
            <Menu
                selectedKeys={[selectedKey]}
                mode="inline"
                onClick={({key}) => {
                    if (!breakpoint.lg) {
                        setCollapsed(true);
                    }

                    push(key as string);
                }}
            >
                {menuItems.map(({icon, label, route}) => {
                    const isSelected = route === selectedKey;
                    return (
                        <Menu.Item
                            style={{
                                fontWeight: isSelected ? "bold" : "normal"
                            }}
                            key={route}
                            icon={icon || <Icons.LoginOutlined/>}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                {t(`${label}`)}
                                {!collapsed && isSelected && <Icons.RightOutlined/>}
                            </div>
                        </Menu.Item>
                    );
                })}


                <Menu.Item style={{
                    fontWeight: selectedKey === "/verify-card" ? "bold" : "normal"
                }} icon={<Icons.LoginOutlined/>} key={"/verify-card"}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <span>{t('verify-card')}</span>
                        {!collapsed && selectedKey === "/verify-card" && <Icons.RightOutlined/>}
                    </div>
                </Menu.Item>
                <Menu.Item>
                <div style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <button style={SiderLanguageButton} onClick={() => changeLanguage('en')}>EN</button>
                    <button style={SiderLanguageButton} onClick={() => changeLanguage('pl')}>PL</button>
                    <button style={SiderLanguageButton} onClick={() => changeLanguage('ua')}>UA</button>
                </div>
                </Menu.Item>
                <Menu.Item key={"#"}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <span onClick={() => logout()}>{t('log-out')}</span>
                    </div>
                </Menu.Item>
            </Menu>
        </AntdLayout.Sider>
    );
};

export const LogoutButton = () => {
    const {mutate: logout} = useLogout();


};
