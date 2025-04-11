import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import Logo from "../../public/images/gato-vino.png";

const QRModern = ({ data, qrRefCallback }) => {
  const qrRef = useRef(null);

  useEffect(() => {
    if (qrRef.current) {
      // Limpiar el contenedor para evitar duplicados
      qrRef.current.innerHTML = "";

      const qrCode = new QRCodeStyling({
        type: "canvas",
        shape: "square",
        width: 200,
        height: 200,
        data: data, // utiliza la data pasada al componente
        margin: 0,
        qrOptions: { typeNumber: "0", mode: "Byte", errorCorrectionLevel: "Q" },
        imageOptions: { saveAsBlob: true, hideBackgroundDots: true, imageSize: 0.4, margin: 0 },
        dotsOptions: { type: "square", color: "#000000", roundSize: true },
        backgroundOptions: { round: 0, color: "#ffffff" },
        dotsOptionsHelper: { 
          colorType: { single: true, gradient: false },
          gradient: { linear: true, radial: false, color1: "#6a1a4c", color2: "#6a1a4c", rotation: "0" }
        },
        cornersSquareOptions: { type: "extra-rounded", color: "#000000" },
        cornersSquareOptionsHelper: { 
          colorType: { single: true, gradient: false },
          gradient: { linear: true, radial: false, color1: "#000000", color2: "#000000", rotation: "0" }
        },
        cornersDotOptions: { type: "", color: "#000000" },
        cornersDotOptionsHelper: { 
          colorType: { single: true, gradient: false },
          gradient: { linear: true, radial: false, color1: "#000000", color2: "#000000", rotation: "0" }
        },
        backgroundOptionsHelper: {
          colorType: { single: true, gradient: false },
          gradient: { linear: true, radial: false, color1: "#ffffff", color2: "#ffffff", rotation: "0" }
        },
        image: Logo
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