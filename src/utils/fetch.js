export async function getAllProducts() {
  const response = await fetch("/api/products");
  const data = await response.json();
  return data;
}

export function getProduct(id) {
  return fetch(`/api/products/find/${id}`)
    .then((res) => res.json())
    .then((res) => {
      res.createdAt = format(Date.parse(res.createdAt), "dd/MM/yyyy");
      res.updatedAt = format(Date.parse(res.updatedAt), "dd/MM/yyyy");
      return res;
    });
}

export async function getAmountProduct() {
  const response = await fetch("/api/products/amount");
  const data = await response.json();
  return data;
}

export async function getInfiniteProducts({ pageParam = 0 }) {
  return fetch(`/api/products/?page=${pageParam}`).then((res) => res.json());
}

export const fetchUser = async (userId) => {
  return fetch("/api/users/find/" + userId).then((res) => res.json());
};
