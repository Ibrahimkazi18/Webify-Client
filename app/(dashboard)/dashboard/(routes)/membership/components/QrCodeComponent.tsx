import QRCode from 'qrcode.react';

const QrCodeComponent = ({ value }: { value: string }) => (
  <QRCode value={value} size={256} />
);

export default QrCodeComponent;