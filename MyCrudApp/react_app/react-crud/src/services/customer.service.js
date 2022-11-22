import http from "../http-common";

class CustomerDataService
{
    getAll()
    {
        return http.get("/customers");
    }

    get(id)
    {
        return http.get(`/customers/${id}`);
    }

    create(data)
    {
        return http.post("/customers",data);
    }
}

export default new CustomerDataService();
