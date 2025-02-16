import {
  FacebookOutlined,
  InstagramOutlined,
  TikTokOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Layout,
  Radio,
  Row,
  Space,
} from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { donationOptions, options } from "./enviroment";

function App() {
  const [isPrivatePerson, setIsPrivatePerson] = useState(true);
  const [form] = Form.useForm();

  const handleDonationChange = e => {
    // When a new donation option is selected, update the "amount" field
    const selectedAmount = e.target.value;
    form.setFieldsValue({ amount: selectedAmount }); // Dynamically update the amount value in the form
  };

  return (
    <Layout>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Content>
          <Title style={{ margin: "3rem 0" }}>
            Doniraj za Karlovac po mjeri birača
          </Title>
          <Paragraph>
            Svojom donacijom postaješ dio povijesne priče. One koja će
            Karlovčane i razvoj grada staviti ispred osobnih ili stranačkih
            interesa. Svojom donacijom pomažeš mi da glas onih kojima je
            Karlovac centar svijeta postane prodorniji.
          </Paragraph>
          <Paragraph>
            Nakon što ispuniš dolje formular, pojavit će se QR kod kojeg možeš
            skenirati sa svojom bankovnom aplikacijom. Sukladno Zakonu o
            financiranju političkih aktivnosti i izborne promidžbe, objava o
            donacijama se dijeli s javnosti, no tvoje osobne podatke neću
            koristiti u druge svrhe.
          </Paragraph>
          <Paragraph>
            Ako imaš dodatna pitanja, javi se na{" "}
            <a href="mailto:dimitrije.birac@gmail.com">
              dimitrije.birac@gmail.com
            </a>
          </Paragraph>

          <div style={{ maxWidth: "700px", margin: "4rem auto" }}>
            <Radio.Group
              block
              options={options}
              onChange={() => setIsPrivatePerson(prev => !prev)}
              defaultValue="Privatna osoba"
              optionType="button"
              buttonStyle="solid"
              style={{ marginBottom: "2rem" }}
            />
            <Form form={form} layout="vertical" autoComplete="off">
              <Form.Item label="Koliko želite donirat?" name="option">
                <Radio.Group
                  block
                  options={donationOptions}
                  optionType="button"
                  buttonStyle="solid"
                  onChange={handleDonationChange}
                />
              </Form.Item>
              <Form.Item
                name="amount"
                label="Iznos"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber
                  prefix="EUR"
                  placeholder="Iznos"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              {!isPrivatePerson && (
                <Form.Item
                  name="name"
                  label="Naziv"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Naziv" />
                </Form.Item>
              )}
              {isPrivatePerson && (
                <>
                  <Form.Item
                    name="name"
                    label="Ime"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Ime" />
                  </Form.Item>
                  <Form.Item
                    name="lastName"
                    label="Prezime"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Prezime" />
                  </Form.Item>
                </>
              )}
              <Form.Item
                name="oib"
                label="OIB"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber placeholder="OIB" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="city"
                label="Mjesto prebivališta"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Mjesto prebivališta" />
              </Form.Item>
              <Form.Item
                name="postalCode"
                label="Poštanski broj"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber
                  placeholder="Poštanski broj"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                name="streetAndHouseNumber"
                label="Ulica i kućni broj"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Ulica i kućni broj" />
              </Form.Item>
            </Form>
            <Space direction="vertical" size={15}>
              <Checkbox>
                * Izjavljujem da se protiv davatelja donacije ne vodi postupak
                naplate dospjelih nepodmirenih obveza prema državnom proračunu
                odnosno proračunu jedinice samouprave ili zaposlenicima.
              </Checkbox>
              <Checkbox>
                * Razumijem da prema Zakonu o financiranju političkih
                aktivnosti, izborne promidžbe i referenduma, a u svrhu nadzora
                financiranja političke promidžbe, Državno izborno povjerenstvo
                mora o svim donacijama izvijestiti javnost. Stoga, sukladno
                Zakonu, Državno izborno povjerenstvo objavljuje imena i
                prezimena donatora, njihov OIB te iznos donacije, a u slučaju
                pravnih osoba i adresu sjedišta.
              </Checkbox>
            </Space>
            <Button type="primary" style={{ marginTop: "2rem", width: "100%" }}>
              Generiraj uplatnicu
            </Button>
          </div>

          {/* <img
            style={{ width: 180, height: 60 }}
            src={generateBarcode({
              amount: donation?.amount,
              recipient: {
                id: "HR101203123",
                fullName: "Name Surname",
                companyName: "Company",
                streetAndHouseNumber: "Ime ulice",
                city: "Karlovac",
                postalCode: "47000",
                IBAN: "HR101203123",
                modelNumber: "HR00",
                refNumber: "",
                purposeCode: "COST",
              },
              debtor: {
                nameSurname: donation?.name + donation.lastName || donation.name,
                streetAndHouseNumber: invoiceData?.streetAndHouseNumber,
                postalCodeAndCity: `${invoiceData?.postalCode} ${invoiceData?.city}`,
              },
              description: "",
            })}
          /> */}
        </Content>
      </div>

      <Footer style={{ background: "#f0f2f5", padding: "20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Row justify="center" align="middle">
            <Col>
              <a
                href="https://www.facebook.com/DimitrijeBirac"
                target="_blank"
                rel="noopener noreferrer"
                style={{ margin: "0 10px", fontSize: "24px" }}
              >
                <FacebookOutlined />
              </a>
              <a
                href="https://www.instagram.com/dimitrijebirac/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ margin: "0 10px", fontSize: "24px" }}
              >
                <InstagramOutlined />
              </a>
              <a
                href="https://www.tiktok.com/@dimibirac"
                target="_blank"
                rel="noopener noreferrer"
                style={{ margin: "0 10px", fontSize: "24px" }}
              >
                <TikTokOutlined />
              </a>
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <p
                style={{
                  marginTop: "10px",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                © {new Date().getFullYear()} Dimitrije Birac. All rights
                reserved.
              </p>
            </Col>
          </Row>
        </div>
      </Footer>
    </Layout>
  );
}

export default App;
