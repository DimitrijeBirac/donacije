import * as PDF417 from "pdf417-generator";

function floatToHub30Amount(amount) {
  // Multiply by 100 and round to handle potential floating point precision issues
  let cents = Math.round(amount * 100);

  // Format as string with leading zeros and fixed length of 15
  let hub30Format = cents.toString().padStart(15, "0");

  return hub30Format;
}

const formatDebtorData = debtor => {
  const { nameSurname, streetAndHouseNumber, postalCodeAndCity } = debtor;
  return `${nameSurname}\n${streetAndHouseNumber}\n${postalCodeAndCity}`;
};

const formatRecipientData = recipient => {
  const {
    companyName,
    streetAndHouseNumber,
    postalCode,
    city,
    IBAN,
    modelNumber,
    refNumber,
    purposeCode,
  } = recipient;

  return `${companyName}\n${streetAndHouseNumber}\n${postalCode} ${city}\n${IBAN}\n${modelNumber}\n${refNumber}\n${purposeCode}`;
};

const formatDataToHub30 = ({ amount, debtor, recipient, description }) => {
  const amountHub30 = floatToHub30Amount(amount);

  return `HRVHUB30\nEUR\n${amountHub30}\n${formatDebtorData(
    debtor
  )}\n${formatRecipientData(recipient)}\n${description}`;
};

export const generateBarcode = data => {
  const canvas = document.createElement("canvas");
  const formattedData = formatDataToHub30(data);
  PDF417.draw(formattedData, canvas);
  return canvas.toDataURL();
};
