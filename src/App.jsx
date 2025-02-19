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
import { useEffect, useRef, useState } from "react";
import { donationOptions, options } from "./enviroment";
import { generateBarcode } from "./services/HUB30BarCodeService";

function App() {
  const [isPrivatePerson, setIsPrivatePerson] = useState(true);
  const [form] = Form.useForm();

  const handleDonationChange = e => {
    // When a new donation option is selected, update the "amount" field
    const selectedAmount = e.target.value;
    form.setFieldsValue({ amount: selectedAmount }); // Dynamically update the amount value in the form
  };

  const [generatedBlob, setGeneratedBlob] = useState(null);
  const barcodeRef = useRef(null);

  const handleSubmit = form => {
    const blob = generateBarcode({
      amount: form?.amount,
      recipient: {
        id: "HR5424020063590007565",
        fullName: "Dimitrije Birač",
        streetAndHouseNumber: "Trpimirova 3",
        city: "Karlovac",
        postalCode: "47000",
        IBAN: "HR5424020063590007565",
        modelNumber: "HR00",
        refNumber: "",
        purposeCode: "COST",
      },
      debtor: {
        nameSurname: form?.name + form.lastName || form.name,
        streetAndHouseNumber: form?.streetAndHouseNumber,
        postalCodeAndCity: `${form?.postalCode} ${form?.city}`,
      },
      description: "",
    });

    setGeneratedBlob(blob);
  };

  useEffect(() => {
    if (barcodeRef.current) {
      barcodeRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [generatedBlob]);

  return (
    <Layout className="p-4">
      <div className="max-w-4xl mx-auto">
        <Content>
          <Title className="my-8 md:!my-12" style={{ fontFamily: "SansBeam" }}>
            Donirajte za Karlovac po mjeri birača
          </Title>
          <Paragraph>
            Svojom donacijom postajete dio povijesne priče. One koja će
            Karlovčane i razvoj grada staviti ispred osobnih ili stranačkih
            interesa. Svojom donacijom pomažete mi da glas onih kojima je
            Karlovac centar svijeta postane prodorniji.
          </Paragraph>
          <Paragraph>
            Nakon što ispunite dolje formular, pojavit će se QR kod kojeg možete
            skenirati sa svojom bankovnom aplikacijom. Sukladno Zakonu o
            financiranju političkih aktivnosti i izborne promidžbe, objava o
            donacijama se dijeli s javnosti, no vaše osobne podatke neću
            koristiti u druge svrhe.
          </Paragraph>
          <Paragraph>
            Ako imate dodatna pitanja, javi se na{" "}
            <a href="mailto:dimitrije.birac@gmail.com">
              dimitrije.birac@gmail.com
            </a>
          </Paragraph>

          <div className="max-w-2xl my-8 md:my-16 mx-auto">
            <Radio.Group
              block
              options={options}
              onChange={() => setIsPrivatePerson(prev => !prev)}
              defaultValue="Privatna osoba"
              optionType="button"
              buttonStyle="solid"
              className="!mb-10"
            />
            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              onFinish={handleSubmit}
            >
              <Form.Item label="Koliko želite donirati?" name="option">
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
                label="Upiši iznos"
                rules={[
                  {
                    required: true,
                    message: "Molimo unesite iznos u EUR!",
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
                      message: "Molimo unesite naziv!",
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
                        message: "Molimo unesite ime!",
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
                        message: "Molimo unesite prezime!",
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
                    message: "Molimo unesite OIB!",
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
                    message: "Molimo unesite email!",
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
                    message: "Molimo unesite prebivalište!",
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
                    message: "Molimo unesite poštanski broj!",
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
                    message: "Molimo unesite ulicu i kućni broj!",
                  },
                ]}
              >
                <Input placeholder="Ulica i kućni broj" />
              </Form.Item>
              <Form.Item
                name="checkboxes"
                label=""
                valuePropName="checked"
                rules={[
                  {
                    required: true,
                    message: "Morate prihvatiti uvjete!",
                  },
                ]}
              >
                <Checkbox.Group>
                  <Space direction="vertical" size={15}>
                    <Checkbox value="checkbox1">
                      * Izjavljujem da se protiv davatelja donacije ne vodi
                      postupak naplate dospjelih nepodmirenih obveza prema
                      državnom proračunu odnosno proračunu jedinice samouprave
                      ili zaposlenicima.
                    </Checkbox>
                    <Checkbox value="checkbox2">
                      * Razumijem da prema Zakonu o financiranju političkih
                      aktivnosti, izborne promidžbe i referenduma, a u svrhu
                      nadzora financiranja političke promidžbe, Državno izborno
                      povjerenstvo mora o svim donacijama izvijestiti javnost.
                      Stoga, sukladno Zakonu, Državno izborno povjerenstvo
                      objavljuje imena i prezimena donatora, njihov OIB te iznos
                      donacije, a u slučaju pravnih osoba i adresu sjedišta.
                    </Checkbox>
                  </Space>
                </Checkbox.Group>
              </Form.Item>

              <Button
                type="primary"
                className="mt-8 w-full"
                htmlType="submit"
                disabled
              >
                Generiraj uplatnicu
              </Button>
            </Form>
          </div>

          {generatedBlob && (
            <div className="text-center my-8 md:my-16" ref={barcodeRef}>
              <Title level={3}>Vaš bar code za uplatu je spreman</Title>
              <Paragraph>
                Skeniraj barkod unutar bankovne aplikacije i izvrši uplatu.
                Hvala što si postao dio prave karlovačke oporbe!
              </Paragraph>
              <img className="mt-8 mx-auto" src={generatedBlob} />
            </div>
          )}
        </Content>
      </div>

      <Footer className="bg-gray-100 p-5">
        <div className="max-w-5xl mx-auto">
          <Row justify="center" align="middle">
            <Col>
              <a
                href="https://www.facebook.com/DimitrijeBirac"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl mx-2"
              >
                <FacebookOutlined />
              </a>
              <a
                href="https://www.instagram.com/dimitrijebirac/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl mx-2"
              >
                <InstagramOutlined />
              </a>
              <a
                href="https://www.tiktok.com/@dimibirac"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl mx-2"
              >
                <TikTokOutlined />
              </a>
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <Paragraph className="text-center mt-2" type="secondary">
                © {new Date().getFullYear()} Dimitrije Birac. All rights
                reserved.
              </Paragraph>
            </Col>
          </Row>
        </div>
      </Footer>
    </Layout>
  );
}

export default App;
