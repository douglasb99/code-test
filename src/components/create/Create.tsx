import React, { FormEvent, useState } from "react";
import { Certificate } from "../types";
import LocalStorage, { STORAGE_KEYS } from "../../storage/localStorage";
import { fileToBase64 } from "../../utils/fileToBase64";
import { useNavigate } from "react-router-dom";
import styles from "./Create.module.scss";

export function Create() {
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState<
    Certificate | Partial<Certificate>
  >({});

  //todo improve error handling logic
  const validate = (): boolean => {
    if (certificate.title === undefined) {
      return false;
    }

    if (certificate.artist === undefined) {
      return false;
    }

    if (certificate.year === undefined) {
      return false;
    }

    if (certificate.photo === undefined) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    await LocalStorage.append(
      STORAGE_KEYS.CERTIFICATES,
      JSON.stringify(certificate as Certificate)
    );

    navigate("/list");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCertificate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (!files || !files[0]) {
      return;
    }

    const base64 = await fileToBase64(files[0]);

    setCertificate((prevState) => ({
      ...prevState,
      photo: base64,
    }));
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Create Certificate</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>title:</label>
        <input
          type="text"
          name={"title"}
          value={certificate.title !== undefined ? certificate.title : ""}
          onChange={handleChange}
        />{" "}
        <label>artist:</label>
        <input
          type="text"
          name={"artist"}
          value={certificate.artist !== undefined ? certificate.artist : ""}
          onChange={handleChange}
        />{" "}
        <label>year:</label>
        <input
          type="number"
          name={"year"}
          value={certificate.year !== undefined ? certificate.year : ""}
          onChange={handleChange}
        />
        <label>photo:</label>
        <input
          id="photo"
          name="photo"
          type="file"
          onChange={handlePhotoChange}
        />
        <input type="submit" disabled={!validate()} />
      </form>
    </div>
  );
}
