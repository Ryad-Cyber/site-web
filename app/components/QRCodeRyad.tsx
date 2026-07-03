"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeRyad() {
  return (
    <div className="flex flex-col items-center gap-4">
      <QRCodeCanvas
        value="https://ryadstudio.com"
        size={220}
        level="H"
        includeMargin={true}
      />

      <p className="text-sm text-gray-400">
        Scan pour découvrir Ryad Web Studio
      </p>
    </div>
  );
}