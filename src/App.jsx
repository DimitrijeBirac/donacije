import {
  FacebookOutlined,
  InstagramOutlined,
  TikTokOutlined,
} from "@ant-design/icons";
import {
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
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { donationOptions, options } from "./enviroment";
import { generateBarcode } from "./services/HUB30BarCodeService";

const Email = () => {
  const user = "dimitrije";
  const domain = "gmail.com";
  return (
    <a href={`mailto:${user}.birac@${domain}`}>
      {user}.birac@{domain}
    </a>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 2, // Delays first child animation
      staggerChildren: 0.3, // Time between each child animation
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

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
        fullName: "Dimitrije Birac",
        streetAndHouseNumber: "Trpimirova 3",
        city: "Karlovac",
        postalCode: "47000",
        IBAN: "HR5424020063590007565",
        modelNumber: "HR00",
        refNumber: form.oib,
        purposeCode: "COST",
      },
      debtor: {
        nameSurname: form?.name + form.lastName || form.name,
        streetAndHouseNumber: form?.streetAndHouseNumber,
        postalCodeAndCity: `${form?.postalCode} ${form?.city}`,
      },
      description: "Donacija",
    });

    setGeneratedBlob(blob);
  };

  useEffect(() => {
    if (barcodeRef.current) {
      barcodeRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [generatedBlob]);

  return (
    <Layout className=" !bg-slate-50">
      <div className="max-w-4xl mx-auto px-5 pt-5">
        <Content>
          <motion.div
            className="w-40 md:w-60 mx-auto mt-8"
            initial={{ opacity: 1, scale: 2.6, x: 0, y: "100%" }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            onAnimationStart={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            onAnimationComplete={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          >
            <img src="/logo.svg" alt="Logo" />
          </motion.div>
          <motion.h1
            className="my-8 md:!my-12 text-4xl md:text-6xl"
            style={{ fontFamily: "SansBeam" }}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.5 }} // Added delay for timing after logo animation
          >
            Donirajte za Karlovac po mjeri birača
          </motion.h1>

          {/* Paragraphs - Staggered Fade-In */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.p className="text-base my-5" variants={itemVariants}>
              Svojom donacijom postajete dio povijesne priče. One koja će
              Karlovčane i razvoj grada staviti ispred osobnih ili stranačkih
              interesa. Svojom donacijom pomažete mi da glas onih kojima je
              Karlovac centar svijeta postane prodorniji.
            </motion.p>
            <motion.p className="text-base my-5" variants={itemVariants}>
              Nakon što ispunite formular, pojavit će se barcod kojeg možete
              skenirati sa svojom bankovnom aplikacijom.
            </motion.p>
            <motion.p className="text-base my-5" variants={itemVariants}>
              Sukladno Zakonu o financiranju političkih aktivnosti i izborne
              promidžbe, objava o donacijama se dijeli s javnosti, no vaše
              osobne podatke neću koristiti u druge svrhe.
            </motion.p>
            <motion.p className="text-base my-5" variants={itemVariants}>
              Ako imate dodatna pitanja, javite se na <Email />
            </motion.p>

            <motion.div
              className="max-w-2xl my-8 md:my-16 mx-auto"
              variants={itemVariants}
            >
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
                  <Checkbox.Group className="text-left">
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
                        nadzora financiranja političke promidžbe, Državno
                        izborno povjerenstvo mora o svim donacijama izvijestiti
                        javnost. Stoga, sukladno Zakonu, Državno izborno
                        povjerenstvo objavljuje imena i prezimena donatora,
                        njihov OIB te iznos donacije, a u slučaju pravnih osoba
                        i adresu sjedišta.
                      </Checkbox>
                    </Space>
                  </Checkbox.Group>
                </Form.Item>

                <motion.button
                  type="submit"
                  className="mt-4 md:mt-8 w-full bg-emerald-400 text-white py-2 rounded-lg cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 1 }}
                >
                  Generiraj uplatnicu
                </motion.button>
              </Form>
            </motion.div>
          </motion.div>

          {generatedBlob && (
            <div
              className="text-left md:text-center my-10 md:my-16"
              ref={barcodeRef}
            >
              <Title className="!text-3xl">
                Vaš barkod za uplatu je spreman!
              </Title>
              <Paragraph className="!text-base">
                Skenirajte barkod unutar bankovne aplikacije i izvršite uplatu.
                Hvala što ste postali dio prave karlovačke oporbe!
              </Paragraph>
              <img className="mt-8 mx-auto w-sm" src={generatedBlob} />
            </div>
          )}
        </Content>
      </div>

      <Footer className="!bg-slate-100">
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
