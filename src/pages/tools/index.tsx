import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { usePluginData } from "@docusaurus/useGlobalData";

export default function (): JSX.Element {
  function calculateCRC64(arrayBuffer) {
    const crcTable = makeCRCTable64();
    let crc = BigInt("0xFFFFFFFFFFFFFFFF");
    for (const byte of arrayBuffer) {
      crc = (crc >> 8n) ^ crcTable[Number((crc ^ BigInt(byte)) & 0xffn)];
    }

    const result = (crc ^ BigInt("0xFFFFFFFFFFFFFFFF")).toString(16).padStart(16, "0");

    console.log("=> file crc64:", result);
  }

  function makeCRCTable64() {
    const polynomial = BigInt("0x42F0E1EBA9EA3693");
    const crcTable = [];
    for (let i = 0; i < 256; i++) {
      let crc = BigInt(i);
      for (let j = 0; j < 8; j++) {
        if (crc & 1n) {
          crc = (crc >> 1n) ^ polynomial;
        } else {
          crc >>= 1n;
        }
      }
      crcTable[i] = crc;
    }
    return crcTable;
  }

  function calculateCRC32(arrayBuffer) {
    const crcTable = makeCRCTable();
    let crc = 0 ^ -1;

    for (let byte of arrayBuffer) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ byte) & 0xff];
    }

    crc = (crc ^ -1) >>> 0;

    const result = crc.toString(16).padStart(8, "0");

    console.log("=> file crc32:", result);
  }

  function makeCRCTable() {
    const crcTable = [];
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) {
        if (c & 1) {
          c = 0xedb88320 ^ (c >>> 1);
        } else {
          c = c >>> 1;
        }
      }
      crcTable[i] = c;
    }
    return crcTable;
  }

  const handleChange = (event: HTMLInputElement) => {
    const target = event.target as HTMLInputElement;
    const file = target.files[0];

    const reader = new FileReader();

    reader.onload = function (e) {
      if (e.target && e.target.result instanceof ArrayBuffer) {
        calculateCRC64(new Uint8Array(e.target.result));
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <Layout description="yinpo blogs showcase!">
      <div>this is tools page~</div>
      <input type="file" name="file" id="file-input" onChange={handleChange} />
    </Layout>
  );
}
