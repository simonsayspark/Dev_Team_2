import axios from "axios";

const apiEndpoint = "//localhost:8000";

export const addTransaction = (transaction) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${apiEndpoint}/claims`, transaction)
      .then((x) => resolve(x.data))
      .catch((x) => {
        alert(x);
        reject(x);
      });
  });

export const getTransactionsByCompany = (company_id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${apiEndpoint}/claims?company_id=${company_id}`)
      .then((x) => resolve(x.data))
      .catch((x) => {
        alert(x);
        reject(x);
      });
  });

export const getTransactionByStatus = (employee_id, status) =>
  new Promise((resolve, reject) => {
    axios
      .get(
        `${apiEndpoint}/claims?employee_id=${employee_id}&claim_status=${status}`
      )
      .then((x) => resolve(x.data))
      .catch((x) => {
        alert(x);
        reject(x);
      });
  });

export const getSortTransactionByStatus = (employee_id, status, sortBy) =>
  new Promise((resolve, reject) => {
    axios
      .get(
        `${apiEndpoint}/claims?employee_id=${employee_id}&claim_status=${status}&sortBy=${sortBy}`
      )
      .then((x) => resolve(x.data))
      .catch((x) => {
        alert(x);
        reject(x);
      });
  });

export const updateTransactionStatus = (transactionNumber, status) =>
  new Promise((resolve, reject) => {
    axios
      .put(
        `${apiEndpoint}/claims?claim_number=${transactionNumber}&claim_status=${status}`
      )
      .then((x) => resolve(x.data))
      .catch((x) => {
        alert(x);
        reject(x);
      });
  });

export const updateTransactionComment = (transactionNumber, comment) =>
new Promise((resolve, reject) => {
  axios
    .put(
      `${apiEndpoint}/claims?claim_number=${transactionNumber}&ceo_comment=${comment}`
    )
    .then((x) => resolve(x.data))
    .catch((x) => {
      alert(x);
      reject(x);
    });
});