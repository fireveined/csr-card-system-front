import { useState } from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";

import { Create, Form, Input, useForm, Checkbox, useSelect, Select, InputNumber  } from "@pankod/refine-antd";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { ICompany } from "interfaces";

export const SaleCreate: React.FC<IResourceComponentsProps> = () => {
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
  const { formProps, saveButtonProps } = useForm<ICompany>();

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
            rules={[{required: true}]}>
          <Input/>
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
      </Form>
    </Create>
  );
};
