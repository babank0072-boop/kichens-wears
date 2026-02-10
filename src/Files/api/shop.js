import { Constants } from "./env";

const BASE = Constants.base;

export const getProducts = () =>
  fetch(`${BASE}/products`).then((r) => r.json());

export const getProduct = (id) =>
  fetch(`${BASE}/products/${id}`).then((r) => r.json());
