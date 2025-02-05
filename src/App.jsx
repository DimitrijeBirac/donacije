import { Button, Checkbox, Form, Input, InputNumber, Radio } from "antd";
import Link from "antd/es/typography/Link";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { donationOptions, email, name, options } from "./enviroment";

function App() {
  const [isPrivatePerson, setIsPrivatePerson] = useState(true);
  const [form] = Form.useForm();

  const handleDonationChange = e => {
    // When a new donation option is selected, update the "amount" field
    const selectedAmount = e.target.value;
    form.setFieldsValue({ amount: selectedAmount }); // Dynamically update the amount value in the form
  };

  return (
    <>
      <Title>Podržite {name} novčanim donacijama</Title>
      <Paragraph>
        Kako biste uplatili donaciju, molimo unesite tražene podatke u formular
        niže, nakon čega ćete dobiti nalog za plaćanje. Bez traženih podataka
        vaša donacija je anonimna te je nećemo moći iskoristiti. Sukladno Zakonu
        o financiranju političkih aktivnosti i izborne promidžbe, dužni smo o
        svim donacijama izvijestiti javnost, što uključuje i objavu vaših
        osobnih podataka.
      </Paragraph>
      <Paragraph>Vaše osobne podatke nećemo koristiti u druge svrhe.</Paragraph>
      <Paragraph>
        Provjerite u{" "}
        <Link
          href="https://narodne-novine.nn.hr/clanci/sluzbeni/2019_03_29_602.html"
          target="_blank"
        >
          Zakonu o financiranju političkih aktivnosti, izborne promidžbe i
          referenduma
        </Link>{" "}
        postoje li ograničenja za doniranje koja se odnose na vas (članak 46).
      </Paragraph>
      <Paragraph>
        Ako imate pitanja vezanih za donacije, javite nam se na{" "}
        <Link>{email}</Link>.
      </Paragraph>

      <Radio.Group
        block
        options={options}
        onChange={() => setIsPrivatePerson(prev => !prev)}
        defaultValue="Privatna osoba"
        optionType="button"
        buttonStyle="solid"
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
          <InputNumber prefix="EUR" placeholder="Iznos" />
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
          <InputNumber placeholder="OIB" />
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
          name="location"
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
          <InputNumber placeholder="Poštanski broj" />
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

      <Checkbox>
        * Izjavljujem da se protiv davatelja donacije ne vodi postupak naplate
        dospjelih nepodmirenih obveza prema državnom proračunu odnosno proračunu
        jedinice samouprave ili zaposlenicima.
      </Checkbox>
      <Checkbox>
        * Razumijem da prema Zakonu o financiranju političkih aktivnosti,
        izborne promidžbe i referenduma, a u svrhu nadzora financiranja
        političke promidžbe, Državno izborno povjerenstvo mora o svim donacijama
        izvijestiti javnost. Stoga, sukladno Zakonu, Državno izborno
        povjerenstvo objavljuje imena i prezimena donatora, njihov OIB te iznos
        donacije, a u slučaju pravnih osoba i adresu sjedišta.
      </Checkbox>

      <Button type="primary">Generiraj uplatnicu</Button>
    </>
  );
}

export default App;
