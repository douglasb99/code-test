import React from "react";
import LocalStorage, { STORAGE_KEYS } from "../../storage/localStorage";
import { isErr } from "../../results";
import { Certificate } from "../types";
import styles from "./List.module.scss";

export function List() {
  const loadCerts = (): Array<Certificate> => {
    const certs = LocalStorage.load(STORAGE_KEYS.CERTIFICATES);

    if (isErr(certs)) {
      return [];
    }

    return JSON.parse(certs.value);
  };

  const certificates = loadCerts();
  return (
    <>
      <h1 className={styles.title}>Certificate List</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Title</th>
            <th>Year</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((cert: Certificate, index) => {
            return [
              <tr key={index}>
                <td>{cert.artist}</td>
                <td>{cert.title}</td>
                <td>{cert.year}</td>
                <td>
                  {" "}
                  <img
                    alt=""
                    src={cert.photo}
                    className={styles.previewImage}
                  ></img>
                </td>
              </tr>,
            ];
          })}
        </tbody>
      </table>
    </>
  );
}
