import React, { useRef, useState } from 'react';
import ReactDOM from "react-dom";
import QRCode from "qrcode.react";
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [qrValue, setQrValue] = useState("")
  const [bgColor, setBgcolor] = useState("#000000")
  const [frColor, setFrcolor] = useState("#ffffff")

  const handleOnChange = (event: { target: { value: string; } }) => {
    const { value } = event.target;
    setQrValue(value);
  }

  const onChangeBGcolor = (event: { target: { value: string; } }) => {
    const { value } = event.target;
    setBgcolor(value);
  }

  const onChangeFrcolor = (event: { target: { value: string; } }) => {
    const { value } = event.target;
    setFrcolor(value);
  }

  const DownloadQRCode = () => {
    const canvas: any = document.getElementById("qr-gen");
    const pngUrl: any | null = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${qrValue}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Gerador de QrCode</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.h1}>Um pequeno gerador <br /> de QR Code</h1>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.generator}>
            <div className={styles.generator_form}>
              <input className={styles.form_input} type="text" name='input' placeholder='https://' value={qrValue} onChange={handleOnChange} />
              {/*<div className={styles.generator_wrapper}>
                <div className={styles.generator_background}>
                  <span>Background</span>
                  <input className={styles.generator_input} type="color" id="background" name="background" onChange={onChangeBGcolor} defaultValue="#fff" />
                </div>
                <div className={styles.generator_foreground}>
                  <span>Foreground</span>
                  <input className={styles.generator_input} type="color" id="foreground" name="foreground" onChange={onChangeFrcolor} defaultValue="#000" />
                </div>
              </div>*/}
              <div className={styles.generator_link}>
                <button onClick={DownloadQRCode}>Download PNG</button>
              </div>
            </div>
          </div>
          <div className={styles.qrcode}>
            <QRCode
              id="qr-gen"
              value={qrValue}
              size={500}
              level={"H"}
              includeMargin={false}
              bgColor={bgColor}
              fgColor={frColor}
            />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default Home
