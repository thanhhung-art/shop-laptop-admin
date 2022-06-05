import axios from "axios";

export const fetchUser = async (userId) => {
  return fetch("/api/users/find/" + userId)
    .then(res => res.json())
}
