import { dataStore } from "@app/store";
import { DrawOutBtn } from "@app/pages/commodity";
import { Form, Input } from "antd";
import { Row } from "@app/pages/register/form";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { ButtonContainer, Select } from "../tabStyle";
import { Container } from "./editPassword";

export default function EditMember({ member }) {
  const [form] = Form.useForm();
  const [year, setYear] = useState(member.birthday?.split("-")[0] || "");
  const [month, setMonth] = useState(member.birthday?.split("-")[1] || "");
  const [day, setDay] = useState(member.birthday?.split("-")[2] || "");
  useEffect(() => {
    if (!member || !form) return;
    form.setFieldsValue(member);
  }, [member, form]);

  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const padNumber = (num) => String(num).padStart(2, '0');

  // 創建一個 styled Select 元件
  const StyledSelect = styled(Select)`
  /* 桌面版樣式 */
  .ant-select-selector {
    background-color: #f0f0f0;
    color: #000;
  }

  /* 手機版樣式 */
  @media only screen and (max-width: 768px) {
    .ant-select-selector {
      background-color: white !important;
      color: black !important;
    }

    .ant-select-selection-placeholder {
      color: black !important;
    }

    .ant-select-arrow {
      color: black !important;
    }

    .ant-select-selection-item {
      color: black !important;
    }

    /* 手機版禁用狀態樣式 */
    &.ant-select-disabled .ant-select-selector {
      background-color: #e0e0e0 !important; /* 禁用狀態下的背景色 */
      color: #a0a0a0 !important; /* 禁用狀態下的文字色 */
      cursor: not-allowed; /* 更改鼠標樣式 */
    }

    &.ant-select-disabled .ant-select-selection-placeholder {
      color: #a0a0a0 !important; /* 禁用狀態下的佔位符文字色 */
    }

    &.ant-select-disabled .ant-select-arrow {
      color: #a0a0a0 !important; /* 禁用狀態下的箭頭顏色 */
    }

    &.ant-select-disabled .ant-select-selection-item {
      color: #a0a0a0 !important; /* 禁用狀態下的選中項文字色 */
    }
  }
`;


  return (
    <Container id="edit-member">
      <Form form={form} layout="vertical">
        <Row>
          <Form.Item
            label="暱稱"
            name="nickName"
            rules={[{ required: true, message: "不可為空" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="收貨姓名"
            name="name"
            rules={[{ required: true, message: "不可為空" }]}
          >
            <Input />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item
            label="生日（僅可填寫一次，如需修改請洽詢客服）"
            name="birthday"
            rules={[
              { required: false, message: "請輸入正確的生日" },
              {
                type: "string",
                len: 10,
                message: "請輸入正確的生日",
              },
            ]}
          >
            <div style={{ display: "flex", gap: "10px"}}>
              <StyledSelect value={year} onChange={(value) => setYear(value)} disabled={member.birthday}>
                <Option value="">請選擇年</Option>
                {years.map((year) => (
                  <Option value={year}>{year}</Option>
                ))}
              </StyledSelect>
              <StyledSelect value={month} onChange={(value) => setMonth(value)} disabled={member.birthday}>
                <Option value="">請選擇月</Option>
                {months.map((month) => (
                  <Option value={month}>{padNumber(month)}</Option>
                ))}
              </StyledSelect>
              <StyledSelect value={day} onChange={(value) => setDay(value)} disabled={member.birthday}>
                <Option value="">請選擇日</Option>
                {days.map((day) => (
                  <Option value={day}> {padNumber(day)}</Option>
                ))}
              </StyledSelect>
            </div>
          </Form.Item>
          <Form.Item
            label="手機"
            name="phoneNum"
            rules={[
              { required: true, message: "不可為空" },
              {
                type: "string",
                len: 10,
                message: "請輸入正確的手機號碼",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              { required: true, message: "不可為空" },
              { type: "email", message: "格式錯誤" },
            ]}
          >
            <Input />
          </Form.Item>
        </Row>

        <Row>
          <Form.Item
            label="郵遞區號"
            name="districtNo"
            rules={[{ required: true, message: "不可為空" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="居住城市"
            name="city"
            rules={[{ required: true, message: "不可為空" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="居住地區"
            name="districtName"
            rules={[{ required: true, message: "不可為空" }]}
          >
            <Input />
          </Form.Item>
        </Row>
        <Form.Item
          label="詳細地址"
          name="address"
          rules={[{ required: true, message: "不可為空" }]}
        >
          <Input />
        </Form.Item>
      </Form>
      <ButtonContainer>
        <DrawOutBtn onClick={onEditMemberSubmit}>修改會員資料</DrawOutBtn>
      </ButtonContainer>
    </Container>
  );

  async function onEditMemberSubmit(e) {
    // if (member.lineUserId === null) {
    //   const file = headShotFile.current.files[0];
    //   const formData = form.getFieldsValue()
    //   dataStore.uploadHeadShot(file, formData.statusMessage);
    // }
    e.preventDefault();
    await form.validateFields().then(
      () => {
        const formData = form.getFieldsValue();
        let birthday = member.birthday;
        if (year && month && day) {
          const paddedMonth = padNumber(month);
          const paddedDay = padNumber(day);
          birthday = `${year}-${paddedMonth}-${paddedDay}`;
        }
        const req = {
          id: member.id,
          account: member.account,
          ...formData,
          birthday,
        };
        console.log("formData", formData, req);
        dataStore.editMember(req);
      },
      () => {}
    );
  }
}
