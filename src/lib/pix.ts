// PIX BR Code Generator - Padrão EMV (BR Code)
// 100% client-side, sem necessidade de backend.
// Compatível com GitHub Pages.

// Chave PIX do destinatário (CPF): 337.833.628-57
export const PIX_KEY = "33783362857";
export const PIX_RECEIVER_NAME = "AI SCHOOL TECNOLOGIA EDUCACIONAL";
export const PIX_CITY = "SAO PAULO";

// EMV BR Code fields
const EMV = {
  PAYLOAD_FORMAT: "00",
  MERCHANT_ACCOUNT_INFORMATION: "26",
  MERCHANT_CATEGORY_CODE: "52",
  TRANSACTION_CURRENCY: "53",
  TRANSACTION_AMOUNT: "54",
  COUNTRY_CODE: "58",
  MERCHANT_NAME: "59",
  MERCHANT_CITY: "60",
  ADDITIONAL_DATA_FIELD: "62",
  CRC16: "63",
};

// GUI = br.gov.bcb.pix
const PIX_GUI = "BR.GOV.BCB.PIX";

/**
 * Calcula o CRC16-CCITT (polinômio 0x1021), padrão BR Code
 */
function crc16(payload: string): string {
  let crc = 0xffff;
  const polynomial = 0x1021;

  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ polynomial;
      } else {
        crc = crc << 1;
      }
      crc &= 0xffff;
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, "0");
}

/**
 * Formata um campo no formato ID + LENGTH + VALUE
 */
function formatField(id: string, value: string): string {
  const length = value.length.toString().padStart(2, "0");
  return `${id}${length}${value}`;
}

export interface PixPaymentData {
  amount: number;
  description: string;
  buyerName?: string;
}

/**
 * Gera o código "PIX Copia e Cola" (BR Code / EMV string) completo.
 * Este código pode ser lido por qualquer app de banco brasileiro.
 */
export function generatePixBRCode(data: PixPaymentData): string {
  const { amount, description } = data;
  const amountStr = amount.toFixed(2);

  // Monta a merchant account info
  const guiField = formatField("00", PIX_GUI);
  const keyField = formatField("01", PIX_KEY);
  const merchantAccountInfo = formatField(
    EMV.MERCHANT_ACCOUNT_INFORMATION,
    guiField + keyField
  );

  // Additional data field - txid + description
  const txid = formatField("05", "***"); // txid genérico
  const additionalData = formatField(EMV.ADDITIONAL_DATA_FIELD, txid);

  // Monta o payload completo (sem o CRC ainda)
  let payload = "";
  payload += formatField(EMV.PAYLOAD_FORMAT, "01");
  payload += merchantAccountInfo;
  payload += formatField(EMV.MERCHANT_CATEGORY_CODE, "0000");
  payload += formatField(EMV.TRANSACTION_CURRENCY, "986"); // BRL
  payload += formatField(EMV.TRANSACTION_AMOUNT, amountStr);
  payload += formatField(EMV.COUNTRY_CODE, "BR");
  payload += formatField(EMV.MERCHANT_NAME, sanitizeName(PIX_RECEIVER_NAME));
  payload += formatField(EMV.MERCHANT_CITY, sanitizeCity(PIX_CITY));
  payload += additionalData;

  // Adiciona o CRC16
  const crcField = EMV.CRC16;
  const crcLength = "04";
  const payloadForCrc = payload + crcField + crcLength;
  const crc = crc16(payloadForCrc);

  return payloadForCrc + crc;
}

function sanitizeName(name: string): string {
  // Remove acentos e caracteres especiais, máximo 25 chars, maiúsculas
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .toUpperCase()
    .substring(0, 25);
}

function sanitizeCity(city: string): string {
  return city
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .toUpperCase()
    .substring(0, 15);
}

/**
 * Formata valor em reais com casas decimais
 */
export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
