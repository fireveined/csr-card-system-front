import { useState } from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";

import { Edit, Form, Input, useForm, Checkbox, useSelect, Select } from "@pankod/refine-antd";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { ICompany } from "interfaces";

export const SaleEdit: React.FC<IResourceComponentsProps> = () => {
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
  const { formProps, saveButtonProps } = useForm<ICompany>();

  const { selectProps: companySelectProps } = useSelect<ICompany>({
    resource: "companies",
    optionLabel: "name",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
            label="Numer karty"
            name="cardId"
            rules={[{required: true}]}>
          <Input/>
        </Form.Item>

        <Form.Item
            label="Typ"
            name="type"
            rules={[{required: true}]}>
          <Input/>
        </Form.Item>


        <Form.Item
            label="Dodatkowe notatki"
            name="notes">
          <Input.TextArea/>
        </Form.Item>

      </Form>
    </Edit>
  );
};
