import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import Logo from "../../public/images/gato-vino.png"

const QRModern = ({ data, qrRefCallback }) => {
  const qrRef = useRef(null);

  useEffect(() => {
    if (qrRef.current) {
      // Limpiar el contenedor para evitar duplicados
      qrRef.current.innerHTML = "";
      
      const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        data: data,
        image: Logo, // Ruta directa desde public
        dotsOptions: {
          color: "#000000",
          type: "dots",
          roundSize: true
        },
        backgroundOptions: {
          color: "#ffffff"
        },
        imageOptions: {
          crossOrigin: "anonymous",
          hideBackgroundDots: true,
          imageSize: 0.4,
          margin: 0
        },
        cornersSquareOptions: {
          type: "extra-rounded",
          color: "#000000"
        },
        cornersDotOptions: {
          type: "square",
          color: "#000000"
        }
      });

      qrCode.append(qrRef.current);

      if (qrRefCallback) {
        qrRefCallback(qrCode);
      }
    }
  }, [data, qrRefCallback]);

  return <div ref={qrRef} />;
};

export default QRModern;